
var http = require('http');

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

console.log("Listening on port " + port);
