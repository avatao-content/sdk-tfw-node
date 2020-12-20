import { ZMQMessage } from "../../types";
import { ZMQConnector } from "../../zmq/zmqConnector";
import { log } from "../utils";

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
    log(`[INFO] Eventhandler ${this.constructor.name} has started`);
  }

  stop(): void {
    this._connector.close();
    log(`[INFO] Eventhandler ${this.constructor.name} has stopped`);
  }

  async sendMessage(message: ZMQMessage): Promise<void> {
    this._connector.sendMessage(message);
  }

  abstract handleMessage(message: ZMQMessage): any;
}
