var auth = require('basic-auth');
var models = require('../models');

/*
module.exports = function(req, res, next){
  var user = auth(req);
  models.User.findAll()
  if (!user || !users[user.name] || users[user.name].password !== user.pass) {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send();
  }
  return next();
};*/