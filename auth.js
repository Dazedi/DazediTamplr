/*
var basicAuth = require('basic-auth');
var models = require('./models');

module.exports = function(req, res, next){
  function unauthorized(res){
      res.set('WWW-Authenticate', 'Basic realm=tamplr');
      return res.status(401).json({error: 'Unauthorized Access'});
  };
  var user = basicAuth(req);
  if(!user || !user.name || !user.pass){
    return unauthorized(res);
  } else {
    models.User.find({where:{username:user.name}}).then(function(data){
      if(!data){
        return unauthorized(res);
      } else {
        if(user.name === data.username && user.pass === data.password){
          return next();
        } else {
          return unauthorized(res);
        }
      }
    },
    function(err){
      return unauthorized(res);
    });
  }
};*/


