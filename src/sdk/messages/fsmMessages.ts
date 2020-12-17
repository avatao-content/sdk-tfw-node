import { ZMQMessage } from "../../types";

export function prepareStepFsmMessage(
  state: string | number,
  force: boolean = false,
): ZMQMessage {
  return {
    key: "fsm.trigger",
    transition: `${force ? "to_" : "step_"}${state.toString()}`,
  };
}

export function prepareAskFsmStateMessage(): ZMQMessage {
  return {
    key: "fsm.update",
  };
}
