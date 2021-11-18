import LineBotSdk from '@line/bot-sdk';
import { LineClientDummy } from './line-client-dummy';
import psql from 'pg';


class LineConfig implements LineBotSdk.Config {
    public channelAccessToken: string = process.env.LINE_ACCESS_TOKEN;
    public channelSecret: string =  process.env.LINE_SECRET_KEY;
};


class PsqlConfig implements psql.ClientConfig {
    public connectionString: string = process.env.DATABASE_URL;
//    public const ssl: { require : true, rejectUnauthorized: false };
    public ssl: boolean = true;
}

class PsqlConfigDev implements psql.ClientConfig {
    public user: string = 'postgres';
    public host: string =  'localhost';
    public password: string =  'root';
    public port: number =  5432;
    public max: number =  10;
    public idleTimeoutMillis: number =  30000;
    public connectionTimeoutMillis: number =  5000;
}

export class Config {

    private static _instance : Config;

    public static getInstance() {

        // not thread safe
        if (!this._instance) {
            this._instance = new Config();
        }

        return this._instance;   
    }

    private line_client : LineBotSdk.Client;
    private constructor() { 
        this.line_client = new LineBotSdk.Client(this.lineConfig());
    }

    public lineClient() {
        if(process.env.IS_DEV=="1"){
            return new LineClientDummy();
        } else {
            return this.line_client;
        }    
    }    
    private lineConfig() {
        return new LineConfig(); 
    }
    public psqlConfig() {
        if(process.env.IS_DEV=="1") {
            return new PsqlConfigDev();
        } else {
            return new PsqlConfig();
        }
    }

}




