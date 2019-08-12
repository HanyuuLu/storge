const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const koa = require('koa');
const koaBodyParser = require('koa-bodyparser')
const koaRouter =require('koa-router')();
const app = new koa();

koaRouter.get('/hello/:name', async (ctx, next) =>
{
    var name = ctx.params.name;
    ctx.response.body = `<h1>hi,${name}!</h1>`;
    console.log("caught!");
});
koaRouter.get('/', async (ctx, next) =>
{
    var content = fs.readFileSync('.\\resource\\index.html');
    ctx.response.body = content;
    ctx.response.type = 'text/html';
})
koaRouter.post('/', async (ctx, next) =>
{
    ctx.response.body(ctx.)
})
app.use(async (ctx, next) =>
{
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
})
//x-response-time
app.use(async (ctx, next) =>
{
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
})
app.use(koaBodyParser());
app.use(koaRouter.routes());
app.use(serve(path.join(__dirname + '\\resource')));
// app.use(async (ctx,next) =>
// {
    //     ctx.body = ctx.request.path + '\n' + ctx.request.method;
    //     // ctx.body = 'Hello World';
    //     // console.log(ctx.req.host);
    // });


    app.listen(80);