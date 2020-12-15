import { ZMQConnector } from "../tfw/zmq/zmqConnector";
import { TFWDownlinkConnector } from "../tfw/zmq/tfwDownlinkConnector";
import { TFWUplinkConnector } from "../tfw/zmq/tfwUplinkConnector";

test("ZMQConnector setup", () => {
  const connector = new ZMQConnector();

  expect(connector.uplink.addr).toEqual(
    `tcp://localhost:${process.env["TFW_PUB_PORT"] || "7654"}`,
  );
  expect(connector.downlink.addr).toEqual(
    `tcp://localhost:${process.env["TFW_PULL_PORT"] || "8765"}`,
  );
});

test("TFWDownlink setup", () => {
  const testAddr = "1111";
  const downlink = new TFWDownlinkConnector(testAddr);

  expect(downlink.addr).toEqual(testAddr);
});

test("TFWUplink setup", () => {
  const testAddr = "1111";
  const uplink = new TFWUplinkConnector(testAddr);

  expect(uplink.addr).toEqual(testAddr);
});
