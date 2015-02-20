var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.Post.create({
    text: req.param('text')
  }).then(function() {
    res.redirect('/statusUpdate');
  });
});

router.get('/:post_id/destroy', function(req, res) {
  models.Post.find({
    where: {id: req.param('post_id')},
  }).then(function(post) {
    post.destroy().then(function() {
      res.redirect('/');
    });
  });
});

module.exports = router;