import { ZMQMessage } from "../../types";
import { ZMQConnector } from "../../zmq/zmqConnector";

export abstract class EventHandlerBase {
  private _connector: ZMQConnector;
  private _key: string;

  constructor(key: string) {
    this._connector = new ZMQConnector();
    this._key = key;
  }

  private messageFilter = (message: ZMQMessage): void => {
    if (message.key.normalize() === this._key.normalize()) {
      this.handleMessage(message);
    }
  };

  start(): void {
    this._connector.startMessageHandling(this.messageFilter);
    console.log(`[INFO] Eventhandler ${this.constructor.name} has started`);
  }

  abstract handleMessage(message: ZMQMessage): any;
}
