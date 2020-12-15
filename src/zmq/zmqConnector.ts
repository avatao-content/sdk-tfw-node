import { TFWDownlinkConnector } from "./tfwDownlinkConnector";
import { TFWUplinkConnector } from "./tfwUplinkConnector";
import { ZMQMessage, CallbackFunction } from "../types";

class ZMQConnector {
  pubAddr: string;
  subAddr: string;
  private _uplink: TFWUplinkConnector;
  private _downlink: TFWDownlinkConnector;

  constructor() {
    this.pubAddr = `tcp://localhost:${process.env["TFW_PUB_PORT"] || "7654"}`;
    this.subAddr = `tcp://localhost:${process.env["TFW_PULL_PORT"] || "8765"}`;
    this._uplink = new TFWUplinkConnector(this.pubAddr);
    this._downlink = new TFWDownlinkConnector(this.subAddr);
  }

  async setup(onMessageCallback: CallbackFunction): Promise<void> {
    await this._uplink.setupConnection();
    this._downlink.setupConnection();
    this._downlink.start(onMessageCallback);
  }

  async sendMessage(message: ZMQMessage): Promise<void> {
    this._uplink.sendMessage(message);
  }

  close(): void {
    this._uplink.close();
    this._downlink.close();
  }
}

export { ZMQConnector };
