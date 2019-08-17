const fs = require('fs');
const logFileName = './request.log'
async function log(ctx, next)
{
    const startTime = Date.now()
    await next();
    var logInfo = '';
    const timeCost = Date.now()-startTime
    logInfo += `${ctx.method} ${timeCost}ms \t\| ${ctx.url}\n`;
    console.log(logInfo);
    fs.appendFile(logFileName, logInfo, function (err)
    {
        if(err)
        console.log('[ERROR] write to log file faild.')
    })
}
exports.log = log;