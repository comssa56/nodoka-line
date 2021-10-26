const util = require('../util/util.js');
const postgres = require('../util/postgres.js');

const event1 = {events : [
    {
        replyToken: 'test1',
        message : {
            text : '予定',
        },
    },
    {
        replyToken: 'test2',
        message : {
            text : '予定\n20210821',
        },
    },
    {
        replyToken: 'test3',
        message : {
            text : '予定\n202108212\n',
        },
    },
]};


const event2 = {events : [
    {
        replyToken: 'test4',
        message : {
            text : '予定\n2021082\nテスト4',
        },
    },
    {
        replyToken: 'test5',
        message : {
            text : '予定\n20210821\nテスト5',
        },
    },
    {
        replyToken: 'test6',
        message : {
            text : '予定\n202108212\nテスト6',
        },
    },
]};

const event3 = {events : [
    {
        replyToken: 'test7',
        message : {
            text : '予定\n20210821\nテスト7\nこれはテストですああああああ',
        },
    },
]};

const event4 = {events : [
    {
        replyToken: 'test2-1',
        message : {
            text : '予定確認',
        },
    },
    {
        replyToken: 'test2-2',
        message : {
            text : '予定確認\n202108',
        },
    },
    {
        replyToken: 'test2-3',
        message : {
            text : '予定確認\n20210821',
        },
    },
    {
        replyToken: 'test2-4',
        message : {
            text : '予定確認\n202108212',
        },
    },
]};

exports.Test = async ()=>{
    const PORT = process.env.PORT || 8080;
    util.json_request('localhost', PORT, '/hook', 'POST', event1).await;
    util.json_request('localhost', PORT, '/hook', 'POST', event2).await;
    util.json_request('localhost', PORT, '/hook', 'POST', event3).await;
}

exports.Test2 = async ()=>{
    const PORT = process.env.PORT || 8080;
    util.json_request('localhost', PORT, '/hook', 'POST', event4).await;
}
