var express = require('express');
var router = express.Router();

var models = require('../models');
var auth = require('../auth');
var passport = require('passport');

var auth = function(req, res, next){
  if(!req.isAuthenticated()){
    res.redirect('/');
  } else {
    next();
  }
};

function logout(req, res){
  req.session.destroy(function(err) {
    res.redirect('/')
  })
}

router.get('/', function(req, res) {
  if(req.isAuthenticated()){
    res.redirect('/auth_index');
  } else {
    var result = [];
    models.Post.findAll({include: [{model: models.User},{model: models.Blog}]}).then(function(posts){
      if(posts === undefined || posts.length == 0){
        //return res.status(404).json({error: 'lel'});
        result = [];
      } else {
        //return res.status(404).json({error: 'ofefafeawfw0'});
        for(var i=posts.length-1; i>=posts.length-10; i--){
          result.push({"id":posts[i].id, "title":posts[i].title, "author":posts[i].User.username,
            "blogID":posts[i].Blog.id, "blog":posts[i].Blog.name});
          if(i == 0) { break; }
        };
        //result.reverse();
      }
    }).then(function(){
      res.render('index', {
        posts: result
      });
    })
    
  }

  /*res.render('index', {
    host: req.headers.host
  });*/
});

router.post('/logout', logout);

router.post('/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/auth_index',
  failureRedirect: '/login'
}));

router.get('/login', function(req, res) {
  res.render('login');
});

/*
router.get('/login',
  passport.authenticate('local', 
    {successReturnToOrRedirect: '/auth_index',
    failureRedirect: '/' }),
  function(req, res, next) {
  models.User.findAll().then(function(users) {
   res.redirect('/auth_index');
  });
});
*/

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/auth_index', auth, function(req, res, next) {
  var username = req.user.username;
  var query = {
    where: {username: username}, 
    include: [{
      model: models.Blog, as: 'FollowedBlogs', 
      include:[{
        model: models.Post, 
        include: models.User
      }]
    }, {model: models.Blog, as: 'AuthoredBlogs'}]
  };
  var result = [];
  var followed_blogs = [];
  var blogs = [];
  models.User.find(query).then(function(user) {
    if(!user) {
      //return res.status(404).json({error: 'UserNotFound'});
      res.render('error', {
        error: "User Not Found"
      })
    } else {
      user.FollowedBlogs.forEach(function(blog){
        blog.Posts.forEach(function(post){
          result.push({"id":post.id, "title":post.title, "author":post.User.username,
                  "blogID":post.BlogId, "blog":blog.name, "postTime":post.createdAt });
        })
        followed_blogs.push({"blog":blog.name, "blogID":blog.id});
      })
      user.AuthoredBlogs.forEach(function(blog){
        blogs.push({"blog":blog.name, "blogID":blog.id});
      })
      result.reverse();
    }
  }).then(function(){
    res.render('auth_index', {
      user: req.user,
      posts: result,
      fblogs: followed_blogs,
      blogs: blogs
    });
  });


    /*models.Post.findAll({include: [{model: models.User},{model: models.Blog}]}).then(function(posts){
      if(posts === undefined || posts.length == 0){
        //return res.status(404).json({error: 'lel'});
        result = [];
      } else {
        //return res.status(404).json({error: 'ofefafeawfw0'});
        for(var i=posts.length-1; i>=posts.length-10; i--){
          result.push({"id":posts[i].id, "title":posts[i].title, "author":posts[i].User.username,
            "blogID":posts[i].Blog.id, "blog":posts[i].Blog.name});
          if(i == 0) { break; }
        };
        result.reverse();
      }
    }).then(function(){
      res.render('auth_index', {
        user: req.user,
        posts: result
      });
    })*/


  //models.User.findAll({where:{username: }}).then(function(users) {
  /*var result = [];
  models.Post.findAll({where: {author: req.user}, include: [{model: models.User},{model: models.Blog}]}).then(function(posts){
    if(!posts){
      return res.status(404).json({error: 'NoPostsFound'});
    } else {
      for(var i=posts.length-1; i>=posts.length-10; i--){
        result.push({"id":posts[i].id, "title":posts[i].title, "author":posts[i].User.username,
          "blogID":posts[i].Blog.id, "blog":posts[i].Blog.name});
        if(i == 0) { break; }
      };
      result.reverse();
    }
  }).then(function(){*/
  //res.render('auth_index', {
  //  posts: result,
  //  user: req.user
  //});
  //})
});

router.get('/post/:id', function(req, res, next) {
  res.render('post', {
    id: req.params['id'],
    user: req.user
  });
});

router.get('/blog/:id', function(req, res, next) {
  res.render('blog', {
    id: req.params['id'],
    user: req.user
  });
});

module.exports = router;
