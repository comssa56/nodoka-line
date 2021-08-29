
let client = null;

if(process.env.IS_DEV){
    client = require('./nodoka-line-client-test.js');
} else {
    client = require('./nodoka-line-client-main.js');
}


exports.Create = ()=>{
    return client.Create();
}
