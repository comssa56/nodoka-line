import { WebhookEvent, MessageEvent, TextMessage } from '@line/bot-sdk';
import { NodokaLine2MessageEvent } from './nodoka-line2-message-event';

export class NodokaLine2Test {
    private ev : WebhookEvent;

    constructor(ev_ : WebhookEvent) {
        this.ev = ev_;
    }

    exec: () => void = () => {
        switch(this.ev.type) {
        case "message":
            const mev = new NodokaLine2MessageEvent(this.ev);
            mev.exec();
            break;
        default:
            console.assert(false, `unsupported event type ${this.ev.type}`);
        }            
    };


}


