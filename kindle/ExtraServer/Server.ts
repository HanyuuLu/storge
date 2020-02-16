import Koa from 'koa';
const Server = new Koa();

Server.use(async ctx => {
    ctx.body = "Hanyuu Server";
})
Server.listen(80); 
