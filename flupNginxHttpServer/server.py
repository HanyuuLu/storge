from flup.server.fcgi import WSGIServer
def myapp(environ,start_response):
	start_response('200 OK',[('Content-Type','text/plain')])
	return ['hello world!\n']
if __name__=='__main__':
	WCGIServer(myapp,bindAddress('localhost',8000)).run()