import { ZMQMessage } from "../../types";
import { EventHandlerBase } from "./eventHandlerBase";
import { prepareFinishDeployMessage } from "../messages";

class ComplexCustomDeployHandler extends EventHandlerBase {
  // Simple deploy handler, e.g. for unit testing code
  constructor() {
    super(["deploy.start"]);
  }

  handleMessage(message: ZMQMessage) {
    let errorMessage = "";
    // Do some tests after process restart...
    const error = Math.random() < 0.5;
    if (error) {
      errorMessage = "Well, this is unlucky";
    }
    this.sendMessage(prepareFinishDeployMessage(errorMessage));
  }
}
