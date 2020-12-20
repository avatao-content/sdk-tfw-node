import { SDK } from "../sdk";
import { ZMQMessage } from "../../types";
import { EventHandlerBase } from "./eventHandlerBase";

export class SdkStateUpdateHandler extends EventHandlerBase {
  private _sdk: SDK;

  constructor(sdk: SDK) {
    super(["fsm.update"]);
    this._sdk = sdk;
  }

  handleMessage(message: ZMQMessage): void {
    if (message.key == "fsm.update" && "current_state" in message) {
      this._sdk.fsmState = parseInt(message.current_state);
    }
  }
}
