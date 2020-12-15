import * as zmq from "zeromq";
import { ZMQMessage } from "../types";

class TFWUplinkConnector {
  private _addr: string;
  private _scope: string;
  private _sock = new zmq.Publisher();

  constructor(addr: string) {
    this._addr = addr;
    this._scope = "zmq";
  }

  async setupConnection(): Promise<void> {
    await this._sock.bind(this._addr);
  }

  async sendMessage(message: ZMQMessage): Promise<void> {
    message.scope = this._scope;
    await this._sock.send([
      Buffer.from(message.key),
      Buffer.from(JSON.stringify(message)),
    ]);
  }

  close(): void {
    this._sock.close();
  }
}

export { TFWUplinkConnector };