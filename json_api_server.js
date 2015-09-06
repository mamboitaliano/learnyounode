var port = process.argv[2];
var http = require('http');
var url = require('url');
var date = new Date();

var routes = {

	"/api/parsetime":
	{
		"hour": '',
		"minute": '',
		"second": ''
	},

	"/api/unixtime":
	{
		"unixtime": ''
	}
}

var server = http.createServer(function (req, res) {
	if (req.method === "GET") {
		var parseRequest = url.parse(req.url, true);
		var query = parseRequest.query;
		var path = parseRequest.pathname;
		var time = '';

		d = new Date(parseRequest.query.iso);
		
		if (path === "/api/parsetime") {
			routes["/api/parsetime"].hour = d.getHours();
			routes["/api/parsetime"].minute = d.getMinutes();
			routes["/api/parsetime"].second = d.getSeconds();
			time = routes["/api/parsetime"];
		}
		else if (path === "/api/unixtime") {
			routes["/api/unixtime"].unixtime = d.getTime();
			time = routes["/api/unixtime"]
		}
		res.writeHead(200, { 'Content-Type' : 'application/json' })
		res.end(JSON.stringify(time));
	}
	else {
		res.writeHead(404);
		console.log('no GET data received\n');
		res.end();
	}
});

server.listen(port);
