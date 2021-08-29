const util = require('./util/util.js');

const conf = require('./util/config.js'); 
conf.init();

const result = require('./util/result.js');
const nodoka = require('./nodoka-line/nodoka-line.js');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const line = conf.get('line');

const line_client = require('./nodoka-line/nodoka-line-client.js').Create();

const test = require('./test/test.js');

async function db_connect_test(){
    pg_client = conf.get('psql');
    pg_client.connect();

    pg_client.query('SELECT 1;', (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      pg_client.end();
    });
}


const routing = function(app)
{
    app.get('/', (req, res) => {
        const r = new result.Result(200, 'Hello, world!');
        r.response(res);
    });

    app.get('/test', (req, res) => {
        test.Test();
        const r = new result.Result(200, 'Hello, world!');
        r.response(res);
    });

    app.get('/db_test', async (req, res) => {
        const r = new result.Result(200, 'Hello, world!');
        await db_connect_test();
        r.response(res);
    });

    if(process.env.IS_DEV) {
        app.post('/hook', jsonParser, (req, res) => nodoka.LineBot(req, res));
    } else {
        app.post('/hook', line.middleware(conf.get('line-config')), (req, res) => nodoka.LineBot(req, res));
    }

}



exports.execute = function(app){

    // define main application    
    routing(app);

    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
        console.log('Press Ctrl+C to quit.');
    });
}


