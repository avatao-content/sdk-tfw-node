import { ZMQConnector } from "../zmq/zmqConnector";
import { CallbackDict, ZMQMessage } from "../types";

const CallbackValues = {
  "messages.button.click": ["value"],
  "ide.write": ["filename", "content"],
  "history.bash": ["command"],
};

const getValues = (keys: string[], message: ZMQMessage): string[] => {
  const values: string[] = [];
  keys.forEach((key) => {
    values.push(message[key]);
  });
  return values;
};

class SDK {
  fsmState: number;
  private _connector: ZMQConnector;
  private _messageCallbacks: CallbackDict;

  constructor() {
    this.fsmState = 0;
    this._messageCallbacks = {};
    this._connector = new ZMQConnector();
  }

  async start(): Promise<void> {
    await this._connector.setup(this.handleMessage);
  }

  handleMessage(message: ZMQMessage): void {
    const key = message.key;
    try {
      if (key == "fsm.update") {
        this.fsmState = parseInt(message.current_state);
      } else if (key == "deploy.start") {
        let success = false;
        try {
          // A response is always required, have to handle the error here
          success = this._messageCallbacks.key(this.fsmState);
        } catch (error) {
          console.log(`[ERROR] ${key}: ${error.toString()}`);
        }
        const response = { key: "deploy.finish" };
        if (!success) response["error"] = true;
        this._connector.sendMessage(response);
      } else {
        if (key in CallbackValues) {
          this._messageCallbacks.key(
            this.fsmState,
            ...getValues(CallbackValues[key], message),
          );
        } else {
          console.log(`[INFO] callback not found for ${key}`);
        }
      }
    } catch (error) {
      console.log(`[ERROR] ${key}: ${error.toString()}`);
    }
  }
}

export { SDK };
