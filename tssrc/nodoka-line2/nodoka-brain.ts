import { Util } from '../util/util';
import { TextMessage } from '@line/bot-sdk'

export class NodokaBrain {

    private static suffix : string[] = [
        'だっちゃ',
        'だなも',
        'なり',
        'クポ',
        'じゃけぇ',
        'でやんす',
        'ぜよ'
    ];

    public static strNodokafy(text : string) {
        const sel =  Util.getRandomInt(this.suffix.length);
        return text + this.suffix[sel];
    }

    public static createNodokaTextMessage(message : string) {        
        return  {type:"text", text: this.strNodokafy(message)} as TextMessage;
    }

}


