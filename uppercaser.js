var http = require('http');
var map = require('through2-map');
var port = process.argv[2];

var server = http.createServer(function(req, res) {
	if (req.method ==='POST') {

		var body = '';
		req.setEncoding('utf8');

		req.on('data', function (chunk) {
			console.log('chunk time!');
			body += chunk;
			console.log(body);
		});

		req.on('end', function() {
			try {
				var data = JSON.parse(body);
			}
			catch (er) {
				// in case of bad json
				res.statusCode = 400;
				return res.end('error: ' + er.message);
			}

			res.write(typeof data);
			res.end();
		});

		// req.pipe(map(function (chunk) {
		// 	console.log(chunk.toString());
		// })).pipe(res);
	}
	else {
		console.log("no post data");
		res.end();
	}

	res.writeHead(200, {'content-type': 'text/plain'});
});

server.listen(port);