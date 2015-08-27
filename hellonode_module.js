var fs = require('fs');
var filepath = process.argv[2].toString();
var extension = "." + process.argv[3].toString();

var temp = [];
module.exports = function(filepath, filter, callback) {
	fs.readdir(filepath, function doneReading(err, list) {
		if (err) {
			return callback(err);
		}
		for (var i = 0; i < list.length; i++) {
			if (list[i].indexOf(filter) > -1) {
				temp.push(list[i]);
			}
		}
		return callback(null, temp);
	});
};

function printshit() {
	for(var i = 0; i < temp.length; i++) {
		console.log(temp[i]);
	}
}

module.exports(filepath, extension, printshit);
