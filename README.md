#### TFW SDK for JavaScript developers ####

![GitHub](https://img.shields.io/github/license/avatao-content/sdk-tfw-node)
![GitHub package.json version](https://img.shields.io/github/package-json/v/avatao-content/sdk-tfw-node)

This package is part of our next-gen Tutorial Framework (which just an additional abstraction layer). The purpose of the project is to decrease the learning curve of creating tutorial exercises.

#### Installation ####

Install the SDK:

```
npm i @avatao/tfwsdk
```
#### Usage ####

In your solvable container you should prepare an `eventHandlers.js` like this:
```javascript
// The SDK object
const { sdk } = require("@avatao/tfwsdk");
// The base class for more complex event handler creation
const { EventHandlerBase } = require("@avatao/tfwsdk");

function onDeployStart(currentState, completeMessage) {
  sdk.sendChatMessage(`Deploy clicked in state ${currentState}`);
  sdk.restartProcess("webservice");
  // Do some tests, etc...
  sdk.finishDeploy(); // Call with an error message to signal a failed deploy
}

function onMessageButtonClick(currentState, btnValue, completeMessage) {
  sdk.sendChatMessage(`Clicked: ${btnValue} in state ${currentState}`);
  btnValue === "yes"
    ? sdk.stepFsm(2) // Step if possible
    : sdk.stepFsm(1, {force: true}); // Force the step
}

function onIdeWrite(currentState, fileName, content, completeMessage) {
  sdk.queueChatMessages([
    `File ${fileName} was written in state ${currentState}`,
    `Content:<br>${content}`,
  ]);
}

function onTerminalCommand(currentState, command, completeMessage) {
  sdk.sendChatMessage(
    `Command \`${command}\` executed in state ${currentState}`
  );
}

// Set callbacks for the desired event key
const callbacks = {
  "deploy.start": onDeployStart,
  "message.button.click": onMessageButtonClick,
  "ide.write": onIdeWrite,
  "history.bash": onTerminalCommand,
};
sdk.start(callbacks); // Start sdk event handling

class FsmUpdateHandler extends EventHandlerBase {
  constructor() {
    super(["fsm.update"]); // Call super with the list of the keys
  }

  handleMessage(message) {
    // Implement the abstract message handler function
    if (message.key == "fsm.update" && "current_state" in message) {
      sdk.sendChatMessage(`The FSM stepped to state ${message.current_state}`);
    }
  }
}
sdk.subscribeEventHandler(new FsmUpdateHandler()); // Subscribe the eventhandler
```

The SDK is running in the background (with supervisor) and executes the above functions on corresponding events. Also, it provides some really useful functions to communicate with the TFW. 
## Contributing

Create a fork, implement your changes and open a PR for review.

Please use the [conventional commit formats](https://www.conventionalcommits.org/en/v1.0.0/) while contributing. We are using the Angular preset.
