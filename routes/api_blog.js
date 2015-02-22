var express = require('express');
var router = express.Router();

var models = require('../models');

// WORKS WHEN LOGGED IN (need to add auth)
router.post('/', function(req, res, next) {

  // TODO
  var name = req.body.name;
  if (!name) {
    return res.status(400).json({error: 'InvalidName'});
  } 
  models.Blog.create({ 
    name: name 
  }).complete(function(err, result) {
    // NEED TO ADD THE CREATOR (USER WHO IS LOGGED IN) AS
    // AN AUTHOR? USER OWNS A BLOG SO WE MIGHT NEED TO FIRST
    // DO THIS:
    /*
    models.User.findOne({
      where: { username: <LOGGED IN USERNAME> }
    }).then(function(user) {
      models.Blog.create({
        name: name
      }).then(function(createdBlog) {
        createdBlog.setUser(user).then(function() {
          return res.status(201).json(createdBlog.id);
        });
      });
    });
    */
    // HOWEVER WHEN USER IS CREATED, A DEFAULT BLOG IS CREATED

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

// WORKS WHEN LOGGED IN AND IS AN AUTHOR OF THE BLOG(need to add check later)
router.delete('/:id', function(req, res, next) {
  var id = req.params['id'];
  var query = {where: {id: id}};
  models.Blog.findOne(
    {
      where: {id: id},
      include:[
        {
          model: Author
        }
      ]
    }).then(function(blog) {
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


// WORKS WHEN LOGGED IN AND IS AN AUTHOR OF THE BLOG(need to add check later)
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

router.get('/:id/posts', function(req, res, next) {
  var id = req.params['id'];
  var query = {
    where: {id: id},
    include: [models.Post]
  };
  var result = [];
  models.Blog.findOne(query).then( function(blog) {
    if(!blog) {
      return res.status(404).json({error: 'BlogNotFound'});
    } else {
      for(var i=blog.Posts.length-1; i>=blog.Posts.length-10; i--){
        if(i == 0){
          break;
        }
        result.push(blog.Posts[i]);
      }
      return res.status(200).json(result);
    }
  });
});

// WORKS WHEN LOGGED IN AND IS AN AUTHOR OF THE BLOG(need to add check later)
router.post('/:id/posts', function(res, req, next) {
  var id = req.params['id'];
  var title = req.body.title;
  var text = req.body.text;
  if (!title) {
    return res.status(400).json({error: 'InvalidTitle'});
  } else if (!text) {
    return res.status(400).json({error: 'InvalidText'});
  }
  models.Blog.findOne({ where: {id: id} }).then( function(blog) {

    // NEED TO ADD AUTHOR WHEN AUTHENTICATION WORKS

    models.Post.create({
      title: title,
      text: text,
    }).complete(function(err, result) {
      return res.status(201).json(result.id);
    })
  })

  models.Blog.create({ 
    name: name 
  }).complete(function(err, result) {
    return res.status(201).json(result.id);
    //return res.status(201).json(user.id);
  });
});

module.exports = router;