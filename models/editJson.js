var fs = require('fs');

var editJson = module.exports;

appendProperty = function(key,property,fileLoc){
  var configFile = fs.readFileSync(fileLoc,'utf8');
  var config = JSON.parse(configFile);
  config[key] = property;
  var configJSON = JSON.stringify(config);
  fs.writeFileSync(fileLoc, configJSON);
}


editJson.addUser = function(userid){
	appendProperty(userid,userid,"./config/users.json");
}

//appendProperty({OnetimeCode : WEAS_Server_NewOneTimeCode});