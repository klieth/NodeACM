var http = require("http");
var url = require("url");
var fs = require("fs");
var stream = require("stream");
var util = require("util");
var formidable = require("formidable");

var server = http.createServer(function(req,res) {
	switch (url.parse(req.url).pathname) {
		case '/':
			display_form(req, res);
			break;
		case '/upload':
			upload_file(req, res);
			break;
		default:
			show_404(req, res);
			break;
	}
	return;
}).listen(3131);

function display_form(req, res) {
	res.writeHead(200, {"Content-Type":"text/html"});
	res.write(
			'<form action="/upload" method="post" enctype="multipart/form-data">'+
			'<input type="file" name="upload-file">'+
			'<input type="submit" value="Upload">'+
			'</form>');
	res.end();
}

function upload_file(req, res) {
	var form = new formidable.IncomingForm();
	form.on("fileBegin", function (name, file) {
		console.log("file begin fired");
		console.log(name);
		file.path = "./" + file.name;
		console.log(file.name);
		console.log(file.path);
		console.log("end filebegin");
	});
	form.parse(req, function (err, fields, files) {
		res.writeHead(200, {'content-type':'text/plain'});
		res.write("Received upload.");
		res.end(util.inspect({fields:fields, files:files}));
	});

	/*
	var fileStream = fs.createWriteStream('Test.java');
	req.on("data", function(chunk) {
		fileStream.write(chunk);
	});
	req.on("end", function() {
		console.log("end fired");
	});
	res.end();
	*/
}

function upload_complete(res) {
	res.setHeader(200, {"Content-Type": "text/plain"});
	res.write("Thanks for uploading!");
	res.end();
}

function show_404(req, res) {
	res.setHeader(404, {"Content-Type": "text/plain"});
	res.write("You r doing it rong!");
	res.end();
}
