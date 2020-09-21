import { EventHandler } from './EventHandler';

export class ConsoleReadEventHandler extends EventHandler{
 
    constructor() {
        super("console.read");
    };

    handleEvent(message: string){
        let content = this.getContent(message);
        console.log(message);
    }

    getContent(message) {
        return message["content"];
    }
}