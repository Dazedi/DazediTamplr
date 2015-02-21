var express = require('express');
var router = express.Router();

var models = require('../models');

var auth = express.basicAuth(function(user,pass) {
  return (user == "username" && pass == "password") ? true : false;
}, 'dev area');

router.get('/', auth, function(req, res, next) {
  models.User.findAll().then(function(users) {
    res.render('index', {
      host: req.headers.host,
      users: users
    });
  });
});

module.exports = router;
