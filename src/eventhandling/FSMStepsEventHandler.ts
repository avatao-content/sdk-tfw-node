import { EventHandler } from './EventHandler';

export class FSMStepsEventHandler extends EventHandler {
    
    actualState: Number;
    
    constructor() {
        super("fsm.update");
        this.actualState = 0;
    };

    handleEvent(message: string){
        this.updateState(message);
        console.log("New state: " + this.actualState);
    }

    updateState(message) {
        this.actualState = Number(message["current_state"]);
    }
}