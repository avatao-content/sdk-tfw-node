import { ZMQConnector } from "../zmq/zmqConnector";
import {
  CallbackDict,
  DeployButtonText,
  LayoutName,
  ZMQMessage,
} from "../types";
import * as messageUtils from "./messages";
import { EventHandlerBase } from "./eventHandlers";
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

class SDK {
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
  }

  start(messageCallbacks: CallbackDict): void {
    this._messageCallbacks = messageCallbacks;
    this._connector.startMessageHandling(this.handleMessage);
    this._eventHandlers.forEach((eh) => {
      // Default eventhandlers
      eh.start();
    });
    this.started = true;
    log("[INFO] SDK started");
  }

  stop() {
    this._connector.close();
    this._eventHandlers.forEach((eh) => {
      eh.stop();
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
      if (key == "fsm.update" && "current_state" in message) {
        this.fsmState = parseInt(message.current_state);
      }

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
      messageUtils.prepareAskReloadSiteMessage(needConfirmation),
    );
  }

  async setDocumentTitle(title: string): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareSetDocumentTitleMessage(title),
    );
  }

  async setEnabledLayouts(layouts: LayoutName[]): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareSetEnabledLayoutsMessage(layouts),
    );
  }

  async switchLayout(layout: LayoutName): Promise<void> {
    this._connector.sendMessage(messageUtils.prepareSetLayoutMessage(layout));
  }

  async setHideBotMessages(value: boolean): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareHideBotMessagesMessage(value),
    );
  }

  async setIframeUrl(url: string): Promise<void> {
    this._connector.sendMessage(messageUtils.prepareSetIframeUrlMessage(url));
  }

  async showIframeUrlBar(): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareShowIframeUrlBarMessage(true),
    );
  }

  async hideIframeUrlBar(): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareShowIframeUrlBarMessage(false),
    );
  }

  async switchToConsole(): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareSetTerminalMenuItemMessage("console"),
    );
  }

  async switchToTerminal(): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareSetTerminalMenuItemMessage("terminal"),
    );
  }

  async stepFsm(state: string | number, force = false): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareStepFsmMessage(state, force),
    );
  }

  async askFsmState(): Promise<void> {
    this._connector.sendMessage(messageUtils.prepareAskFsmStateMessage());
  }

  async showDeployButton(): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareShowDeploybuttonMessage(true),
    );
  }

  async hideDeploybutton(): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareShowDeploybuttonMessage(false),
    );
  }

  async setDeployButtonText(buttonTexts: DeployButtonText): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareSetDeployButtonTextMessage(buttonTexts),
    );
  }

  async setAutoSaveInterval(interval: number): Promise<void> {
    this._connector.sendMessage(
      messageUtils.prepareSetIdeAutoSaveIntervalMessage(interval),
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

  async readConsole(): Promise<void> {
    // This won't work since we are not listening for the response
    // TODO ¯\_( ͡° ͜ʖ ͡°)_/¯
    this._connector.sendMessage(messageUtils.prepareConsoleReadMessage());
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

export { SDK };
