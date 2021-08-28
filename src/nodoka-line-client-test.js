
class NodokaLineTestClient {

    replyMessage(token, message){
        console.log("reply message:" + token + ":" + JSON.stringify( message ) );
    }

    broadcast(message){
        console.log("broadcast message:" + JSON.stringify( message ));
    }
}

exports.Create = ()=>{
    return new NodokaLineTestClient();
}