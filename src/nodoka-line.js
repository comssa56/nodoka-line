const result = require('./result.js');
const conf = require('./config.js');

const line = conf.get('line');
const line_client = new line.Client(conf.get('line-config')); 


const { Client } = require('pg');

async function getPgClient() {
    return new Client(conf.get('pg-config'));
} 

// 消費を保存する
async function handleConsume(ev, messages) {
    const kind = messages[1];
    const price = messages[2];

    if(kind && price) 
    {
        await createConsume(kind, price);
        return line_client.replyMessage(ev.replyToken, {
            type: "text",
            text: messages + "\nを保存完了しました。"
        })              
    } else {
        return line_client.replyMessage(ev.replyToken, {
            type: "text",
            text: "理解できなんだ\n\n消費\n食料orその他\n価格（半角数値）\nで入力するんだぞい"
        })              
    }
}

async function handleConsumeStat(ev, messages) {
    const results = await getConsumeSum();
    console.log(results);

    if(results) {
        let str ="";
        for(row of results) {
            str += row.kind + "|" + row.sum + "円|" + JSON.stringify(row.date).split('T')[0] + "/n";
        }
        return line_client.replyMessage(ev.replyToken, {
            type: "text",
            text: str,
        }); 
    
    } else {
        return line_client.replyMessage(ev.replyToken, {
            type: "text",
            text: "記録がありません",
        }); 
    }

}

async function createConsume(kind, price) {
    console.log("consume:" + kind + "," + price);
    pg_client = getPgClient();
    pg_client.connect();

    const q = {
        text: 'INSERT INTO tbl_consume(kind, price) VALUES($1, $2)',
        values: [kind, price],
    }

    const r = await pg_client.query(q)
    pg_client.end();
    return r;
};

async function getConsumeSum() {
    pg_client = getPgClient();
    pg_client.connect();

    const q = {
        text: "SELECT kind, sum(price), date FROM " 
        + "(SELECT kind, price, date_trunc('day', insert_date) as date FROM tbl_consume) A "
        + "GROUP BY kind, date ORDER BY kind, date"
        ,
        values: [],
    }

    const r = await pg_client.query(q)
    pg_client.end();
    return r ? r.rows : null;
};


async function handleEvent(ev) {
    
    const messages = ev.message.text.split('\n');
    for(message of messages) {
        console.log(message);
    }
    switch(messages[0]) {
    case "消費":
        console.log("message consume");
        return handleConsume(ev, messages).await;
    case "消費確認":
        console.log("message consume stat");
        return handleConsumeStat(ev, messages).await;
    default:
        console.log("message default");
    }

    const pro =  await line_client.getProfile(ev.source.userId);
    return line_client.replyMessage(ev.replyToken, {
      type: "text",
      text: `${pro.displayName}さん、今「${ev.message.text}」って言いました？`
    })
}



exports.LineBot = function(req, res) {
    const r = new result.Result(200, '');
    r.response(res);

    Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => {console.log(result);});
};
    

