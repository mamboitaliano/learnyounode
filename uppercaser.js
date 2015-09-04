var http = require('http');
var map = require('through2-map');
var port = process.argv[2];

var server = http.createServer(function(req, res) {
	if (req.method ==='POST') {
		req.pipe(map(function (chunk) {
			return (chunk.toString().toUpperCase());
		})).pipe(res);
		res.writeHead(200, {'content-type': 'text/plain'});
	}
	else {
		console.log("no post data\n");
		res.end();
	}
});

server.listen(port);