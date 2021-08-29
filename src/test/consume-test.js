const util = require('../util/util.js');

const event1 = {events : [
    {
        replyToken: 'test1',
        message : {
            text : '食費\nあ',
        },
    },
    {
        replyToken: 'test2',
        message : {
            text : '食費\n1234',
        },
    },
]};

const event2 = {events : [
    {
        replyToken: 'test3',
        message : {
            text : '食費\n1\n2021082',
        },
    },
    {
        replyToken: 'test4',
        message : {
            text : '食費\n1\n20210821',
        },
    },
    {
        replyToken: 'test5',
        message : {
            text : '食費\n1\n202108212',
        },
    },
]};

const event3 = {events : [
    {
        replyToken: 'test6',
        message : {
            text : '食費\n22',
        },
    },
    {
        replyToken: 'test7',
        message : {
            text : '光熱費\n22',
        },
    },
    {
        replyToken: 'test8',
        message : {
            text : '日用品\n22',
        },
    },
]};

const event4 = {events : [
    {
        replyToken: 'test9',
        message : {
            text : '消費確認\n',
        },
    },
]};

const event5 = {events : [
    {
        replyToken: 'test10',
        message : {
            text : '消費明細\n20210',
        },
    },
    {
        replyToken: 'test11',
        message : {
            text : '消費明細\n202108',
        },
    },
    {
        replyToken: 'test12',
        message : {
            text : '消費明細\n202109',
        },
    },
]};


exports.Test = ()=>{
    const PORT = process.env.PORT || 8080;
    util.json_request('localhost', PORT, '/hook', 'POST', event1).await;
    util.json_request('localhost', PORT, '/hook', 'POST', event2).await;
    util.json_request('localhost', PORT, '/hook', 'POST', event3).await;
    util.json_request('localhost', PORT, '/hook', 'POST', event4).await;
    util.json_request('localhost', PORT, '/hook', 'POST', event5).await;
}
