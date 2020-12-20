import { TFWDownlinkConnector } from "./tfwDownlinkConnector";
import { TFWUplinkConnector } from "./tfwUplinkConnector";
import { ZMQMessage, CallbackFunction } from "../types";

class ZMQConnector {
  pubAddr: string;
  subAddr: string;
  private _uplink: TFWUplinkConnector;
  private _downlink: TFWDownlinkConnector;

  constructor() {
    this.subAddr = `tcp://127.0.0.1:${process.env["TFW_PUB_PORT"] || "7654"}`;
    this.pubAddr = `tcp://127.0.0.1:${process.env["TFW_PULL_PORT"] || "8765"}`;
    this._uplink = new TFWUplinkConnector(this.pubAddr);
    this._downlink = new TFWDownlinkConnector(this.subAddr);

    this._uplink.setupConnection();
    this._downlink.setupConnection();
  }

  async startMessageHandling(
    onMessageCallback: CallbackFunction,
  ): Promise<void> {
    this._downlink.start(onMessageCallback);
    console.log("[INFO] ZMQConnector setup finished");
  }

  async sendMessage(message: ZMQMessage): Promise<void> {
    this._uplink.sendMessage(message);
  }

  close(): void {
    this._uplink.close();
    this._downlink.close();
    console.log("[INFO] ZMQConnector connections closed");
  }
}

export { ZMQConnector };
