import { Profile, User, WebhookEvent, MessageEvent, TextMessage } from '@line/bot-sdk';
import { Config } from '../util/config'
import { NodokaBrain } from './nodoka-brain'

export class NodokaLine2TextMessageEvent {
    private ev : MessageEvent;
    private message : TextMessage;

    constructor(ev_: MessageEvent) {
        console.assert(ev_.message.type=="text", `illegal message event type ${ev_.message.type}`);
        this.ev = ev_;
        this.message = this.ev.message as TextMessage;
    }

    private isMatch(str : string, str2 : string) {
        const r : number = str.search(str2);
        return r==0 ? true : false;
    }
    
    private createOumuGaeshiCallBack = (replyToken : string, addText : string) => {
        return (pro : Profile | unknown) => {
            const pro_ = pro as Profile;
            Config.getInstance().lineClient().replyMessage(replyToken, 
                NodokaBrain.createNodokaTextMessage(`${pro_.displayName}さん、今「${addText}」って言いました`),
            );
        }
    }
    private lineClient() {
        return Config.getInstance().lineClient();
    }

    private EVENT : any = {
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

    public exec: () => void = () => {
        const messages = this.message.text.split('\n');

        // for(message of messages) {
        //     console.log(message);
        // }
        switch(messages[0]) {
        // case this.EVENT.CONSUME_FOOD:
        // case this.EVENT.CONSUME_INFRA:
        // case this.EVENT.CONSUME_ZAKKA:
        // case this.EVENT.CONSUME_CHILD:
        //     console.log("message consume");
        //     return consume.handleConsume(this.ev, messages).await;
        // case this.EVENT.CONSUME_STAT:
        //     console.log("message consume stat");
        //     return consume.handleConsumeStat(this.ev, messages).await;
        // case this.EVENT.CONSUME_RECEIPT:
        //     console.log("message consume receipt");
        //     return consume.handleConsumeReceipt(this.ev, messages).await;
        // case this.EVENT.CONSUME_REJECT:
        //     console.log("message delete receipt");
        //     return consume.handleDeleteReceipt(this.ev, messages).await;
        // case this.EVENT.SCHEDULE_ADD:
        //     console.log("message add schedule");
        //     return schedule.handleScheduleAdd(this.ev, messages).await;
        // case this.EVENT.SCHEDULE_CHECK:
        //     console.log("message check schedule");
        //     return schedule.handleScheduleCheck(this.ev, messages).await;
        // case this.EVENT.SCHEDULE_REJECT:
        //     console.log("message delete schedule");
        //     return schedule.handleDeleteScheduleByDate(this.ev, messages).await;
        
        case this.EVENT.COMMAND_LIST:
            {
                let str = "使える機能は…\n";
                for(const v of Object.values(this.EVENT)) {
                    str += `${v}\n`;
                }
                return this.lineClient().replyMessage(this.ev.replyToken, 
                    NodokaBrain.createNodokaTextMessage(str),
                )
            }
        default:
        }
        
        // 前方一致でコマンドを探す
        const c = messages[0];
        if(this.isMatch(c, this.EVENT.CHEER_KAWAII)
        || this.isMatch(c, this.EVENT.CHEER_KAWAII2)) {
            return this.lineClient().replyMessage(this.ev.replyToken, 
                NodokaBrain.createNodokaTextMessage('当然'),
            );
        } else if(this.isMatch(c, this.EVENT.CHEER_ERAI)
        || this.isMatch(c, this.EVENT.CHEER_ERAI2)) {
            return this.lineClient().replyMessage(this.ev.replyToken, 
                NodokaBrain.createNodokaTextMessage('照れる'),
            );
        }
    
    
        console.log("message default");
        return this.lineClient().getProfile((this.ev.source as User).userId)
        .then(this.createOumuGaeshiCallBack( this.ev.replyToken, this.message.text))
        .catch((err)=>{console.log(err);});
    };

};
