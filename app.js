var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var wechat = require('wechat');
var configjson = require('./config/config.json');
var searchCloud = require('./models/search.js');
var users = require('./models/users.js');
var app = module.exports= express();

var config = {
  token: configjson.token,
  appid: configjson.appid,
  encodingAESKey: configjson.encodinAESKey
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.query());

app.use('/wechat', wechat(config, function (req, res, next) {
    // messages are in req.weixin
    var message = req.weixin;

    console.log("received from user : "+ message.FromUserName);
    users.addIfNew(message.FromUserName);
    switch (message.MsgType){
      case "event":
        if (message.Event.valueOf() == "subscribe"){
          res.reply(configjson.subscribeEcho);
        }
        break;
      case "text":
        searchCloud.search(message.Content,function(resString){
          res.reply(resString+configjson.psStr);
        });
    }
    
  }
));

app.listen(80,function(){
  console.log("Listening to PORT 80");
});
