var express = require('express');
var router = express.Router();

var models = require('../models');

// Create new user
// ---------------
// Works also with:
// curl -X POST http://myappv2.herokuapp.com/api/user
// -H 'Content-Type: application/json' 
// -d '{"username": "username", "realname": "realname", "password": "pw"}'

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

// Get user information
// --------------------
// Works also with:
// curl -X GET http://myappv2.herokuapp.com/api/user/:username
// prints out as:
// {"username": "username", "realname": "realname"}

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

// Update user information
// -----------------------
// Works also with:
// curl -X PUT http://myappv2.herokuapp.com/api/user/:username
// -H 'Content-Type: application/json' -d '{"varName": "newValue"}'

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

// Delete user
// -----------
// Works also with:
// curl -X DELETE http://myappv2.herokuapp.com/api/user/:username

router.delete('/:username', function(req, res, next) {
  var username = req.params['username'];
  var query = {where: {username: username}};
  models.User.findOne(query).then(function(user) {
    if (!user) {
      return res.status(404).json({error: 'UserNotFound'});
    }
    else {
      models.User.destroy(query).then(function () {
        return res.status(200).json(user);
      },
      function(err) {
        return res.status(500).json({error: 'ServerError'});
      });
    }
  });
});

router.get('/:username/blogs', function(req, res, next) {
  var username = req.params['username'];
  var query = {where: {username: username}};
  models.User.findOne(query).then(function(user) {
    if(!user) {
      return res.status(404).json({error: 'UserNotFound'});
    } else {
      models.Blog.findAll({ 
        include: [
          {
            model: Author,
            where: {username: username}
          }
        ]
      }).then(function(name) {
        return res.status(200).json(name);
      });
    }
  });
});

module.exports = router;