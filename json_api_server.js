var port = process.argv[2];
var http = require('http');
var url = require('url');

var routes = {

}

var server = http.createServer(function (req, res) {
	if (req.method === "GET") {
		var parseRequest = url.parse(req.url, true);
		var query = parseRequest.query;
		var path = parseRequest.pathname;
		
		// // test stuff
		// console.log(parseRequest);
		// console.log(query);
		// console.log(path);
		res.end();
	}
	else {
		console.log('no GET data received\n');
		res.end();
	}
});

server.listen(port);

