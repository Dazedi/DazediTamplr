var express = require('express');
var router = express.Router();

var models = require('../models');
var auth = require('../auth');
var passport = require('passport');

// WORKS WHEN LOGGED IN (need to add auth)
router.post('/', passport.authenticate('basic', { session: false }), function(req, res, next) {
  var name = req.body.name;
  if (!name) {
    return res.status(400).json({error: 'InvalidName'});
  } 
  var idnum = 0;
  models.Blog.max('id', {where: {id: { $lt: 'a'}}}).then(function(blogid){ //Ebin purkkaratkaisu
  	if(!blogid){
  		idnum = 1;
  	} else {
  		idnum = parseInt(blogid)+1;
  	}
		models.Blog.create({ 
		  id: idnum,
		  name: name 
		}).then(function(blog) {
		  var username = req.user.username;
		  models.User.find({where:{username:username}}).then(function(user){
		  	user.addAuthoredBlog(blog).then(function(){
		  		return res.status(201).json({"id":blog.id});
		  	})
		 	})
		})
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
router.delete('/:id', passport.authenticate('basic', { session: false }), function(req, res, next) {
  var id = req.params['id'];
  var query = {where: {id: id}, include: [{model: models.User, as: 'Authors'}]};
  var theBlog;
  var authorlist = [];
  models.Blog.findOne(query).then(function(blog){
    if(blog){
      if(!parseInt(id)){
        return res.status(403).json({error: 'Default blog cannot be deleted'});
      } else {
        theBlog = blog;
        blog.Authors.forEach(function(author){
          authorlist.push(author.username);
        });
        return blog.setAuthors([]);
      }
    } else {
      return res.status(404).json({error: 'Blog Not Found'});
    }
  }).then(function(){
    if(authorlist.indexOf(req.user.username) > -1){
      return theBlog.destroy();
    } else {
      return res.status(400).json({error: 'unauthorizedAccess'})
    }
  }).then(function(){
    return res.end();
  })

  /*models.Blog.findOne(query).then(function(blog) {
    if (!blog) {
      
    }
    else {
      //var result = $.grep(blog.Authors, function(e){ return e.username == req.body.username; });
      var authorlist = [];
      blog.Authors.forEach(function(author){
        authorlist.push(author.username);
      });
      if(authorlist.indexOf(req.user.username) > -1){
        var theBlog = blog;
        models.Blog.destroy({where: {name: blog.name}}).then(function(){
          return res.status(200).json(blog)
        });
        //blog.setAuthors([]).then(function(){
          
        //})
      } else {
        return res.status(400).json({error: 'unauthorizedAccess'})
      }
    }
  });*/
});

router.get('/:id/authors', function(req, res, next) {
  var id = req.params['id'];
  var query = {where: {id: id}, include: [{model: models.User, as: 'Authors'}]};
  models.Blog.findOne(query).then( function(blog) {
    if(!blog){
      return res.status(404).json({error: 'BlogNotFound'});
    } else {
      return res.status(200).json(blog.Authors);
    }
  });
});

// WORKS WHEN LOGGED IN AND IS AN AUTHOR OF THE BLOG(need to add check later)
router.put('/:id/author/:username', passport.authenticate('basic', { session: false }), function(req, res, next) {
  var id = req.params['id'];
  var username = req.params['username'];
  var query = {where: {id: id}, include: [{model: models.User, as: 'Authors'}]};
  var theBlog;
  var authorlist = [];
  models.Blog.findOne(query).then(function(blog){
    if(blog){
      if(!parseInt(id)){
        return res.status(403).json({error: 'Default blog authors cannot be changed'});
      } else {
        theBlog = blog;
        blog.Authors.forEach(function(author){
          authorlist.push(author.username);
        });
        //return blog.addAuthor([]);
      }
    } else {
      return res.status(404).json({error: 'Blog Not Found'});
    }
  }).then(function(){
    if(authorlist.indexOf(req.user.username) > -1){
      models.User.find({where:{username:username}}).then(function(userToAdd){
        if(userToAdd){
          theBlog.addAuthor(userToAdd).then(function(){
            return res.status(200);
          })
        } else {
          return res.status(404).json({error: 'User not found'});
        }
      })
    } else {
      return res.status(403).json({error: 'unauthorizedAccess'})
    }
  }).then(function(){
    return res.end();
  })


  /*models.Blog.findOne(query).then( function(blog) {
    if(!blog){
      return res.status(404).json({error: 'BlogNotFound'});
    } else {
    	if(!parseInt(id)){
    		return res.status(403).json({error: 'Unable to change authors'});
    	} else {
        blog.Authors.find(req.user.username).success(function(){
  	  		var result = [];
  	  		blog.Authors.forEach(function(user){
  	  			result.push({username:user.username});
  	  		})
  	  		var found = false;
  	  		for(var i = 0; i < result.length; i++){
  	  			if(result[i].username == username){
  	  				found = true;
  	  			}
  	  		}
  	  		if(!found){
  	  			models.User.find({where:{username:username}}).then(function(userToAdd){
  	  				if(!userToAdd){
  	  					return res.status(403).json({error: 'User not found'});
  	  				} else {
  	  					blog.addAuthor(userToAdd).then(function(){
  	  					//return res.status(200).json({error:'UserAddedAsAuthor'});
  	  					return res.status(200).json(userToAdd);
  	  					})
  	  				}
  	  			})
  	  		}
        })
  		}
    }
  });*/
});

// // add DELETE /:id/author/:username HERE
router.delete('/:id/author/:username', passport.authenticate('basic', { session: false }), function(req, res, next) {
	var id = req.params['id'];
  var username = req.params['username'];
  var query = {where: {id: id}, include: [{model: models.User, as: 'Authors'}]};
  models.Blog.findOne(query).then( function(blog) {
    if(!blog){
      return res.status(404).json({error: 'BlogNotFound'});
    } else {
    	if(!parseInt(id)){
    		return res.status(403).json({error: 'Unable to change authors'});
    	} else {
	  		var result = [];
	  		blog.Authors.forEach(function(user){
	  			result.push({username:user.username});
	  		})
	  		var found = false;
        var author = false;
	  		for(var i = 0; i < result.length; i++){
	  			if(result[i].username == username){
	  				found = true;
	  			}
          if(result[i].username == req.user.username){
            author = true;
          }
	  		}
        if(!author){
          return res.status(400).json({error: 'unauthorizedAccess'});
        } else {
          if(!found){
  	  			return res.status(403).json({error: 'No Such Author'});
  	  		} else {
  	  			models.User.find({where:{username:username}}).then(function(userToRemove){
  	  				if(!userToRemove){
  	  					return res.status(403).json({error: 'User not found'});
  	  				} else {
  	  					blog.removeAuthor(userToRemove).then(function(){
  	  					//return res.status(200).json({error:'UserAddedAsAuthor'});
  	  					return res.status(200).json(userToRemove);
  	  					})
  	  				}
  	  			})
  	  		}
        }
  		}
    }
  });
})

router.get('/:id/posts', function(req, res, next) {
  var id = req.params['id'];
  var query = {
  	where: {id: id}, 
  	include: [
  		{model: models.Post },
  		{model: models.User, as: 'Authors'}
  	]
  };
  var result = [];

  models.Blog.findOne(query).then(function(blog) {
    if(!blog) {
      return res.status(404).json({error: 'BlogNotFound'});
    } else {
    	//models.Post.findAll({include: [{model: models.User}]})

    	models.Post.findAll({where:{BlogId:blog.id}, include: [{model: models.User}] }).then(function(posts){
        if(posts === undefined || posts.length == 0){
          return res.json(result);
        } else {
      		for(var i=posts.length-1; i>=posts.length-10; i--){
      			result.push({"id":posts[i].id, "title":posts[i].title, "text":posts[i].text,
      				"author":posts[i].User.username});
      			if(i == 0){
              break;
            }
      		};
      		result.reverse();
      		return res.status(200).json(result);
        }
    	})
    }
  });
});


// WORKS WHEN LOGGED IN AND IS AN AUTHOR OF THE BLOG(need to add check later)
router.post('/:id/posts', passport.authenticate('basic', { session: false }), function(req, res, next) {
  var id = req.params['id'];
  var title = req.body.title;
  var text = req.body.text;
  // TEMPORARY USER
  var username = req.user.username;

  if (!title) {
    return res.status(400).json({error: 'InvalidTitle'});
  } else if (!text) {
    return res.status(400).json({error: 'InvalidText'});
  }
  
  var query = {where: {id: id}, include: [{model: models.User, as: 'Authors'}, {model: models.Post}]};
  models.Blog.find(query).then(function(blog){
  	if(!blog){
      return res.status(404).json({error: 'BlogNotFound'});
    } else {
      var result = [];
      blog.Authors.forEach(function(user){
        result.push({username:user.username});
      })
      var found = false;
      for(var i = 0; i < result.length; i++){
        if(result[i].username == req.user.username){
          found = true;
        }
      }
      if(!found){
        return res.status(403).json({error:'unauthorizedAccess'});
      } else {
      	models.User.find({where: {username: username}}).then(function(user){
      		models.Post.create({
  	    		title: title,
  	    		text: text
  	    	}).then(function(post){
  	    		blog.addPost(post).then(function(){
  	    			user.addPost(post).then(function(){
  	    				return res.status(201).json({"id":post.id});
  	    			})
  	    		})
  	    	})
      	})
      }
    }
  })
});

// GET /api/blog/:id/followers
// Returns 200 and followers of the blog
router.get('/:id/followers', function(req, res, next){
  var id = req.params['id'];
  models.Blog.find({where:{id:id}, include: [{model: models.User, as: 'Followers'}]}).then(function(blog){
    return res.status(200).json(blog.Followers);
  });
});

module.exports = router;