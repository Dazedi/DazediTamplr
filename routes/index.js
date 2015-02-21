var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', function(req, res) {
  models.User.findAll({
  	include: [ models.Post ]
  }).then(function(users) {
    res.render('index', {
      host: req.headers.host,
      title: 'INDEX',
      users: users
    });
  });
});

module.exports = router;
