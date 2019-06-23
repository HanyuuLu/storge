from http.server import HTTPServer,BaseHTTPRequestHandler,HTTPStatus
import json

data = {'Hanyuu':'Mugi'}
host = ('localhost',8888)

page ='''
<html>
<body>
<H1>
hanyuu's response!
</H1>
<H2>
will you see this?
</H2>
</html>
'''
class Request(BaseHTTPRequestHandler):
	def do_GET(self):
		self.send_response(200)
		self.send_header('Content-type','text')
		self.end_headers()
		self.wfile.write(page.encode())
	def do_POST(self):
		self.send_response(HTTPStatus.OK)
		self.send_header('Content-type','text')
		self.end_headers()
		s=str(self.rfile.readline(),'UTF-8')

		# print(s)
		self.wfile.write("Hanyuu".encode())

if __name__=='__main__':
	server = HTTPServer(host,Request)
	print('[info] running')
	server.serve_forever()