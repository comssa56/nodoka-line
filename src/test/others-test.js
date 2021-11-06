const util = require('../util/util.js');

const event1 = {events : [
    {
        replyToken: 'test1',
        message : {
            text : 'かわいい',
        },
    },
    {
        replyToken: 'test2',
        message : {
            text : '可愛い',
        },
    },
    {
        replyToken: 'test3',
        message : {
            text : 'ね',
        },
        source : {
            userId : 'xxxx'
        }
    },
    {
        replyToken: 'test4',
        message : {
            text : '可愛いね',
        },
    },
]};


const event2 = {events : [
    {
        replyToken: 'test2-1',
        message : {
            text : 'えらい',
        },
    },
    {
        replyToken: 'test2-2',
        message : {
            text : '偉い',
        },
    },
]};

exports.Test = ()=>{
    const PORT = process.env.PORT || 8080;
    util.json_request('localhost', PORT, '/hook', 'POST', event1).await;
    util.json_request('localhost', PORT, '/hook', 'POST', event2).await;
}

