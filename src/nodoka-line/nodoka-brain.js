
function strNodokafy(text) {
    return text + "だなも";
}

function createNodokaTextMessage(message) {
    return {
        type: "text",
        text: strNodokafy(message),                
    }
}

exports.strNodokafy = (text)=>{
    return strNodokafy(text);
}

exports.createNodokaTextMessage = (message)=>{
    return createNodokaTextMessage(message);
};


