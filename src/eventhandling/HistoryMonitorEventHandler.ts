import { EventHandler } from './EventHandler';

export class HistoryMonitorEventHandler extends EventHandler {
    
    constructor() {
        super("history.bash");
    };

    handleEvent(message: string){
        let lastCommand = message["command"];
        console.log("Last command: " + lastCommand);
    }
}