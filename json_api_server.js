var port = process.argv[2];
var http = require('http');
var url = require('url');
var date = new Date();

var routes = {

	"/api/parsetime":
	{
		"hour": date.getHours(),
		"minute": date.getMinutes(),
		"second": date.getSeconds()
	},

	"/api/unixtime":
	{
		"unixtime": date.getTime()
	}
}

var server = http.createServer(function (req, res) {
	if (req.method === "GET") {
		var parseRequest = url.parse(req.url, true);
		var query = parseRequest.query;
		var path = parseRequest.pathname;
		var time = '';
		
		if (path == "/api/parsetime") {
			time = routes["/api/parsetime"];
		}
		else if (path == "/api/unixtime") {
			time = routes["/api/unixtime"];
		}

		// console.log(time);

		res.writeHead(200, { 'Content-Type' : 'application/json' })
		res.end(JSON.stringify(time));
	}
	else {
		console.log('no GET data received\n');
		res.end();
	}
});

server.listen(port);

		// // test stuff
		// console.log(parseRequest);
		// console.log(query);
		// console.log(path);



