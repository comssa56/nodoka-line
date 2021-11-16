import { WebhookEvent, MessageEvent, TextMessage } from '@line/bot-sdk';
const nodoka_line = require('../../src/nodoka-line/nodoka-line.js');

export class NodokaLine2TextMessageEvent {
    private ev : MessageEvent;
    private message : TextMessage;

    constructor(ev_: MessageEvent) {
        console.assert(ev_.message.type=="text", `illegal message event type ${ev_.message.type}`);
        this.ev = ev_;
        this.message = this.ev.message as TextMessage;
    }

    public exec: () => void = () => {
        const messages = this.message.text.split('\n');
    };



    private EVENT = {
        CONSUME_FOOD : '食費',
        CONSUME_INFRA : '光熱費',
        CONSUME_ZAKKA : '日用品',
        CONSUME_CHILD : '育児',
        CONSUME_STAT : '消費確認',
        CONSUME_RECEIPT : '消費明細',
        CONSUME_REJECT : '消費削除',
        SCHEDULE_ADD : '予定追加',
        SCHEDULE_CHECK : '予定確認',
        SCHEDULE_REJECT : '予定削除',
    
        CHEER_KAWAII : 'かわいい',
        CHEER_KAWAII2 : '可愛い',
        CHEER_ERAI : 'えらい',
        CHEER_ERAI2 : '偉い',
    
        COMMAND_LIST : 'ヘルプ',
    };
}
