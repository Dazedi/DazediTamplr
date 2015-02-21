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

router.delete('/:id', function(req, res, next) {
  var id = req.params['id'];
  var query = {where: {id: id}};
  models.Blog.findOne(query, include: [{models: Author}]).then(function(blog) {
    if (!blog) {
      return res.status(404).json({error: 'BlogNotFound'});
    }
    else {
      models.Author.destroy({ where: {BlogID: blog.id}}).then(function (affectedRows){
        blog.destroy().then(function(){
          return res.status(200).send('OK');
        });
      },
      function(err) {
        return res.status(500).json({error: 'ServerError'});
      });
    }
  });
});

router.put('/:id/author/:username', function(req, res, next) {
  var id = req.params['id'];
  var username = req.params['username'];
  var query = {where: {id: id}};
  models.Blog.findOne(query).then( function(blog) {
    models.Author.create({
      username: username
    }).then(function(username) {
      username.setBlog(blog).then(function() {
        return res.status(200).send('OK');
      });
    });
  });
});

module.exports = router;