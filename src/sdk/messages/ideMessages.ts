import { ZMQMessage, DeployButtonText } from "../../types";

export function prepareShowDeploybuttonMessage(
  showButton: boolean,
): ZMQMessage {
  return {
    key: "frontend.ide",
    showDeployButton: showButton,
  };
}

export function prepareSetDeployButtonTextMessage(
  buttonTexts: DeployButtonText,
): ZMQMessage {
  return {
    key: "frontend.ide",
    deployButtonText: buttonTexts,
  };
}

export function prepareSetIdeAutoSaveIntervalMessage(
  interval: number,
): ZMQMessage {
  return {
    key: "frontend.ide",
    autoSaveInterval: interval,
  };
}

export function prepareIdeReadFileAndPatternMessage(
  fileName: string,
  patterns?: string[],
): ZMQMessage {
  var message = {
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
