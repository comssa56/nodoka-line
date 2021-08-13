const result = require('./result.js');

async function echoman(client, ev) {
    const pro =  await client.getProfile(ev.source.userId);
    return client.replyMessage(ev.replyToken, {
      type: "text",
      text: `${pro.displayName}さん、今「${ev.message.text}」って言いました？`
    })
}



exports.LineBot = function(client, req, res) {
        const r = new result.Result(200, '');
        r.response(res);
    
        const events = req.body.events;
        const promises = [];
        for (let i = 0, l = events.length; i < l; i++) {
          const ev = events[i];
          promises.push(
            echoman(ev)
          );
        }
        Promise.all(promises).then(console.log("pass"));
    
        console.log("pass"); 
};
    

