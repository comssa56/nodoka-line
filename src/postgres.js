const conf = require('./config.js'); 
const { Pool } = require('pg');
const pool = new Pool(conf.get('pg-config'));


class Postgres {
    async init() {
        this.client = await pool.connect();
    }

    async exec(query, params = []) {
        return (await this.client.query(query, params)).rows;
    }

    async execJson(query) {
        return (await this.client.query(query)).rows;
    }


    async release() {
        await this.client.release(true);
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

exports.execJson = async (query) =>{
    db = await this.getDBAccessor();
    result = null;
    try { 
        await db.begin();
        result = await db.execJson(query);
        await db.commit();
    } catch (e) {
        console.log(e);
        await db.rollback();
        throw e;
    } finally {
        await db.release();
    }
    return result;
}