const moment = require("moment");


class ShortStrDate {
    constructor(year, month, day) {
        this.m = moment("1970-01-01 00:00:00");
        if(year) this.m =this.m.year(year);
        if(month) this.m = this.m.month(month);
        if(day) this.m = this.m.day(day);
    }

    get() {
        return this.m;
    }
}

/*
* 20210101 などの短い数値列を日付に変換する
* 返り値はmoment or null(引数が不正)
*/
exports.ShortStrDate = function(str) {

    let year = null;
    let month = null;
    let day = null;
    switch(str.length) {
    case 4:
        r = str.match(/([0-9]{4})/);
        if(!r) return null;
        year = r[1];
        break;
    case 6:
        r = str.match(/([0-9]{4})([0-9]{2})/);
        if(!r) return null;
        year = r[1];
        month = r[2];
        break;
    case 8:
        r = str.match(/([0-9]{4})([0-9]{2})([0-9]{2})/);
        if(!r) return null;
        year = r[1];
        month = r[2];
        day = r[3];
        break;
    default:
        return null;
    }

    return new ShortStrDate(year, month, day);
}

/*
* 文字列が数字で構成されているか検証
*/
exports.isIntStr = function(str){
    r = str.match(/^[0-9]+$/);
    return r ? true:false;    
}

// millisecond単位の一時停止
// 呼び出し側でawaitすること
exports.sleep = async function(_ms) {
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await _sleep(_ms);
}


