// line
const line = require("@line/bot-sdk"); 
const line_config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_SECRET_KEY
};


// psql
const { Client } = require('pg');
const psql_client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


let conf = [];
let initialized = false;

function add(key, value) {
    if(key in conf)
    {
        console.log(key + " is already added.");
    } else {
        conf[key] = value;    
    }
}

exports.init = function() {
    if(initialized) {
        console.log("config is already initialized");
        return;
    }

    add('line', line);
    add('line-config', line_config);
    add('psql', psql_client);
    
    console.log("initialize config");
    initialized = true;
}


exports.get = function(key) {
    if(! key in conf)
    {
        console.log(key + " is not registered.");
        return null;
    } else {
        return conf[key];    
    }
}