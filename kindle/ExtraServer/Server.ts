import Koa from 'koa';
import KoaRouter from 'koa-router'
import koaBody from 'koa-body';
import bodyParser from 'koa-bodyparser';
import { fetchBilibiliLiveStatus, fetchBilibiliUserSpaceHistory } from './requester'
import { bilibiliUserSpaceHistoryFileter } from './filter';
const Server = new Koa();
const Router = new KoaRouter();

Server.use(koaBody({ multipart: true }));
Server.use(Router.routes());
Server.use(bodyParser())
const baseURL = "/api"
Router.get(`${baseURL}/bilibili/live/:roomid`, async (ctx, next) => {
    const roomid = ctx.params.roomid;
    ctx.response.body = await fetchBilibiliLiveStatus(roomid)
    ctx.response.type = "application/json"
})
Router.get(`${baseURL}/bilibili/history/:uid`, async (ctx, next) => {
    var res: any = await fetchBilibiliUserSpaceHistory(ctx.params.uid)
    var list = bilibiliUserSpaceHistoryFileter(res)
    ctx.response.body = list[0]
    ctx.response.type = "application/json"
})
Router.get('/api/kindle/query/wether:city', async (ctx, next) => {

})
Server.listen(80); 
