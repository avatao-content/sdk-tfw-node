import { ZMQMessage, FsmTriggerOptions } from "../../types";

export function prepareStepFsmMessage(
  state: string | number,
  options?: FsmTriggerOptions,
): ZMQMessage {
  return {
    key: "fsm.trigger",
    transition: `${options?.force ? "to_" : "step_"}${state.toString()}`,
  };
}

export function prepareAskFsmStateMessage(): ZMQMessage {
  return {
    key: "fsm.update",
  };
}
