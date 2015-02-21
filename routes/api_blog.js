var express = require('express');
var router = express.Router();

var models = require('../models');

router.post('/', function(req, res, next) {

  // TODO
  var name = req.body.name;
  if (!name) {
    return res.status(400).json({error: 'InvalidName'});
  } 
  models.Blog.create({ 
    name: name 
  }).complete(function(user) {
    return res.status(201).json(user.id);
    //return res.status(201).json(user.id);
  });
});

module.exports = router;