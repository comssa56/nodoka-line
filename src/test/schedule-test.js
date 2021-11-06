const util = require('../util/util.js');
const postgres = require('../util/postgres.js');

const event1 = {events : [
    {
        replyToken: 'test1',
        message : {
            text : '予定追加',
        },
    },
    {
        replyToken: 'test2',
        message : {
            text : '予定追加\n20210821',
        },
    },
    {
        replyToken: 'test3',
        message : {
            text : '予定追加\n202108212\n',
        },
    },
]};


const event2 = {events : [
    {
        replyToken: 'test4',
        message : {
            text : '予定追加\n2021082\nテスト4',
        },
    },
    {
        replyToken: 'test5',
        message : {
            text : '予定追加\n20210821\nテスト5',
        },
    },
    {
        replyToken: 'test6',
        message : {
            text : '予定追加\n202108212\nテスト6',
        },
    },
]};

const event3 = {events : [
    {
        replyToken: 'test7',
        message : {
            text : '予定追加\n20210821\nテスト7\nこれはテストですああああああ',
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



// DELETE
exports.deleteTest = async ()=>{
    const PORT = process.env.PORT || 8080;

    const seq_q = {
        text: 'SELECT * FROM tbl_schedule_id_seq;',
        values: [],
    };
    
    const data_q = {
        text: 'INSERT INTO tbl_schedule(title, description, schedule_time) VALUES($1, $2, $3)',
        values: ['昼ごはん', 'ラーメン', '2000-01-01'],
    };

    let last_value = -1;

    const db = await postgres.getDBAccessor();
    try {
        await db.begin();
        await db.execJson(data_q);
        const r = await db.execJson(seq_q);
        console.log(r);
        await db.commit();
        console.log("commit");
        last_value = r[0]['last_value'];
    } catch(e) {
        console.log(e);
        await db.rollback();
        console.log("rollback");
    } finally {
        await db.release();
        console.log("release");
    }

    if(last_value>0)
    {
        const event1 = {events : [
            {
                replyToken: 'test1',
                message : {
                    text : '予定削除\n' + last_value,
                },
            },
        ]};
        util.json_request('localhost', PORT, '/hook', 'POST', event1).await;               
    }

}

