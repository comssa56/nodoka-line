const consume_test = require('./consume-test.js');
const delete_test = require('./delete-test.js');
const schedule_test = require('./schedule-test.js');

const util = require('../util/util.js');


const help = {events : [
    {
        replyToken: 'test2-1',
        message : {
            text : 'ヘルプ',
        },
    },
]};

async function HelpTest() {
    const PORT = process.env.PORT || 8080;
    util.json_request('localhost', PORT, '/hook', 'POST', help).await;
}

exports.Test = ()=> {
//    consume_test.Test();
//    delete_test.Test();
//    schedule_test.Test2();

    HelpTest().await;
}
