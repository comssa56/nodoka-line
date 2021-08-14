
export function strNodokafy(text) {
    return text + "だぞい";
}

export function createNodokaTextMessage(message){
    return {
        type: "text",
        text: strNodokafy(message),                
    }
}

