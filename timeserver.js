var net = require('net');
var port = process.argv.slice(2, process.argv.length);

console.log("listening on port " + port[0]);

var server = net.createServer(function (socket) {
	console.log('client connected');
	var myDate = new Date();
	var myDateString = myDate.getFullYear() + "-" 
		+ ('0' + (myDate.getMonth() + 1)).slice(-2) + '-' 
		+ ('0' + myDate.getDate()).slice(-2) + " " 
		+ myDate.getHours() + ":" 
		+ myDate.getMinutes() + "\n";

	socket.write(myDateString);
	socket.end();
});

server.listen(port[0]);