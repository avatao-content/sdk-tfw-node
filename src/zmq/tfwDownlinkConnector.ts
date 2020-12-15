import * as zmq from "zeromq";
import { CallbackFunction } from "../types";

class TFWDownlinkConnector {
  private _addr: string;
  private _sock = new zmq.Subscriber();

  constructor(addr: string) {
    this._addr = addr;
  }

  setupConnection(): void {
    this._sock.connect(this._addr);
    this._sock.subscribe(""); // Subscribe to all messages
  }

  close(): void {
    this._sock.close();
  }

  async start(callback: CallbackFunction): Promise<void> {
    for await (const [topic, msg] of this._sock) {
      const message = JSON.parse(msg.toString());
      callback(message);

      console.log(
        "received a message related to:",
        topic,
        "containing message:",
        msg,
      );
    }
  }
}

export { TFWDownlinkConnector };
