import zmq = require('zeromq');
import { Utilities } from '../Utilities';

export abstract class EventHandler {
    sock : zmq.sock;
    key : String;
    util: Utilities= new Utilities();

    constructor(key?: String) {
        this.key = key;
        this.sock = zmq.socket("sub");
        this.sock.connect("tcp://localhost:7654");
        this.sock.subscribe(key);
        console.log("my key: " + this.key);
        console.log("got key: " + key);

    };

    start() : void {
        this.sock.subscribe(this.key);
        this.sock.on("message", function(topic, messageBuffer) {
            let message = messageBuffer.toString();
            console.log("Got message: ", message);
            this.handleEvent(message);
        });
    };

    abstract handleEvent(message: String): void
}