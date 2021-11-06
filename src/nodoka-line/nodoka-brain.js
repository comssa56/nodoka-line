const util = require('../util/util.js');

const suffix = [
    'だっちゃ',
    'だなも',
    'なり',
    'クポ',
    'じゃけぇ',
    'でやんす',
    'ぜよ'
];

function strNodokafy(text) {
    const sel =  util.getRandomInt(suffix.length);
    return text + suffix[sel];
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



