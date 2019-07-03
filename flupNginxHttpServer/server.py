from flup.server.fcgi import WSGIServer 
def res(environ, start_response): 
	start_response('200 OK', [('Content-Type', 'text/plain')]) 
	return ['Hello World!\n'] 
if __name__ == '__main__': 
	WSGIServer(res,bindAddress=('127.0.0.1',8008)).run()

