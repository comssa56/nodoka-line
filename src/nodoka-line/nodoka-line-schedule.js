const util = require('../util/util.js');
const nodoka = require('./nodoka-brain.js')
const dao_schedule = require('../model/dao_schedule.js');
const line_client = require('./nodoka-line-client.js').Create();
const moment = require("moment");


// 予定を保存する
exports.handleScheduleAdd = async (ev, messages) => {
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
            str += row.schedule_time + ",\t" + row.title + ",\t" + row.description + "\n";
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
