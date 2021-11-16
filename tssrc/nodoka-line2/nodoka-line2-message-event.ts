import { WebhookEvent, MessageEvent, TextMessage } from '@line/bot-sdk';
import { NodokaLine2Method } from './nodoka-line2-function';
import { NodokaLine2TextMessageEvent } from './nodoka-line2-text-message-event';

export class NodokaLine2MessageEvent {
    private ev : MessageEvent;

    constructor(ev_ : MessageEvent) {
        console.assert(ev_.type=="message", `illegal event type ${ev_.type}`)
        this.ev = ev_;
    }

    exec: () => void = () => {
        switch(this.ev.message.type) {
        case "text":
            const tev = new NodokaLine2TextMessageEvent(this.ev);
            tev.exec();
            break;
        default:
            console.assert(false, `unsupported message type ${this.ev.message.type}`);
        }            
    };

}
