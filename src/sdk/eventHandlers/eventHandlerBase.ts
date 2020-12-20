import { ZMQMessage } from "../../types";
import { ZMQConnector } from "../../zmq/zmqConnector";

export abstract class EventHandlerBase {
  private _connector: ZMQConnector;

  constructor() {
    this._connector = new ZMQConnector();
  }

  start(): void {
    console.log(`[INFO] Eventhandler ${this.constructor.name} has started`);
  }

  abstract handleMessage(message: ZMQMessage): any;
}
