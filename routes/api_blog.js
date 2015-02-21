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
  }).complete(function(err, result) {
    return res.status(201).json(result.id);
    //return res.status(201).json(user.id);
  });
});

router.get('/:id', function(req, res, next) {
  var id = req.params['id'];
  var query = {where: {id: id}};
  models.Blog.findOne(query).then(function(blog) {
    if (blog) {
      var result = { id: blog.id, name: blog.name};
      return res.json(result);
    }
    else {
      return res.status(404).json({error: 'BlogNotFound'});
    }
  });
});

module.exports = router;