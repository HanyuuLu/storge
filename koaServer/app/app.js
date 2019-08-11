var koa = require('koa');
var controller = require('koa-route');//需要通过npm来添加此依赖
var app = new koa();

var service = require('./../service/WebAppService.js');//引用WebAppService.js

/*设置路由*/
app.use(controller.get('/ajax/search', function* ()
{
    this.set('Cache-Control', 'no-cache');
    this.set('Access-Control-Allow-Origin', '*');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var key = params.key;
    var start = params.start;
    var end = params.end;
    this.body = yield service.get_search_data(key, start, end);
}));

app.listen(3000);
console.log('Koa server is started');