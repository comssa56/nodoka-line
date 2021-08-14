const conf = require('./config.js'); 
const { Client } = require('pg');

class Postgres {
    async init() {
        this.client = new Client(conf.get('pg-config')).await;
        await this.client.connect();        
        return this.client;
    }

    async exec(query, params = []) {
        return (await this.client.query(query, params)).rows;
    }

    async execJson(query) {
        return (await this.client.query(query)).rows;
    }


    async end() {
        await this.client.end();
    }

    async begin() {
        await this.client.query('BEGIN');
    }

    async rollback() {
        await this.client.query('ROLLBACK');
    }

    async commit() {
        await this.client.query('COMMIT');
    }
}

exports.getDBAccessor = async ()=>{
    db = new Postgres();
    await db.init();
    return db;
}