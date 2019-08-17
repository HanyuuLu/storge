const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const koa = require('koa');
const koaBodyParser = require('koa-bodyparser')
const router = require('koa-router')();
const log = require('./log.js');
const app = new koa();

router.get('/hello/:name', async (ctx, next) =>
{
    var name = ctx.params.name;
    ctx.response.body = `<h1>hi,${name}!</h1>`;
    console.log("caught!");
});
router.get('/404', async (ctx, next) =>
{
    ctx.response.body = fs.readFileSync('.\\resource\\404.html');
    ctx.response.type = 'text/html';

})
router.get('/', async (ctx, next) =>
{
    var content = fs.readFileSync('.\\resource\\index.html');
    ctx.response.body = content;
    ctx.response.type = 'text/html';
})
app.use(log.log);

// })
app.use(koaBodyParser());
app.use(router.routes());
app.use(serve(path.join(__dirname + '\\resource')));
app.listen(80);