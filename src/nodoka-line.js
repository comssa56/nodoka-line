const result = require('./result.js');
const conf = require('./config.js');

const line = conf.get('line');
const line_client = new line.Client(conf.get('line-config')); 

async function handleConsume(messages) {
    const kind = messages[1];
    const price = messages[2];

    if(kind && price) 
    {
        await createConsume(kind, price);
        return true;
    }

    return false;
}

async function createConsume(kind, price) {
    console.log("consume:" + kind + "," + price);
    pg_client = conf.get('psql');
    pg_client.connect();

    const q = {
        text: 'INSERT INTO tbl_consume(kind, price) VALUES($1, $2)',
        values: [kind, price],
    }

    pg_client.query('q', (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      pg_client.end();
    });
};

async function handleEvent(ev) {
    
    const messages = ev.message.text.split('\n');
    for(message of messages) {
        console.log(message);
    }
    switch(messages[0]) {
    case "消費":
        console.log("message consume");
        const r =handleConsume(messages).await;
        if(!r) {
            return line_client.replyMessage(ev.replyToken, {
                type: "text",
                text: "理解できなんだ\n\n消費\n食料\n価格\nで入力するんだぞい"
              })          
        }
        return line_client.replyMessage(ev.replyToken, {
            type: "text",
            text: messages + "\nを保存完了しました。"
          })          

        break;
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
    
    // const events = req.body.events;
    // const promises = [];
    // for (let i = 0, l = events.length; i < l; i++) {
    //     const ev = events[i];
    //     console.log("handle...");
    //     console.log(JSON.stringify(ev));
    //     promises.push(handleEvent(ev));
    // }
    // Promise.all(promises).then(console.log("pass"));
    Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => {console.log(result);});
};
    

