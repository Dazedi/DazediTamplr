var express = require('express');
var router = express.Router();

var models = require('../models');


router.post('/', function(req, res, next) {

  // TODO
  var newUser = {
    username: req.body.username,
    name: req.body.realname,
    password: req.body.password
  };

  if (!newUser.username) {
    return res.status(400).json({error: 'InvalidUserName'});
  } else if(!newUser.name){
    return res.status(400).json({error: 'InvalidRealName'});
  } else if(!newUser.password){
    return res.status(400).json({error: 'InvalidPassword'});
  }

  var query = {where: {username: newUser.username}};
  models.User.findOne(query).then(function(user) {
    if(user){
      return res.status(409).json({error: 'Username already exists'});
    }
  }

  models.User.create(newUser).then(function(user) {
    return res.status(201).json(user);
  },
  function(err) {
    return res.status(500).json({error: 'ServerError'});
  });
});


router.get('/:username', function(req, res, next) {

  // TODO
  var username = req.params['username'];
  var query = {where: {username: username}};
  models.User.findOne(query).then(function(user) {
    if (user) {
      return res.status(200).json({ 
        username: user.username,
        name: user.realname 
      });
    }
    else {
      return res.status(404).json({error: 'UserNotFound'});
    }
  });
});

/*
router.delete('/:username', function(req, res) {
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
});*/

module.exports = router;
