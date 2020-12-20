import { EventHandlerBase } from "./eventHandlerBase";

class FsmUpdateHandler extends EventHandlerBase {
  constructor() {
    super(["fsm.update"]);
  }

  handleMessage(message: Record<string, any>) {
    throw new Error("Method not implemented.");
  }
}
