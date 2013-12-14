
var http = require('http');
var url = require('url');
var fs = require('fs');

var port = 3131;

for (var i = 0; i < process.argv.length; i++) {
	if (process.argv[i] == "-p" || process.argv[i] == "--port") {
		if (isNaN(process.argv[i+1])) {
			process.exit();
		}
		port = Number(process.argv[i+1]);
	}
}

http.createServer(function(req, res) {
	switch (url.parse(req.url).pathname) {
		case '/':
		case '/index.html':
			display_index(req, res);
			break;
		case '/upload':
			upload_file(req, res);
			break;
		default:
			show_404(req, res);
			break;
	}
	return;
}).listen(port);

function display_index(req, res) {
	fs.readFile("./index.html", "binary", function (err, file) {
		if (err) {
			show_404(req, res);
			return;
		}
		res.writeHead(200);
		res.write(file, "binary");
		res.end();
	});
}

function upload_file(req, res) {
	var form = new formidable.IncomingForm();
	form.on("fileBegin", function (name, file) {
		file.path = "./" + file.name;
	});
	form.parse(req, function (err, fields, files) {
		res.writeHead(200, {'content-type':'text/plain'});
		res.write("Received upload.");
		res.end(util.inspect({fields:fields, files:files}));
	});
}

function show_404(req, res) {
	res.setHeader(404, {"Content-Type": "text/plain"});
	res.write("File not found.");
	res.end();
}

console.log("Listening on port " + port);
