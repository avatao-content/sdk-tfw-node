import { ZMQConnector } from "../zmq/zmqConnector";
import {
  CallbackDict,
  DeployButtonText,
  LayoutName,
  ZMQMessage,
  FsmTriggerOptions,
} from "../types";
import * as messageUtils from "./messages";
import { EventHandlerBase } from "./eventHandlers/eventHandlerBase";
import { SdkStateUpdateHandler } from "./eventHandlers/sdkStateUpdateHandler";
import { ConsoleReadHandler } from "./eventHandlers/consoleReadHandler";
import { log } from "./utils";

const CallbackValues = {
  "message.button.click": ["value"],
  "ide.write": ["filename", "content"],
  "history.bash": ["command"],
};

const getValues = (keys: string[], message: ZMQMessage): string[] => {
  const values: string[] = [];
  keys.forEach((key) => {
    values.push(message[key]);
  });
  return values;
};

export class SDK {
  fsmState: number;
  started: boolean;
  private _connector: ZMQConnector;
  private _messageCallbacks: CallbackDict;
  private _eventHandlers: EventHandlerBase[];

  constructor() {
    this.fsmState = 0;
    this.started = false;
    this._messageCallbacks = {};
    this._connector = new ZMQConnector();
    this._eventHandlers = [];

    this.subscribeEventHandler(new SdkStateUpdateHandler(this));
    this.startEventHandlers();
  }

  start(messageCallbacks: CallbackDict): void {
    this._messageCallbacks = messageCallbacks;
    this._connector.startMessageHandling(this.handleMessage);
    this.startEventHandlers();
    this.started = true;
    log("[INFO] SDK started");
  }

  stop(): void {
    this._connector.close();
    this._eventHandlers.forEach((eh) => {
      eh.stop();
    });
  }

  private startEventHandlers(): void {
    this._eventHandlers.forEach((eh) => {
      if (!eh.started) eh.start();
    });
  }

  subscribeEventHandler(eventHandler: EventHandlerBase): void {
    this._eventHandlers.push(eventHandler);
    if (this.started) {
      eventHandler.start(); // Start eventhandlers after the SDK started
    }
  }

  handleMessage = (message: ZMQMessage): void => {
    log("[INFO] Incoming message: " + JSON.stringify(message));
    const key = message.key;
    try {
      if (Object.keys(this._messageCallbacks).length === 0) {
        log("[INFO] No callbacks available for message handling");
      } else if (key in this._messageCallbacks) {
        if (key in CallbackValues) {
          this._messageCallbacks[key](
            this.fsmState,
            ...getValues(CallbackValues[key], message),
            message,
          );
        } else {
          this._messageCallbacks[key](this.fsmState, message);
        }
      } else {
        log(`[INFO] callback not found for ${key}`);
      }
    } catch (error) {
      log(`[ERROR] ${key}: ${error.toString()}`);
    }
  };

  async sendChatMessage(message: string): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareChatBotSendMessage(message),
    );
  }

  async queueChatMessages(messages: string[]): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareChatBotQueueMessage(messages),
    );
  }

  async setAskReloadSite(needConfirmation: boolean): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendSiteMessage({
        needConfirmPrompt: needConfirmation,
      }),
    );
  }

  async setDocumentTitle(title: string): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendSiteMessage({ title: title }),
    );
  }

  async setEnabledLayouts(layouts: LayoutName[]): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendDashboardMessage({ enabledLayouts: layouts }),
    );
  }

  async switchLayout(layout: LayoutName): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendDashboardMessage({ layout: layout }),
    );
  }

  async setHideBotMessages(hideMessages: boolean): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendDashboardMessage({
        hideMessages: hideMessages,
      }),
    );
  }

  async setIframeUrl(url: string): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendDashboardMessage({ iframeUrl: url }),
    );
  }

  async showIframeUrlBar(): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendDashboardMessage({ showUrlBar: true }),
    );
  }

  async hideIframeUrlBar(): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendDashboardMessage({ showUrlBar: false }),
    );
  }

  async switchToConsole(): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendDashboardMessage({
        terminalMenuItem: "console",
      }),
    );
  }

  async switchToTerminal(): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendDashboardMessage({
        terminalMenuItem: "terminal",
      }),
    );
  }

  async stepFsm(
    state: string | number,
    options: FsmTriggerOptions,
  ): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareStepFsmMessage(state, options),
    );
  }

  async askFsmState(): Promise<void> {
    this._connector.sendMessage(messageUtils.prepareAskFsmStateMessage());
  }

  async showDeployButton(): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendIdeMessage({ showDeployButton: true }),
    );
  }

  async hideDeploybutton(): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendIdeMessage({ showDeployButton: false }),
    );
  }

  async setDeployButtonText(buttonTexts: DeployButtonText): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendIdeMessage({ deployButtonText: buttonTexts }),
    );
  }

  async setAutoSaveInterval(interval: number): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFrontendIdeMessage({ autoSaveInterval: interval }),
    );
  }

  async ideSelectFile(fileName: string, patterns?: string[]): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareIdeReadFileAndPatternMessage(fileName, patterns),
    );
  }

  async ideWriteFile(fileName: string, content: string): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareIdeWriteFileMessage(fileName, content),
    );
  }

  async ideReload(): Promise<void> {
    this._connector.sendMessage(messageUtils.prepareIdeReloadMessage());
  }

  async startProcess(processName: string): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareStartProcessMessage(processName),
    );
  }

  async restartProcess(processName: string): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareRestartProcessMessage(processName),
    );
  }

  async stopProcess(processName: string): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareStopProcessMessage(processName),
    );
  }

  async startProcessLog(): Promise<void> {
    this._connector.sendMessage(messageUtils.prepareStartProcessLogMessage());
  }

  async stopProcessLog(): Promise<void> {
    this._connector.sendMessage(messageUtils.prepareStopProcessLogMessage());
  }

  async startDeploy(): Promise<void> {
    this._connector.sendMessage(messageUtils.prepareStartDeployMessage());
  }

  async finishDeploy(errorMessage?: string): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareFinishDeployMessage(errorMessage),
    );
  }

  async readConsole(): Promise<string> {
    // Hacky solution with a custom event handler
    const consoleReadHandler = new ConsoleReadHandler();
    consoleReadHandler.start();
    this._connector.sendMessage(messageUtils.prepareConsoleReadMessage());
    const content = await consoleReadHandler.waitForConsoleContent();
    consoleReadHandler.stop();
    return content;
  }

  async writeToConsole(content: string): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareConsoleWriteMessage(content),
    );
  }

  async writeToTerminal(command: string): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareTerminalWriteMessage(command),
    );
  }
}
