const util = require('../util/util.js');
const postgres = require('../util/postgres.js');

exports.Test = async ()=>{
    const PORT = process.env.PORT || 8080;

    const seq_q = {
        text: 'SELECT * FROM tbl_consume_id_seq;',
        values: [],
    };
    
    const data_q = {
        text: 'INSERT INTO tbl_consume(kind, price, consume_time) VALUES($1, $2, $3)',
        values: ['食費', 123, '2000-01-01'],
    };

    let last_value = -1;

    const db = await postgres.getDBAccessor();
    try {
        await db.begin();
        await db.execJson(data_q);
        const r = await db.execJson(seq_q);
        console.log(r);
        db.commit();
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
                    text : '消費削除\n' + last_value,
                },
            },
        ]};
        util.json_request('localhost', PORT, '/hook', 'POST', event1).await;               
    }

}

