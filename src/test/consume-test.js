//const http = require('http');
const util = require('../util.js');

const event1 = {events : [
    {
        replyToken: 'test1',
        message : {
            text : '消費\n食料\nあ',
        },
    },
    {
        replyToken: 'test2',
        message : {
            text : '消費\n食料\n1234',
        },
    },
]};

const event2 = {events : [
    {
        replyToken: 'test3',
        message : {
            text : '消費\n食料\n1\n2021082',
        },
    },
    {
        replyToken: 'test4',
        message : {
            text : '消費\n食料\n1\n20210821',
        },
    },
    {
        replyToken: 'test5',
        message : {
            text : '消費\n食料\n1\n202108212',
        },
    },
]};

exports.Test = ()=>{
    const PORT = process.env.PORT || 8080;
    util.json_request('localhost', PORT, '/hook', 'POST', event1).await;
    util.json_request('localhost', PORT, '/hook', 'POST', event2).await;
}
