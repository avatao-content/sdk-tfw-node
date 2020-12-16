import * as zmq from "zeromq";
import { CallbackFunction } from "../types";

class TFWDownlinkConnector {
  private _addr: string;
  private _sock: zmq.Subscriber;

  constructor(addr: string) {
    this._addr = addr;
    this._sock = new zmq.Subscriber();
  }

  setupConnection(): void {
    this._sock.connect(this._addr);
    this._sock.subscribe(""); // Subscribe to all messages
  }

  close(): void {
    this._sock.close();
  }

  async start(callback: CallbackFunction): Promise<void> {
    for await (const [, msg] of this._sock) {
      const message = JSON.parse(msg.toString());
      callback(message);
    }
  }
}

export { TFWDownlinkConnector };
