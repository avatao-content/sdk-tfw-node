import { ZMQMessage, FrontendIdeOptions } from "../../types";

export function prepareFrontendIdeMessage(
  paramDict: FrontendIdeOptions,
): ZMQMessage {
  return {
    key: "frontend.ide",
    ...paramDict,
  };
}

export function prepareIdeReadFileAndPatternMessage(
  fileName: string,
  patterns?: string[],
): ZMQMessage {
  const message = {
    key: "ide.read",
    filename: fileName,
  };
  if (patterns) message["patterns"] = patterns;
  return message;
}

export function prepareIdeWriteFileMessage(
  fileName: string,
  content: string,
): ZMQMessage {
  return {
    key: "ide.write",
    filename: fileName,
    content: content,
  };
}

export function prepareIdeReloadMessage(): ZMQMessage {
  return {
    key: "ide.reload",
    scope: "websocket",
  };
}
