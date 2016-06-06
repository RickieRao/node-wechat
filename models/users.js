var editJson = require('./editJson.js');
var fs = require('fs');
var users = module.exports;

function exists(userid){
	var users = JSON.parse(fs.readFileSync('./config/users.json', 'utf8'));
	if(hasOwnProperty(users,userid)){
		return true;
	}
	return false;
}

users.addIfNew = function(userid){
	if(!exists(userid)){
		editJson.addUser(userid);
		console.log("new user added: "+ userid);
	}
}

function hasOwnProperty(obj, prop) {
    var proto = obj.__proto__ || obj.constructor.prototype;
    return (prop in obj) &&
        (!(prop in proto) || proto[prop] !== obj[prop]);
}

