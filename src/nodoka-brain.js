
exports.strNodokafy = (text) => {
    return text + "だぞい";
}

exports.createNodokaTextMessage = (message)=>{
    return {
        type: "text",
        text: strNodokafy(message),                
    }
}



