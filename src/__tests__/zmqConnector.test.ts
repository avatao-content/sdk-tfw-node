import { ZMQConnector } from "../zmq/zmqConnector";
import { TFWDownlinkConnector } from "../zmq/tfwDownlinkConnector";
import { TFWUplinkConnector } from "../zmq/tfwUplinkConnector";

test("ZMQConnector setup", () => {
  const connector = new ZMQConnector();

  expect(connector["_uplink"]["_addr"]).toEqual(
    `tcp://127.0.0.1:${process.env["TFW_PUB_PORT"] || "8765"}`,
  );
  expect(connector["_downlink"]["_addr"]).toEqual(
    `tcp://127.0.0.1:${process.env["TFW_PULL_PORT"] || "7654"}`,
  );
});

test("TFWDownlink setup", () => {
  const testAddr = "1111";
  const downlink = new TFWDownlinkConnector(testAddr);

  expect(downlink["_addr"]).toEqual(testAddr);
});

test("TFWUplink setup", () => {
  const testAddr = "1111";
  const uplink = new TFWUplinkConnector(testAddr);

  expect(uplink["_addr"]).toEqual(testAddr);
});
