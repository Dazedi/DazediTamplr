var auth = require('basic-auth');
var models = require('../models');


module.exports = function(req, res, next){
  var user = auth(req);
  models.User.findAll().success(function(userlist) {
  	for(var i=0;i<userlist.length;i++){
    	if (!user || user.name !== userlist[i].username || user.password !== userlist[i].password) {
		    res.set('WWW-Authenticate', 'Basic realm="example"');
		    return res.status(401).send();
		  }
  	}
  });

/*
  if (!user || !users[user.name] || users[user.name].password !== user.pass) {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send();
  }*/
  return next();
};