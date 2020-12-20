import { ZMQMessage } from "../../types";
import { ZMQConnector } from "../../zmq/zmqConnector";

export abstract class EventHandlerBase {
  private _connector: ZMQConnector;
  keys: string[];

  constructor(keys: string[]) {
    this._connector = new ZMQConnector();
    this.keys = keys;
  }

  private messageFilter = (message: ZMQMessage): void => {
    if (this.keys.includes(message.key)) {
      this.handleMessage(message);
    }
  };

  start(): void {
    this._connector.startMessageHandling(this.messageFilter);
    console.log(`[INFO] Eventhandler ${this.constructor.name} has started`);
  }

  stop(): void {
    this._connector.close();
    console.log(`[INFO] Eventhandler ${this.constructor.name} has stopped`);
  }

  abstract handleMessage(message: ZMQMessage): any;
}
