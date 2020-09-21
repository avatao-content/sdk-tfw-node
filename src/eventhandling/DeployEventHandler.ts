import { EventHandler } from './EventHandler';

export abstract class DeyployEventHandler extends EventHandler{
 
    constructor() {
        super("deploy.start");
    };

    sendFinishDeployMessage(errorMessage? : String): void {
        this.util.finishDeploy(errorMessage);
    }
}