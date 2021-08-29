const result = require('../util/result.js');
const util = require('../util/util.js');
const nodoka = require('./nodoka-brain.js')
const dao_consume = require('../model/dao_consume.js');
const line_client = require('./nodoka-line-client.js').Create();


// 消費を保存する
async function handleConsume(ev, messages) {
    const kind = messages[0];
    const price = messages[1];
    const day = messages[2];

    if(kind && price) 
    {
        if(!util.isIntStr(price)) {
            return line_client.replyMessage(
                ev.replyToken, 
                nodoka.createNodokaTextMessage("価格は半角数字だけで記載してください")
            );    
        }


        if(day)
        {
            const d = util.ShortStrDate(day);
            if(day.length!=8 || !d) {
                return line_client.replyMessage(
                    ev.replyToken, 
                    nodoka.createNodokaTextMessage("日付は半角数字8桁で入力してください")
                );    
            }

            await dao_consume.insertConsumeWithDate(kind, price, d.get().format());
            return line_client.broadcast(
                nodoka.createNodokaTextMessage(messages + "\nを保存完了")
            );    
            
        }
        else
        {
            await dao_consume.insertConsume(kind, price);
            return line_client.broadcast(
                nodoka.createNodokaTextMessage(messages + "\nを保存完了")
            );    
        }
    } else {
        return line_client.replyMessage(
            ev.replyToken, 
            nodoka.createNodokaTextMessage("理解できなんだ\n\n消費\n食料orその他\n価格（半角数値）\nで入力する")
        );
    }
}

async function handleConsumeStat(ev, messages) {
    const results = await dao_consume.selectConsumeSum();
    console.log(results);

    if(results) {
        let str ="";
        for(row of results) {
            str += row.kind + "\t" + row.sum + "円\t" + row.date + "\n";
        }
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage(str)
            ); 
    
    } else {
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage("記録がありません")
        ); 
    }

}

async function handleConsumeReceipt(ev, messages) {
    const yearmonth = messages[1];

    const d = util.ShortStrDate(yearmonth);
    if(!yearmonth || yearmonth.length!=6 || !d) {
        return line_client.replyMessage(
            ev.replyToken, 
            nodoka.createNodokaTextMessage("確認年月は半角数字6桁で入力してください")
        );    
    }

    const results = await dao_consume.selectConsumeReceipt(yearmonth);
    console.log(results);

    if(results) {
        let str ="";
        for(row of results) {
            str += "消費" + row.id + "\t" + row.kind + "\t" + row.date + "日\t" + row.price + "円\n";
        }
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage(str)
        ); 
    
    } else {
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage("記録がありません")
        ); 
    }

}


async function handleEvent(ev) {
    
    const messages = ev.message.text.split('\n');
    // for(message of messages) {
    //     console.log(message);
    // }
    switch(messages[0]) {
    case "食費":
    case "光熱費":
    case "日用品":
        console.log("message consume");
        return handleConsume(ev, messages).await;
    case "消費確認":
        console.log("message consume stat");
        return handleConsumeStat(ev, messages).await;
    case "消費明細":
        console.log("message consume receipt");
        return handleConsumeReceipt(ev, messages).await;
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
    

