import { ZMQMessage } from "../../types";

export function prepareConsoleReadMessage(): ZMQMessage {
  return {
    key: "console.read",
  };
}

export function prepareConsoleWriteMessage(content: string): ZMQMessage {
  return {
    key: "console.write",
    content: content,
  };
}

export function prepareTerminalWriteMessage(command: string): ZMQMessage {
  return {
    key: "terminal.write",
    command: command,
  };
}
