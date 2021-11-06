const conf = require('../util/config.js');
const line = conf.get('line');
const line_client = new line.Client(conf.get('line-config')); 

class NodokaLineClient {
    replyMessage(token, message){
        line_client.replyMessage(token, message);
    }

    broadcast(message){
        line_client.broadcast(message);
    }

    getProfile(userId) {
        return line_client.getProfile(userId);
    }

}

exports.Create = ()=>{
    return new NodokaLineClient();
}