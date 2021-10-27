const result = require('../util/result.js');
const nodoka = require('./nodoka-brain.js')
const line_client = require('./nodoka-line-client.js').Create();
const consume = require('./nodoka-line-consume.js');
const schedule = require('./nodoka-line-schedule.js');


const EVENT = {
    CONSUME_FOOD : '食費',
    CONSUME_INFRA : '光熱費',
    CONSUME_ZAKKA : '日用品',
    CONSUME_CHILD : '育児',
    CONSUME_STAT : '消費確認',
    CONSUME_RECEIPT : '消費明細',
    CONSUME_REJECT : '消費削除',
    SCHEDULE_ADD : '予定追加',
    SCHEDULE_CHECK : '予定確認',

    COMMAND_LIST : 'ヘルプ',
};

async function handleEvent(ev) {
    
    const messages = ev.message.text.split('\n');
    // for(message of messages) {
    //     console.log(message);
    // }
    switch(messages[0]) {
    case EVENT.CONSUME_FOOD:
    case EVENT.CONSUME_INFRA:
    case EVENT.CONSUME_ZAKKA:
    case EVENT.CONSUME_CHILD:
        console.log("message consume");
        return consume.handleConsume(ev, messages).await;
    case EVENT.CONSUME_STAT:
        console.log("message consume stat");
        return consume.handleConsumeStat(ev, messages).await;
    case EVENT.CONSUME_RECEIPT:
        console.log("message consume receipt");
        return consume.handleConsumeReceipt(ev, messages).await;
    case EVENT.CONSUME_REJECT:
        console.log("message delete receipt");
        return consume.handleDeleteReceipt(ev, messages).await;
    case EVENT.SCHEDULE_ADD:
        console.log("message add schedule");
        return schedule.handleScheduleAdd(ev, messages).await;
    case EVENT.SCHEDULE_CHECK:
        console.log("message check schedule");
        return schedule.handleScheduleCheck(ev, messages).await;

    case EVENT.COMMAND_LIST:
        {
            let str = "使える機能は…\n";
            for(const v of Object.values(EVENT)) {
                str += `${v}\n`;
            }
            return line_client.replyMessage(ev.replyToken, 
                nodoka.createNodokaTextMessage(str),
            )
        }
    default:
        console.log("message default");
    }

    const pro =  await line_client.getProfile(ev.source.userId);
    return line_client.replyMessage(ev.replyToken, 
        nodoka.createNodokaTextMessage(`${pro.displayName}さん、今「${ev.message.text}」って言いました`),
    )
}



exports.LineBot = async function(req, res) {
    const r = new result.Result(200, '');
    r.response(res);

    for(ev of req.body.events) {
        handleEvent(ev).await;
    }
};
    

