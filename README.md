#### TFW SDK for JavaScript developers ####

![GitHub](https://img.shields.io/github/license/avatao-content/sdk-tfw-node)

This package is part of our next-gen Tutorial Framework (which just an additional abstraction layer). The purpose of the project is to decrease the learning curve of creating tutorial exercises.
#### Usage ####

In your solvable container you should prepare an `eventHandlers.js` like this:
```javascript
const { sdk } = require('tfwsdk'); // The SDK object
const { EventHandlerBase } = require('tfwsdk'); // The base class for more complex event handler creation, check the bottom of the file for an example


function onDeployStart(currentState, completeMessage) {
    // This will have to be modified to properly listen for the
    // various deploy relted events
    sdk.sendChatMessage(`Deploy clicked in state ${currentState}`)
    sdk.restartProcess('webservice')
    // Do some tests, etc...
    sdk.finishDeploy() // Call with an error message to signal a failed deploy
}

function onMessageButtonClick(currentState, btnValue, completeMessage) {
    sdk.sendChatMessage(`Clicked: ${btnValue} in state ${currentState}`)
    btnValue === 'yes'
        ? sdk.stepFsm(2) // Step if possible
        : sdk.stepFsm(1, true) // Force the step
}

function onIdeWrite(currentState, fileName, content, completeMessage) {
    sdk.queueChatMessages([
        `File ${fileName} was written in state ${currentState}`,
        `Content:<br>${content}`
    ])
}

function onTerminalCommand(currentState, command, completeMessage) {
    sdk.sendChatMessage(`Command \`${command}\` executed in state ${currentState}`)
}

// Set callbacks for the desired event key
const callbacks = {
    "deploy.start": onDeployStart,
    "message.button.click": onMessageButtonClick,
    "ide.write": onIdeWrite,
    "history.bash": onTerminalCommand,
}
sdk.start(callbacks); // Start sdk event handling



class FsmUpdateHandler extends EventHandlerBase {
    constructor() {
        super(["fsm.update"]); //Call super with the list of the keys
    }

    handleMessage(message) { // Implement the abstract message handler function
        if (message.key == "fsm.update" && "current_state" in message) {
            sdk.sendChatMessage(`I'm a custom event handler and the FSM stepped to state ${message.current_state}`);
        }
    }
}
sdk.subscribeEventHandler(new FsmUpdateHandler()) // Subscribe the eventhandler
```

The SDK is running in the background (with supervisor) and executes the above functions on corresponding events. Also, it provides some really useful functions to communicate with the TFW. 

```
---
dashboard:
  stepToFirstStateAutomatically: true
  messageSpeed: 400 # Word per minute
  layout: web-only
  enabledLayouts:
    #- terminal-ide-web
    #- terminal-ide-vertical
    #- terminal-web
    #- ide-web-vertical
    - terminal-ide-horizontal
    #- terminal-only
    #- ide-only
    - web-only
webservice:
  iframeUrl: /webservice
  showUrlBar: false
  reloadIframeOnDeploy: false
terminal:
  directory: /home/user
  terminalMenuItem: terminal # terminal / console
ide:
  patterns: 
   - /home/user/tutorial/*
  showDeployButton: true
  deployButtonText:
    TODEPLOY:  Deploy
    DEPLOYED:  Deployed
    DEPLOYING: Reloading app...
    FAILED:    Deployment failed
```


## Contributing

Create a fork, implement your changes and open a PR for review.

Please use the [conventional commit formats](https://www.conventionalcommits.org/en/v1.0.0/) while contributing. We are using the Angular preset.
