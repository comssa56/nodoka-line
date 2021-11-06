const util = require('../util/util.js');
const nodoka = require('./nodoka-brain.js')
const dao_schedule = require('../model/dao_schedule.js');
const line_client = require('./nodoka-line-client.js').Create();
const moment = require("moment");


// 予定を保存する
exports.handleScheduleAdd = async (ev, messages) => {
    if(!messages[1]) {
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage("予定年月日\n題名\n説明(任意)\nを指定してください")
        ); 
    }

    const day = messages[1];
    const title = messages[2];
    let description = messages[3];

    if(day)
    {
        const d = util.ShortStrDate(day);
        if(!title || day.length!=8 || !d) {
            return line_client.replyMessage(
                ev.replyToken, 
                nodoka.createNodokaTextMessage("日付(半角数字8桁)\n予定名\n説明(任意、1行)\nで入力してください")
            );    
        }

        if(!description) {
            description = '';
        }

        await dao_schedule.insertSchedule(d.get().format(), title, description);
        return line_client.broadcast(
            nodoka.createNodokaTextMessage(messages + "\nを保存完了")
        );            
    }

    return line_client.replyMessage(
        ev.replyToken, 
        nodoka.createNodokaTextMessage("日付(半角数字8桁)\n予定名\n説明(任意、1行)\nで入力してください")
    ); 
}

exports.handleScheduleCheck = async (ev, messages) => {
    const day = messages[1];
    let results = null;

    // 本日以降の予定
    if(!day) {
        from = moment().format('YYYY-MM-DD 00:00:00+09');
        results = await dao_schedule.selectScheduleFrom(from);
    } else {
        // 指定日の予定
        const d = util.ShortStrDate(day);
        if(day.length!=8 || !d) {
            return line_client.replyMessage(
                ev.replyToken, 
                nodoka.createNodokaTextMessage("日付(半角数字8桁)\nで入力してください")
            );    
        }

        const from = d.get().format('YYYY-MM-DD 00:00:00+09');
        const to = d.get().format('YYYY-MM-DD 24:00:00+09');
        results = await dao_schedule.selectScheduleBetween(from, to);

    }

    if(results && results.length>0) {
        console.log(results);
        let str ="";
        for(row of results) {
            str += `■${row.schedule_time},\t${row.title},\t${row.description},\t予定${row.id}\n`;
        }
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage(str)
            );         
    } else {
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage("予定がありません")
        ); 
    }    

}

exports.handleDeleteScheduleById = async(ev, messages) => {

    if(!messages[1]) {
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage("消したい予定番号\nを指定してください")
        ); 
    }

    const id = Number(messages[1]);
    console.log(id);
    if(!id) {
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage("idの指定は整数でお願いします")
        ); 
    
        return;
    }

    const results = await dao_schedule.deleteSchedule(id);
    console.log(results);
    return line_client.broadcast(
        nodoka.createNodokaTextMessage("予定" + id + "の取り消しをしました")
    ); 
}

exports.handleDeleteScheduleByDate = async(ev, messages) => {

    const day =messages[1];
    if(!day) {
        return line_client.replyMessage(ev.replyToken, 
            nodoka.createNodokaTextMessage("消したい予定の年月日\nを指定してください")
        ); 
    }

    // 指定日の予定
    const d = util.ShortStrDate(day);
    if(day.length!=8 || !d) {
        return line_client.replyMessage(
            ev.replyToken, 
            nodoka.createNodokaTextMessage("日付(半角数字8桁)\nで入力してください")
        );    
    }

    const from = d.get().format('YYYY-MM-DD 00:00:00+09');
    const to = d.get().format('YYYY-MM-DD 24:00:00+09');

    const results = await dao_schedule.deleteScheduleBetween(from, to);
    console.log(results);
    return line_client.broadcast(
        nodoka.createNodokaTextMessage(`${d.get().format('YYYY/MM/DD')}の予定の取り消しをしました`)
    ); 
}
