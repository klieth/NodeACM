
var fs = require('fs');
var multipart = require('multipart');

exports.main = function(response) {
	console.log("Getting index.html");
	fs.readFile("./index.html", "binary", function (err, data) {
		if (err) {
			console.log("Error reading index.html");
			response.end();
			return;
		}
		//console.log(data);
		response.writeHead(200);
		response.write(data,"binary");
		response.end();
	});
}

exports.test = function(response, args, request) {
	// write dir with timestamp
	// write file from request to dir
	// call system command to run it
	// analyze output
	// 
	// testdata will be organized by code
	// look in testdata.json to find codes
	request.setBodyEncoding('binary');

	var stream = new multipart.Stream(request);
	stream.addListener('part', function (part) {
		part.addListener('body', function (chunk) {
			var progress = (stream.bytesReceived / stream.bytesTotal * 100).toFixed(2);
			var mb = (stream.bytesTotal/1024/1024).toFixed(1);

			console.log("Uploading " + mb + "mb (" + progress + "%)");
		});
	});
	stream.addListener('complete', function() {
		response.write("Uploaded!");
		response.end();
		console.log("done");
	});
	/*
	fs.mkdir(new Date().getTime(), function (err) {
		if (err) {
			response.end();
			return;
		}
	});
	*/
	response.end();
}

exports.testdata = function(response) {
	//deliver testdata.json to client
	response.end();
}

/*
exports["favicon.ico"] = function(response) {
}
*/
