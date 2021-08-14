

class NodokaBrain {

    nodokafy(text) {
        return text + "だぞい";
    }

    createTextMessage(message){
        return {
            type: "text",
            text: this.nodokafy(message),                
        }
    }

}

const getNodokaBrain = ()=>{
    return new NodokaBrain();
}

exports.createTextMessage = (message)=>{
    return getNodokaBrain().createTextMessage(message);
}