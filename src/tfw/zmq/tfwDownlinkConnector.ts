import * as zmq from "zeromq";

class TFWDownlinkConnector {
  addr: string;
  sock = new zmq.Subscriber();

  constructor(addr: string) {
    this.addr = addr;
  }

  setupConnection() {
    this.sock.connect(this.addr);
    this.sock.subscribe(""); // Subscribe to all messages
  }

  async handleMessages() {
    for await (const [topic, msg] of this.sock) {
      console.log(
        "received a message related to:",
        topic,
        "containing message:",
        msg,
      );
    }
  }

  close() {
    this.sock.close();
  }
}

export { TFWDownlinkConnector };
