
const conf = require('./config.js'); 
conf.init();

const result = require('./result.js');
const nodoka = require('./nodoka-line.js');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const line = conf.get('line');

const routing = function(app)
{
    app.get('/', (req, res) => {
        const r = new result.Result(200, 'Hello, world!');
        r.response(res);
    });

    app.post('/hook', line.middleware(conf.get('line-config')), (req, res) => nodoka.LineBot(req, res));

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


