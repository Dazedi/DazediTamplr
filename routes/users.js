var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.User.create({
    username: req.param('username')
  }).then(function() {
    res.redirect('/statusUpdate');
  });
});

router.get('/:user_id/destroy', function(req, res) {
  models.User.find({
    where: {id: req.param('user_id')},
    include: [models.Post]
  }).then(function(user) {
    models.Post.destroy(
      {where: {UserId: user.id}}
    ).then(function(affectedRows) {
      user.destroy().then(function() {
        res.redirect('/statusUpdate');
      });
    });
  });
});

router.post('/:user_id/posts/create', function (req, res) {
  models.User.find({
    where: { id: req.param('user_id') }
  }).then(function(user) {
    models.Post.create({
      text: req.param('text')
    }).then(function(text) {
      text.setUser(user).then(function() {
        res.redirect('/statusUpdate');
      });
    });
  });
});

router.get('/:user_id/posts/:post_id/destroy', function (req, res) {
  models.User.find({
    where: { id: req.param('user_id') }
  }).then(function(user) {
    models.Post.find({
      where: { id: req.param('post_id') }
    }).then(function(post) {
      post.setUser(null).then(function() {
        post.destroy().then(function() {
          res.redirect('/statusUpdate');
        });
      });
    });
  });
});

module.exports = router;