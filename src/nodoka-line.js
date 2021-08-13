const result = require('./result.js');
const conf = require('./config.js');

const line = conf.get('line');
const line_client = new line.Client(conf.get('line-config')); 

async function handleEvent(ev) {
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
    

