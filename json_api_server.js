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

// console.log(routes["/api/unixtime"]);


var server = http.createServer(function (req, res) {
	if (req.method === "GET") {
		var parseRequest = url.parse(req.url, true);
		var query = parseRequest.query;
		var path = parseRequest.pathname;

		// console.log
		// console.log(routes["/api/parsetime"]);
		
		if (path == "/api/parsetime") {
			console.log(routes["/api/parsetime"]);
		}
		else if (path == "/api/unixtime") {
			console.log(routes["/api/unixtime"]);
		}

		res.writeHead(200, { 'Content-Type' : 'application/json' })
		res.end();
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



