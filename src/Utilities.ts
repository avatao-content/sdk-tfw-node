import zmq = require('zeromq');

export class Utilities {
    sock : zmq.sock;

    constructor() {
        this.sock = zmq.socket("push");
        this.sock.connect("tcp://localhost:8765");        
    };

    sendToTFW(givenKey: String, message?: object){
        let key = {"key":givenKey};
        let finalMessage;
        if (typeof message === "undefined"){
            finalMessage = key;
        } else {
            finalMessage = {...key, ...message};   
        }
        console.log(JSON.stringify(finalMessage))
        this.sock.send(JSON.stringify(finalMessage));
    }

    sendMessage(message: String, originator?: string){
        let messageToSend = {"message":message};
        if (typeof originator !== "undefined"){
            messageToSend = {...messageToSend, ...{"originator":originator}}
        }
        this.sendToTFW("message.send", messageToSend);
    }

    queueMessages(messages: Array<String>, originator?: string){
        var messagesArray : Array<Object>
        for (let messageEntry of messages) {
            let entry : object = {"message":messageEntry}
            messagesArray.push(entry)
        }
        let messageToSend = {"messages": messagesArray}
        if (typeof originator !== "undefined"){
            messageToSend = {...messageToSend, ...{"originator":originator}}
        }
        this.sendToTFW("message.queue", messageToSend);
    }

    setReloadSite(value: Boolean){
        let message = {"askReloadSite":value};
        this.sendToTFW("frontend.site", message);
    }

    setDocumentTitle(value: String){
        let message = {"documentTitle":value};
        this.sendToTFW("frontend.site", message);
    }

    switchLayout(value: String){
        let message = {"layout":value};
        this.sendToTFW("frontend.dashboard", message);
    }

    setHideMessages(value: Boolean){
        let message = {"hideMessages":value};
        this.sendToTFW("frontend.dashboard", message);
    }

    setIframeURL(value: String){
        let message = {"iframeUrl":value};
        this.sendToTFW("frontend.dashboard", message);
    }

    setShowUrlBar(value: Boolean){
        let message = {"showUrlBar":value};
        this.sendToTFW("frontend.dashboard", message);
    }

    switchToConsole(){
        let message = {"terminalMenuItem":"console"};
        this.sendToTFW("frontend.dashboard", message);
    }

    switchToTerminal(){
        let message = {"terminalMenuItem":"terminal"};
        this.sendToTFW("frontend.dashboard", message);
    }

    setShowDeployButton(value: Boolean){
        let message = {"showDeployButton":value};
        this.sendToTFW("frontend.ide", message);
    }

    setDeployButtonText(values: Array<String>){
        if (values.length == 4){
            let labels = ["TODEPLOY", "DEPLOYED", "DEPLOYING", "FAILED"]
            let deployButtonTextsMessage = {
                "TODEPLOY" : values[0],
                "DEPLOYED" : values[1],
                "DEPLOYING" : values[2],
                "FAILED" : values[3]}
            
            let message = {"deployButtonText":deployButtonTextsMessage};
            this.sendToTFW("frontend.ide", message);
        }   
    }

    reloadIframe(){
        this.sendToTFW("frontend.reloadIframe");
    }

    selectFile(filename: String, patterns? : Array<String>){
        let message = {"filename":filename};
        this.sendToTFW("ide.read", message);
        if (typeof patterns !== "undefined"){
            let message = {"patterns":patterns}; // TEST!!!
            this.sendToTFW("ide.read", message);
        }
    }

    writeToFile(filename, content){
        let message = {"filename":filename,"content":content};
        this.sendToTFW("ide.write", message);
    }

    reloadIde(){
        let message = {"scope":"websocket"};
        this.sendToTFW("ide.reload", message);
    }

    finishDeploy(errorMessage? : String){
        let message = {};
        if (typeof errorMessage === "undefined" || errorMessage == ""){
            this.sendToTFW("deploy.finish");
        }
        else {
            message = {"error":errorMessage};
            this.sendToTFW("deploy.finish", message);
        }
    }

    writeToTerminal(command: string){
        let message = {"command":command};
        this.sendToTFW("terminal.write", message);
    }

    writeToConsole(content: string){
        let message = {"content":content};
        this.sendToTFW("console.write", message);
    }

    readConsole(){
        this.sendToTFW("console.read");
    }

    startProcess(processName: string){
        let message = {"name": processName};
        this.sendToTFW("process.start", message);
    }

    stopProcess(processName: string){
        let message = {"name":processName};
        this.sendToTFW("process.stop", message);
    }

    restartProcess(processName: string){
        let message = {"name":processName};
        this.sendToTFW("process.restart", message);
    }

    stepTo(state: number){
        let message = {"transition":"to_"+state};
        this.sendToTFW("fsm.trigger", message);
    }

    step(state: number){
        let message = {"transition":"step_"+state};
        this.sendToTFW("fsm.trigger", message);
    }

    sendCustomTFWMessage(key: string, message?: object){
        if (typeof message !== "undefined")
            this.sendToTFW(key, message);
        else
            this.sendToTFW(key);
    }

    
}