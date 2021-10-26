const result = require('../util/result.js');
const nodoka = require('./nodoka-brain.js')
const line_client = require('./nodoka-line-client.js').Create();
const consume = require('./nodoka-line-consume.js');

async function handleEvent(ev) {
    
    const messages = ev.message.text.split('\n');
    // for(message of messages) {
    //     console.log(message);
    // }
    switch(messages[0]) {
    case "食費":
    case "光熱費":
    case "日用品":
    case "育児":
        console.log("message consume");
        return consume.handleConsume(ev, messages).await;
    case "消費確認":
        console.log("message consume stat");
        return consume.handleConsumeStat(ev, messages).await;
    case "消費明細":
        console.log("message consume receipt");
        return consume.handleConsumeReceipt(ev, messages).await;
    case "消費削除":
        console.log("message delete receipt");
        return consume.handleDeleteReceipt(ev, messages).await;
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
    

