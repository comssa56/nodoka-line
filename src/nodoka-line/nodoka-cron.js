const nodoka = require('./nodoka-brain.js')
const util = require('../util/util.js');
const dao_schedule = require('../model/dao_schedule.js');
const line_client = require('./nodoka-line-client.js').Create();
const moment = require("moment");

async function dailySchedule(datem) {
    console.log(datem);
    const from = datem.get().format('YYYY-MM-DD 00:00:00+09');
    const to = datem.get().format('YYYY-MM-DD 24:00:00+09');

    const results = await dao_schedule.selectScheduleBetween(from, to);

    let str =`${datem.format('MM/DD')}の予定…\n`;
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


// date : moment
exports.dailyCron = async (datem) => {
    await dailySchedule(datem);
}