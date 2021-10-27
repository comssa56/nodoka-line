const postgres = require('../util/postgres.js');
const util = require('../util/util.js');


exports.insertConsume = async (kind, price) => {
    console.log("CONSUME:" + kind + "," + price);
 
    const q = {
        text: 'INSERT INTO tbl_consume(kind, price) VALUES($1, $2)',
        values: [kind, price],
    }

    const r = await postgres.execJson(q);
    return r;
};

exports.insertConsumeWithDate = async (kind, price,date) => {
    console.log("CONSUME:" + kind + "," + price + ',' + date);
 
    const q = {
        text: 'INSERT INTO tbl_consume(kind, price, consume_time) VALUES($1, $2, $3)',
        values: [kind, price, date],
    }

    const r = await postgres.execJson(q);
    return r;
};


exports.selectConsumeSum = async() => {
    const q = {
        text: "SELECT kind, sum(price), to_char(date, 'YYYY/MM') as date FROM " 
        + "(SELECT kind, price, date_trunc('month', consume_time) as date FROM tbl_consume) A "
        + "GROUP BY kind, date ORDER BY kind, date",
        values: [],
    }
    const r = await postgres.execJson(q);
    return r;
};

exports.selectConsumeReceipt = async(yearmonth) => {
    const q = {
        text: "SELECT id, kind, price,  to_char(consume_time, 'DD') as date "
        + "FROM tbl_consume "
        + "WHERE to_char(consume_time, 'YYYYMM') = $1 "
        + "ORDER BY consume_time ASC",
        values:[yearmonth],
    };    ''
    const r = await postgres.execJson(q);
    return r;
};

exports.deleteConsumeReceipt = async(id) => {
    const q = {
        text: "DELETE "
        + "FROM tbl_consume "
        + "WHERE id=$1",
        values:[id],
    };    
    const r = await postgres.execJson(q);
    return r;
}
