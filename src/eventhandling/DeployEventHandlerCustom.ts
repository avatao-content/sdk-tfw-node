import { DeyployEventHandler } from './DeployEventHandler';

export class DeployEventHandlerCustom extends DeyployEventHandler {

    handleEvent(): void {
        console.log("DEPLOY handling event...")
    }
}