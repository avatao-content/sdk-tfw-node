import { ZMQMessage } from "../../types";

export function prepareStartProcessMessage(processName: string): ZMQMessage {
  return {
    key: "process.start",
    name: processName,
  };
}

export function prepareRestartProcessMessage(processName: string): ZMQMessage {
  return {
    key: "process.restart",
    name: processName,
  };
}

export function prepareStopProcessMessage(processName: string): ZMQMessage {
  return {
    key: "process.stop",
    name: processName,
  };
}

export function prepareStartDeployMessage(): ZMQMessage {
  return {
    key: "deploy.start",
  };
}

export function prepareFinishDeployMessage(error?: string): ZMQMessage {
  const message: ZMQMessage = {
    key: "deploy.finish",
  };
  if (error && error !== "") message["error"] = error;
  return message;
}

export function prepareStartProcessLogMessage(): ZMQMessage {
  return {
    key: "process.log.start",
  };
}

export function prepareStopProcessLogMessage(): ZMQMessage {
  return {
    key: "process.log.stop",
  };
}
