import { ZMQMessage } from "../../types";
import { EventHandlerBase } from "./eventHandlerBase";
import {
  prepareStopProcessLogMessage,
  prepareStartProcessLogMessage,
  prepareFinishDeployMessage,
  prepareRestartProcessMessage,
} from "../messages";

class ComplexCustomDeployHandler extends EventHandlerBase {
  // Deploy handler example if a process restart if needed
  // E.g. testing server endpoints, etc.
  private _commands: Record<string, any>;
  private _processName: string;

  constructor() {
    super(["deploy.start", "process.restart"]);
    this._commands = {
      "deploy.start": this.onDeploy,
      "process.restart": this.onProcessRestart,
    };
    this._processName = "webservice";
  }

  handleMessage(message: ZMQMessage) {
    try {
      this._commands[message.key](message);
    } catch (error) {
      console.log(
        `[ERROR] Invalid message received ${JSON.stringify(message)}`,
      );
    }
  }

  private onDeploy(): void {
    this.sendMessage(prepareStopProcessLogMessage());
    this.sendMessage(prepareRestartProcessMessage(this._processName));
  }

  private onProcessRestart(): void {
    let errorMessage = "";
    // Do some tests after process restart...
    const error = Math.random() < 0.5;
    if (error) {
      errorMessage = "Well, this is unlucky";
    }
    this.sendMessage(prepareFinishDeployMessage(errorMessage));
    this.sendMessage(prepareStartProcessLogMessage());
  }
}
