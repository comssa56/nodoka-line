import { Request, Response } from 'express';
import { NodokaLine2WebhookEvent } from './nodoka-line2-webhook-event';
import { Result } from '../util/express-result';
import { WebhookEvent } from '@line/bot-sdk';

class WebhookEventRequest {
    public events : WebhookEvent[];
    constructor(evs : WebhookEvent[]) {
        this.events = evs;
    }
}

export class NodokaLine2 {
    constructor() {
    }

    
    static lineBot : (req : Request, res : Response) => void = (req : Request, res : Response) => {

        const r : Result = new Result(200, '');
        r.response(res);

        const events : WebhookEvent[] = (req.body as WebhookEventRequest).events;
    
        for(const ev of events) {
            const e : NodokaLine2WebhookEvent = new NodokaLine2WebhookEvent(ev); 
            e.exec();
        }
        
    };


}
