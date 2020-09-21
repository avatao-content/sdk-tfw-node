import { EventHandler } from './EventHandler';

export class TypingEventHandler extends EventHandler {
    
    constructor() {
        super("ide.write");
    };

    handleEvent(message: string){
        console.log("Handling event...");
        let filename = "/home/user/workdir/cat.txt";
        let fileContent = this.getFileContent(filename);
    }

    getFileContent(filename: string) {
        console.log("getFileContent - UNIMPLEMENTED");
    }



}