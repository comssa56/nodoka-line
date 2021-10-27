const postgres = require('../util/postgres.js');
const util = require('../util/util.js');

const TBL_NAME = 'tbl_schedule';

exports.insertSchedule = async (time, title, description) => {
    console.log("Schedule:" + time + "," + title + "," + description);
 
    const q = {
        text: 'INSERT INTO ' + TBL_NAME + '(schedule_time, title, description) VALUES($1, $2, $3)',
        values: [time, title, description],
    }
    const r = await postgres.execJson(q);
    return r;
};

exports.selectScheduleBetween = async (from,to) => { 
    console.log(`from:${from}`);
    console.log(`to:${to}`);
    const q = {
        text: 'SELECT id, to_char(schedule_time, \'YYYY/MM/DD\') as schedule_time, title, description '
             + 'FROM '+  TBL_NAME + ' '
             + 'WHERE  tstzrange($1, $2, \'[)\') @> schedule_time '
             + 'ORDER BY schedule_time ',
        values: [from, to],
    }

    const r = await postgres.execJson(q);
    return r;
};

exports.selectScheduleFrom = async (from) => { 
    const q = {
        text: 'SELECT id, to_char(schedule_time, \'YYYY/MM/DD\') as schedule_time, title, description '
             + 'FROM '+  TBL_NAME + ' '
             + 'WHERE schedule_time > $1 '
             + 'ORDER BY schedule_time ',
        values: [from],
    }
    const r = await postgres.execJson(q);
    return r;
};
