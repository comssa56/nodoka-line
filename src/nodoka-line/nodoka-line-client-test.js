
class NodokaLineTestClient {

    replyMessage(token, message){
        console.log("reply message:" + token + ":" + JSON.stringify( message ) );
    }

    broadcast(message){
        console.log("broadcast message:" + JSON.stringify( message ));
    }

    getProfile(userId) {
        return new Promise((resolve)=>{
            resolve({
                displayName : 'TEST-SAN',
            });
        });
    }
}

exports.Create = ()=>{
    return new NodokaLineTestClient();
}