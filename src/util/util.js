const moment = require("moment");
const http = require('http');


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



/*
* httpリクエストのヘルパー
*/
async function json_request(host, port, path, method, body) {
    let data_str = JSON.stringify(body);
    headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data_str)
    };
    await request(host, port, path, method, headers, data_str);
}

async function request(host, port, path, method, headers, body) {
    let options = {
        host: host,
        port: port,
        path: path,
        method: method,
        headers: headers,
    };

    let req = http.request(options, (res) => {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.log('BODY: ' + chunk);
        });
      });
    req.on('error', (e) => {
        console.log('problem with request: ' + e.message);
    });
    req.write(body);
    req.end();
}

exports.json_request = async (host, port, path, method, body)=> {
    await json_request(host, port, path, method, body);
};


exports.getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}