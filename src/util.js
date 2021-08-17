const moment = require("moment");


class ShortStrDate {
    constructor(year, month, day) {
        if(!year) year = '1970';
        if(!month) month = '01';
        if(!day) day = '01';
        this.m = moment(year + "-" + month + "-" + day + " 00:00:00");
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


