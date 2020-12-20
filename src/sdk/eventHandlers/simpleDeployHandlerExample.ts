import { ZMQMessage } from "../../types";
import { EventHandlerBase } from "./eventHandlerBase";
import { prepareFinishDeployMessage } from "../messages";

export class ComplexCustomDeployHandler extends EventHandlerBase {
  // Simple deploy handler, e.g. for unit testing code
  constructor() {
    super(["deploy.start"]);
  }

  handleMessage(message: ZMQMessage): void {
    let errorMessage = "";
    // Do some tests after process restart...
    const error = Math.random() < 0.5;
    if (error) {
      errorMessage = `${message.key} event has failed`;
    }
    this.sendMessage(prepareFinishDeployMessage(errorMessage));
  }
}
