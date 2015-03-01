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
        var defblog = username + "'s default blog.";
        models.Blog.create({
          id: username,
          name: defblog
        }).then(function(blog){
          user.addAuthoredBlog(blog).then(function(){
            return res.status(201).json(user);
          },
          function(err){
            return res.status(500).json({error: 'Adding blog to user failed'});
          });
          
        },
        function(err) {
          return res.status(500).json({error: 'Creating blog failed'});
        });
      },
      function(err) {
        return res.status(500).json({error: 'Creating user failed'});
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
  },
  function(err) {
    return res.status(500).json({error: 'Server Error'});
  });
});


// Update user information
// -----------------------
// Works also with:
// curl -X PUT http://myappv2.herokuapp.com/api/user/:username
// -H 'Content-Type: application/json' -d '{"varName": "newValue"}''
// WORKS WHEN LOGGED IN AND LOGGED IN === USERNAME(need to add check later)
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
          return res.status(200).json({error: 'ok'});
        },
        function(err) {
          return res.status(500).json({error: 'ServerError'});
        });
      // Password is empty => update realname
      } else if(!password) {
        models.User.update({ realname: realname },query).then(function(user) {
          return res.status(200).json({error: 'ok'});
        },
        function(err) {
          return res.status(500).json({error: 'ServerError'});
        });
      // Update realname and password
      } else {
        models.User.update({ realname: realname, password: password },query).then(function(user) {
          return res.status(200).json({error: 'ok'});
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
// WORKS WHEN LOGGED IN AND LOGGED IN === USERNAME(need to add check later)
router.delete('/:username', function(req, res, next) {
  var username = req.params['username'];
  var query = {where: {username: username}, include: [{model: models.Blog, as: 'AuthoredBlogs'}]};
  models.User.find(query).then(function(user) {
    if (!user) {
      return res.status(404).json({error: 'UserNotFound'});
    }
    else {
      models.Blog.find({where: {id: username}}).then(function(blog){
        user.destroy().then(function(){ 
          // POST DEStrUction ?!?!
          blog.destroy().then(function(){
            return res.status(500).json({error: 'user and blog destroyed'});
          }) 
        }) 
      })
    }
  });
});


router.get('/:username/blogs', function(req, res, next) {
  var username = req.params['username'];
  var query = {where: {username: username}, include: [{model: models.Blog, as: 'AuthoredBlogs'}]};
  var result = [];
  models.User.find(query).then(function(user) {
    if(!user) {
      return res.status(404).json({error: 'UserNotFound'});
    } else {
      user.AuthoredBlogs.forEach(function(blog){
        result.push({id: blog.id});
      })
      return res.status(200).json(result);
      /*
      user.getAuthoredBlogs().then(function(blogs) {
        return res.status(400).json(blogs[0]);
        blogs.forEach(function(blog) {
          //result.push({id: blog.id});
          result.push(blog);
        });
      });
      return res.status(200).json(result);
      */
      /*
      models.Blog.findAll({ where: { }}).success(function(stuff) {
        for(var i=0;i<stuff.length;i++){
          for(var j=0;j<stuff[i].Authors.length;j++){
            if(stuff[i].Authors[j].username == username){
              result.push({id: stuff[i].id});
            }
          }
        }
        return res.status(200).json(result);
      });
      */
    }
  });
});

/*
router.get('/:username/follows', function(req, res, next) {
  var username = req.params['username'];
  models.User.findOne({where:{username: username}}).then(function(user){
    if(!user){
      return res.status(404).json({error: 'UserNotFound'});
    } else {
      return res.status(200).json(user.follows);
    }
  });
});

router.put('/:username/follows/:id', function(req, res, next) {
  var username = req.params['username'];
  var id = req.params['id'];
  models.User.findOne({where:{username:username}}).then(function(user){
    if(!user){
      return res.status(404).json({error: 'UserNotFound'});
    } else {
      if(typeof id == 'number'){
        models.Blog.findOne({where:{id:id}}).then(function(blog){
          if(!blog){
            return res.status(404).json({error: 'BlogNotFound'});
          } else {
            blog.followers.push(username);
            user.follows.push(id.toString());
          }
        });
      } else {
        models.DefBlog.findOne({where:{id:id}}).then(function(blog){
          if(!blog){
            return res.status(404).json({error: 'BlogNotFound'});
          } else {
            blog.followers.push(username);
            user.follows.push(id);
          }
        });
      }
    }
  });
});

router.delete('/:username/follows/:id', function(req, res, next) {
  var username = req.params['username'];
  var id = req.params['id'];
  models.User.findOne({where:{username:username}}).then(function(user){
    if(!user){
      return res.status(404).json({error: 'UserNotFound'});
    } else {
      if(typeof id == 'number'){
        models.Blog.findOne({where:{id:id}}).then(function(blog){
          if(!blog){
            return res.status(404).json({error: 'BlogNotFound'});
          } else {
            var index = blog.followers.indexOf(username);
            blog.followers.splice(index,1);
            index = user.follows.indexOf(id.toString());
            user.follows.splice(index,1);
          }
        });
      } else {
        models.DefBlog.findOne({where:{id:id}}).then(function(blog){
          if(!blog){
            return res.status(404).json({error: 'BlogNotFound'});
          } else {
            var index = blog.followers.indexOf(username);
            blog.followers.splice(index,1);
            index = user.follows.indexOf(id.toString());
            user.follows.splice(index,1);
          }
        });
      }
    }
  });
});

router.put('/:username/likes/:id', function(req, res, next) {
  var username = req.params['username'];
  var id = req.params['id'];
  models.User.findOne({where:{username:username}}).then(function(user){
    if(!user){
      return res.status(404).json({error: 'UserNotFound'});
    } else {
      models.Post.findOne({where:{id:id}}).then(function(post){
        if(!post){
          return res.status(404).json({error: 'BlogNotFound'});
        } else {
          var index = user.likes.indexOf(id);
          if(index == -1){
            user.likes.push(id);
            post.increment('likes', 1);
            return res.status(200).end();
          } 
        }
      });
    }
  });
});

router.delete('/:username/likes/:id', function(req, res, next) {
  var username = req.params['username'];
  var id = req.params['id'];
  models.User.findOne({where:{username:username}}).then(function(user){
    if(!user){
      return res.status(404).json({error: 'UserNotFound'});
    } else {
      models.Post.findOne({where:{id:id}}).then(function(post){
        if(!post){
          return res.status(404).json({error: 'BlogNotFound'});
        } else {
          var index = user.likes.indexOf(id);
          if(index != -1){
            var index = user.follows.indexOf(id);
            user.likes.splice(index,1);
            post.decrement('likes', 1);
            return res.status(200).end();
          } 
        }
      });
    }
  });
});*/

module.exports = router;