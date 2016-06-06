var http=require('http');
var url = require('url');
var wechat = require('wechat');
var configjson = require('./config/config.json');

http.createServer(function (req,res){
	var queryData = url.parse(req.url, true).query;

	if(wechat.checkSignature(queryData ,configjson.token)){
		console.log(queryData.echostr);
		console.log("wechat verified");
		res.writeHead(200, {'Content-Type': 'text/plain','echostr':queryData.echostr});
		res.end(queryData.echostr);
		
		
	}else{
		res.writeHead(200, {'Content-Type': 'text/plain'});
		console.log("not server");
		console.log(queryData.echostr);
		res.end("not from wechat");
	}
}).listen(80);
console.log('Server is now running at http://127.0.0.1:80');