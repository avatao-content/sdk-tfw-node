import * as zmq from "zeromq";

class TFWUplinkConnector {
  addr: string;
  scope: string;
  sock = new zmq.Publisher();

  constructor(addr: string) {
    this.addr = addr;
    this.scope = "zmq";
  }

  async setupConnection() {
    await this.sock.bind(this.addr);
  }

  async sendMessage(message: JSON) {
    message["scope"] = this.scope;
    await this.sock.send([message["key"], JSON.stringify(message)]);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  close() {
    this.sock.close();
  }
}

export { TFWUplinkConnector };
