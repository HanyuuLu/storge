var server = require('./Server')
var router = require('./router')
server.start(router.route)