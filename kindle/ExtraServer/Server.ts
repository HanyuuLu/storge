import Koa from 'koa';
import KoaRouter from 'koa-router'
import koaBody from 'koa-body';
import bodyParser from 'koa-bodyparser';
import {fetchBilibiliLiveStatus} from './requester'
const Server = new Koa();
const Router = new KoaRouter();

Server.use(koaBody({multipart:true}));
Server.use(Router.routes());
Server.use(bodyParser())
Router.get('/api/kindle/query/bilibili/live/:roomid',async (ctx,next)=>
{
    const roomid = ctx.params.roomid;
    ctx.response.body =  await fetchBilibiliLiveStatus(roomid)
    ctx.response.type = "application/json"
})
Router.get('/api/kindle/query/wether:city',async (ctx,next)=>
{

})
Server.listen(80); 
