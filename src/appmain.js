
const result = require('./result.js');
const nodoka = require('./nodoka-line.js');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

console.log("tk" + process.env.LINE_ACCESS_TOKEN)
const line = require("@line/bot-sdk"); 
const config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_SECRET_KEY
};
const client = new line.Client(config); // 追加

const routing = function(app)
{
    app.get('/', (req, res) => {
        const r = new result.Result(200, 'Hello, world!');
        r.response(res);
    });

    app.post('/hook', line.middleware(config), (req, res) => nodoka.LineBot(client, req, res));

    // app.get('/tw/test', (req, res) => {
    //     const user = '@com_ssa56';
    //     const tw = new api_tw.Tw(req,res);
    //     const ret = tw.get_timeline(user,5);
    // });    
    // app.post('/tw/test', jsonParser, (req, res) => {
    //     const query = req.body;
    //     const user = query.user;
    //     const tw = new api_tw.Tw(req,res);
    //     const ret = tw.get_timeline(user,5);
    // });


    // // カスタムエラーページ
    // app.use(function (request, response, next) {
    //     // 出力するデータ
    //     var data = {
    //         method: request.method,
    //         protocol: request.protocol,
    //         version: request.httpVersion,
    //         url: request.url
    //     };
    
    //     // エラーを返却
    //     response.status(404);
    //     if (request.xhr) {
    //         response.json(data);
    //     } else {
    //         response.render('./404', {});
    //     }
    // });


    // app.use(function (error, request, response, next) {
    //     // 出力するデータ
    //     var data = {
    //         method: request.method,
    //         protocol: request.protocol,
    //         version: request.httpVersion,
    //         url: request.url,
    //         name: error.name,
    //         message: error.message,
    //         stack: error.stack
    //     };
    
    //     response.status(500);
    //     if (request.xhr) {
    //         response.json(data);
    //     } else {
    //         console.log("Error:500");
    //         console.log(data);
    //         response.render('./500', {});
    //     }
    // });

}



exports.execute = function(app){

    // set environments
    // app.set('view engine', 'ejs');


    // define main application    
    routing(app);

    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
        console.log('Press Ctrl+C to quit.');
    });
}


