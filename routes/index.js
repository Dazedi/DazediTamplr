var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', function(req, res) {
  models.User.findAll().then(function(users) {
    res.render('index', {
      host: req.headers.host,
      users: users
    });
  });
});

module.exports = router;
