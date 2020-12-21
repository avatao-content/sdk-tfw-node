import { ZMQMessage } from "../../types";
import { EventHandlerBase } from "./eventHandlerBase";

export class ConsoleReadHandler extends EventHandlerBase {
  content: string;

  constructor() {
    super(["console.read"]);
    this.content = "";
  }

  handleMessage(message: ZMQMessage): void {
    if ("content" in message) {
      return message.content;
    }
  }

  async waitForConsoleContent(): Promise<string> {
    while (this.content === "") {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return this.content;
  }
}
