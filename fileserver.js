// MY SOLUTION

// var http = require('http');
// var fs = require('fs');
// var port = process.argv[2];
// var txtFile = process.argv[3];

// var server = http.createServer(function(req, res) {
// 	var fileStream = fs.createReadStream(txtFile);
// 	fileStream.pipe(res);
// });

// server.listen(port);


// LYN SOLUTION

var http = require('http');
var fs = require('fs');
var port = process.argv[2];
var txtFile = process.argv[3];

var server = http.createServer(function(req, res) {
	res.writeHead(200, {'content-type': 'text/plain'})
	fs.createReadStream(txtFile).pipe(res);
});

server.listen(port);