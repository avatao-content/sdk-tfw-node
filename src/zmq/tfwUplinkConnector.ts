import * as zmq from "zeromq";
import { log } from "../sdk/utils";
import { ZMQMessage } from "../types";

class TFWUplinkConnector {
  private _addr: string;
  private _defaultScope: string;
  private _sock: zmq.Push;

  constructor(addr: string) {
    this._addr = addr;
    this._defaultScope = "zmq";
    this._sock = new zmq.Push();
  }

  setupConnection(): void {
    this._sock.connect(this._addr);
  }

  async sendMessage(message: ZMQMessage): Promise<void> {
    if (!("scope" in message)) message.scope = this._defaultScope;
    log("[INFO] Sending message: " + JSON.stringify(message));
    await this._sock.send([message.key, JSON.stringify(message)]);
  }

  close(): void {
    this._sock.close();
  }
}

export { TFWUplinkConnector };
