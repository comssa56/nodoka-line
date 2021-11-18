import  moment from "moment"
const http = require('http');

class ShortStrDate {
    private m : moment.Moment;
    constructor(year : string|null, month : string|null, day : string|null) {
        if(!year) year = '1970';
        if(!month) month = '01';
        if(!day) day = '01';
        this.m = moment(year + "-" + month + "-" + day + " 00:00:00");
    }

    get() {
        return this.m;
    }
}

export class Util {
    
    /*
    * YYYY~YYYYMDDの文字列からmomentを生成する。
    * 入力がない部分については1970-01-01から補完される。
    */
    public static momentFromString(str : string) {
        let year = null;
        let month = null;
        let day = null;
    
        switch(true) {
        case /^[0-9]{4}$/.test(str): {
            const r : RegExpMatchArray | null = str.match(/([0-9]{4})/);
            if(!r) return null;
            const year = r[1];
            break;
        }
        case /^[0-9]{6}$/.test(str): {
            const r : RegExpMatchArray | null = str.match(/([0-9]{4})([0-9]{2})/);
            if(!r) return null;
            year = r[1];
            month = r[2];
            break;
        }
        case /^[0-9]{8}$/.test(str): {
            const r : RegExpMatchArray | null = str.match(/([0-9]{4})([0-9]{2})([0-9]{2})/);
            if(!r) return null;
            year = r[1];
            month = r[2];
            day = r[3];
            break;
        }
        default:
            return null;
        }      
        return new ShortStrDate(year, month, day).get();
    }



    /*
    * 文字列が数字で構成されているか検証
    */
    public static isIntStr(str : string){
        const r = str.match(/^[0-9]+$/);
        return r ? true:false;    
    }

    // millisecond単位の一時停止
    // 呼び出し側でawaitすること
    public static async sleep(_ms : number) {
        const _sleep = (ms : number) => new Promise((resolve) => setTimeout(resolve, ms));
        await _sleep(_ms);
    }



    /*
    * httpリクエストのヘルパー
    */
    public static async json_request(host : string, port : number, path : string, method :string, body : string) {
        let data_str = JSON.stringify(body);
        let headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data_str)
        };
        await this.request(host, port, path, method, headers, data_str);
    }

    public static async request(host : string, port : number, path : string, method :string, headers : any, body : string) {
        let options = {
            host: host,
            port: port,
            path: path,
            method: method,
            headers: headers,
        };

        let req = http.request(options, (res : any) => {
            // console.log('STATUS: ' + res.statusCode);
            // console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', (chunk : any) => {
            console.log('BODY: ' + chunk);
            });
        });
        req.on('error', (e : any) => {
            console.log('problem with request: ' + e.message);
        });
        req.write(body);
        req.end();
    }


    public static getRandomInt(max : number) {
        return Math.floor(Math.random() * max);
    }

}