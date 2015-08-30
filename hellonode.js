// LEARNYOUNODE 


// 2. BABYSTEPS

// function sumnumbers(input) {
// 	var sum = 0;
// 	for (var i = 2; i < input.length; i++) {
// 		sum += +input[i];
// 	}
// 	console.log(sum);
// }

// sumnumbers(process.argv);


// 3. MY FIRST I/O!

// function readFile(arg_input) {
// 	for (var i = 2; i < arg_input.length; i++) {
// 		path = arg_input[2];
// 	}

// 	var fs = require('fs');
// 	var file = fs.readFileSync(path).toString();
// 	console.log(countLines(file));
// }

// function countLines(file) {
// 	var splitString = file.split('\n');
// 	return(splitString.length - 1);
// }

// readFile(process.argv);


// 4. MY FIRST I/O!

// var fs = require('fs');
// var path = process.argv[2];
// var lines = undefined;

// function stupid_callback(callback) { 
// 	fs.readFile(path, 'utf8', function doneReading(err, fileContents) {
// 		lines = fileContents.split('\n');
// 		callback();
// 	});
// }

// function printAnswer() {
// 	console.log(lines.length - 1);
// }

// stupid_callback(printAnswer);


// 5. FILTERED LS

// var fs = require('fs');
// var filepath = process.argv[2].toString();
// var extention = "." + process.argv[3].toString();

// fs.readdir(filepath, function doneReading(err, list) {
// 	if (err) {
// 		throw err;
// 	}
// 	for (var i = 0; i < list.length; i++) {
// 		if (list[i].indexOf(extention) > -1) {
// 			console.log(list[i]);
// 		}
// 	}
// });

// fs.readdir(filepath);


// 6. MAKE IT MODULAR

// var mymodule = require('./hellonode_module.js');


// 7. HTTP CLIENT
// Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Write the String 
// contents of each "data" event from the response to a new line on the console (stdout).

// var http = require('http');

// http.get(process.argv[2], function(response) {
// 	response.setEncoding('utf8');
// 	response.on('data', console.log);
// 	response.on('error', console.log);
// });



// 8. HTTP COLLECT

// Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument. Collect all 
// data from the server (not just the first "data" event) and then write two lines to the console (stdout).

// The first line you write should just be an integer representing the number of characters received from the server. The second 
// line should contain the complete String of characters sent by the server.

// ## HINTS

// There are two approaches you can take to this problem:

// 1) Collect data across multiple "data" events and append the results together prior to printing the output. Use the "end" event 
// to determine when the stream is finished and you can write the output.

// 2) Use a third-party package to abstract the difficulties involved in collecting an entire stream of data. Two different 
// packages provide a useful API for solving this problem (there are likely more!): bl (Buffer List) and concat-stream; take your 
// pick!

//   <http://npm.im/bl>
//   <http://npm.im/concat-stream>

// var http = require('http');
// http.get(process.argv[2], function(response) {
// 	var result = "";

// 	function appendResult(data) {
// 		result += data; 
// 	}

// 	function logResult() {
// 		console.log(result.length);
// 		console.log(result);
// 	}

// 	response.setEncoding('utf8');
// 	response.on('data', appendResult);
// 	response.on('end', logResult);
// 	// response.on('error', console.log);
// });



// 9. JUGGLING ASYNC

// This problem is the same as the previous problem (HTTP COLLECT) in that you need to use http.get(). However, this time you will be 
// provided with three URLs as the first three command-line arguments. You must collect the complete content provided to you by each of 
// the URLs and print it to the console (stdout). You don't need to print out the length, just the data as a String; one line per URL. The 
// catch is that you must print them out in the same order as the URLs are provided to you as command-line arguments.

// ## HINTS

// Don't expect these three servers to play nicely! They are not going to give you complete responses in the order you hope, so you can't 
// naively just print the output as you get it because they will be out of order. You will need to queue the results and keep track of 
// how many of the URLs have returned their entire contents. Only once you have them all, you can print the data to the console.

// Counting callbacks is one of the fundamental ways of managing async in Node. Rather than doing it yourself, you may find it more 
// convenient to rely on a third-party library such as [async](http://npm.im/async) or [after](http://npm.im/after). But for this 
// exercise, try and do it without any external helper library.

var http = require('http');
var urls = process.argv.slice(2, process.argv.length);
var output = [];
var isBusy = 0;

var done = function() {
	if (!isBusy) {
		output.map(function(content) {
			console.log(content);
		})
	}
}

urls.map(function(url, idx) {
	http.get(url, function(res) {
		isBusy++;
		var dataString = '';
		res.setEncoding('utf8');

		res.on('data', function(data) {
			dataString += data;
		});

		res.on('end', function() {
			output[idx] = dataString;
			isBusy--;
			done();
		});

		res.on('error', console.log);
	});
});





