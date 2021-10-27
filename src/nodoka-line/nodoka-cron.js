const nodoka = require('./nodoka-brain.js')
const util = require('../util/util.js');
const dao_schedule = require('../model/dao_schedule.js');
const line_client = require('./nodoka-line-client.js').Create();
const moment = require("moment");

async function DailySchedule() {
    const m = moment().add(1, 'days'); 
    console.log(m);
    const from = m.get().format('YYYY-MM-DD 00:00:00+09');
    const to = m.get().format('YYYY-MM-DD 24:00:00+09');

    const results = await dao_schedule.selectScheduleBetween(from, to);

    let str =`${m.format('MM/DD')}の予定…`;
    if(results && results.length>0) {
        console.log(results);
        for(row of results) {
            str += `・${row.title},\t${row.description}\n`;
        }
        return line_client.broadcast(
            nodoka.createNodokaTextMessage(str)
        );         
    } else {
        return line_client.broadcast(
            nodoka.createNodokaTextMessage(`${str}がありません`)
        ); 
    }    
}


exports.DailyCron = async () => {
    await DailySchedule();
}