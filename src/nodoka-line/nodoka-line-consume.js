const util = require('../util/util.js');
const nodoka = require('./nodoka-brain.js')
const dao_consume = require('../model/dao_consume.js');
const line_client = require('./nodoka-line-client.js').Create();


// 消費を保存する
exports.handleConsume = async (ev, messages) => {
    if(!messages[1]) {
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage("値段\n消費年月日(任意)\nを指定してください")
        ); 
    }

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

exports.handleConsumeStat = async (ev, messages) => {
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

exports.handleConsumeReceipt = async(ev, messages) => {
    if(!messages[1]) {
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage("確認年月\nを指定してください")
        ); 
    }

    const yearmonth = messages[1];

    if(!yearmonth || yearmonth.length!=6 || !util.ShortStrDate(yearmonth)) {
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

exports.handleDeleteReceipt = async(ev, messages) => {

    if(!messages[1]) {
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage("消したい明細番号\nを指定してください")
        ); 
    }

    const id = Number(messages[1]);
    if(!id) {
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage("idの指定は整数でお願いします")
        ); 
    
        return;
    }

    const results = await dao_consume.deleteConsumeReceipt(id);
    console.log(results);
    return line_client.broadcast(ev.replyToken, 
        nodoka.createNodokaTextMessage("" + id + "の取り消しをしました")
    ); 
}
