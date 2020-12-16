import * as zmq from "zeromq";
import { ZMQMessage } from "../types";

class TFWUplinkConnector {
  private _addr: string;
  private _scope: string;
  private _sock: zmq.Push;

  constructor(addr: string) {
    this._addr = addr;
    this._scope = "zmq";
    this._sock = new zmq.Push();
  }

  setupConnection(): void {
    this._sock.connect(this._addr);
  }

  async sendMessage(message: ZMQMessage): Promise<void> {
    message.scope = this._scope;
    console.log("[INFO] Sending message: " + JSON.stringify(message));
    await this._sock.send([message.key, JSON.stringify(message)]);
  }

  close(): void {
    this._sock.close();
  }
}

export { TFWUplinkConnector };
