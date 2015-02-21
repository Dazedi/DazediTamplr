var express = require('express');
var router = express.Router();

var models = require('../models');


router.post('/', function(req, res, next) {

  // TODO

  var username = req.body.username;
  var realname = req.body.realname;
  var password = req.body.password;
  if (!username) {
    return res.status(400).json({error: 'InvalidUserName'});
  } else if (!realname) {
    return res.status(400).json({error: 'InvalidRealName'});
  } else if (!password) {
    return res.status(400).json({error: 'InvalidPassword'});
  }

  var query = {where: {username: username}};
  models.User.findOne(query).then(function(user){
    if(user) {
      return res.status(409).json({error: 'Username already exists'});
    } else {
      models.User.create({
        username: username,
        realname: realname,
        password: password
      }).then(function(user) {
        return res.status(201).json(user);
      },
      function(err) {
        return res.status(500).json({error: 'ServerError'});
      });
    } 
  });
});


router.get('/:username', function(req, res, next) {

  // TODO

  var username = req.params['username'];
  var query = {where: {username: username}};
  models.User.findOne(query).then(function(user) {
    if (user) {
      var result = { username: user.username, realname: user.realname};
      return res.json(result);
    }
    else {
      return res.status(404).json({error: 'UserNotFound'});
    }
  });
});

router.put('/:username', function(req, res, next) {
  var username = req.params['username'];
  var realname = req.body.realname;
  var password = req.body.password;
  if (!realname && !password) {
    return res.status(400).json({error: 'InvalidRealName or Password'});
  }

  var query = {where: {username: username}};
  models.User.findOne(query).then(function(user){
    if(!user) {
      return res.status(409).json({error: 'UserNotFound'});
    } else {
      // Realname is empty => update password
      if(!realname) {
        models.User.update({ password: password },query).then(function(user) {
          return res.status(200).json(user);
        },
        function(err) {
          return res.status(500).json({error: 'ServerError'});
        });
      // Password is empty => update realname
      } else if(!password) {
        models.User.update({ realname: realname },query).then(function(user) {
          return res.status(200).json(user);
        },
        function(err) {
          return res.status(500).json({error: 'ServerError'});
        });
      // Update realname and password
      } else {
        models.User.update({ realname: realname, password: password },query).then(function(user) {
          return res.status(200).json(user);
        },
        function(err) {
          return res.status(500).json({error: 'ServerError'});
        });
      }
    } 
  });
});

router.delete('/:username', function(req, res, next) {
  var username = req.params['username'];
  var query = {where: {username: username}};
  models.User.findOne(query).then(function(user) {
    if (!user) {
      return res.status(404).json({error: 'UserNotFound'});
    }
    else {
      models.User.destroy(query).then(function () {
        return res.status(200);
      },
      function(err) {
        return res.status(500).json({error: 'ServerError'});
      });
    }
  });
});

module.exports = router;