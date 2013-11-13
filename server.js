
var http = require('http');
var url = require('url');
var qs = require('querystring');

var m = require("./methods");

var port = 3131;

for (var i = 0; i < process.argv.length; i++) {
	if (process.argv[i] == "-p" || process.argv[i] == "--port") {
		if (isNaN(process.argv[i+1])) {
			process.exit();
		}
		port = Number(process.argv[i+1]);
	}
}

function server(request, response, POST) {
	var args = url.parse(request.url).pathname.split('/');
	args[0] = POST;
	var cmd = args[1];
	if (cmd == "") {
		m.main(response);
	} else {
		if (typeof m[cmd] === "function") {
			m[cmd](response, args, request);
		} else {
			response.write("cmd not found");
			console.log("Couldn't find handler for '" + cmd + "'");
			response.end();
		}
	}
	return;
}

http.createServer(function(request,response) {
	server(request, response);
	/*
	if (request.method == "POST") {
		var queryData = "";
		request.on('data', function(data) {
			queryData += data;
			if (queryData.length > 1e6) {
				queryData = "";
				response.writeHead(413, {'Content-Type': 'text/plain'}).end();
				request.connection.destroy();
			}
		});
		request.on('end', function() {
			//console.log("queryData: " + queryData);
			server(request, response, qs.parse(queryData));
		});
	} else {
		server(request, response);
	}
	*/
}).listen(port);

console.log("Listening on port " + port);
