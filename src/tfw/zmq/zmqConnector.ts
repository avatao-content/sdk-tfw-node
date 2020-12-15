import { TFWDownlinkConnector } from "./tfwDownlinkConnector";
import { TFWUplinkConnector } from "./tfwUplinkConnector";

class ZMQConnector {
  uplink: TFWUplinkConnector;
  downlink: TFWDownlinkConnector;
  pubAddr: string;
  subAddr: string;

  constructor() {
    this.pubAddr = `tcp://localhost:${process.env["TFW_PUB_PORT"] || "7654"}`;
    this.subAddr = `tcp://localhost:${process.env["TFW_PULL_PORT"] || "8765"}`;
    this.uplink = new TFWUplinkConnector(this.pubAddr);
    this.downlink = new TFWDownlinkConnector(this.subAddr);
  }

  close(): void {
    this.uplink.close();
    this.downlink.close();
  }
}

export { ZMQConnector };
