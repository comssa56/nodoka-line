
export class LineClientDummy {

    replyMessage(token : string, message : any){
        console.log("reply message:" + token + ":" + JSON.stringify( message ) );
    }

    broadcast(message : any){
        console.log("broadcast message:" + JSON.stringify( message ));
    }

    getProfile(userId : string | undefined) {
        return new Promise((resolve)=>{
            resolve({
                displayName : 'TEST-SAN',
            });
        });
    }
}
