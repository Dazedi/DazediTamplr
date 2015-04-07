var express = require('express');
var router = express.Router();

var models = require('../models');

/*
/api/user/:username/likes/:id
function getLikes(id){

}
*/

router.get('/:id', function(req, res, next) {
  var id = req.params['id'];
  var result;
  models.Post.find({where: {id: id}, include: [{model: models.User},{model: models.User, as:'Likes'}]}).then(function(post){
    if(!post){
    	result = {error: 'PostNotFound'};
    } else {
    	result = { 'title': post.title, 'text': post.text, 'author': post.User.username, 'likes':post.Likes.length};
    }
    return res.json(result);
  });
});

router.post('/:id/comments', function(req, res, next) {
  var id = req.params['id'];
  var text = req.body.text;
  var result;
  //TEMPORARY USER
  var username = 'teemu';

  if (!text) {
    return res.status(400).json({error: 'InvalidText'});
  }
  models.Post.find({where: {id: id}, include: [models.User]}).then(function(post){
    if(!post){
    	result = {error: 'PostNotFound'};
    } else {
    	models.User.find({where: {username: username}}).then(function(user){
    		models.Comment.create({text: text}).then(function(comment){
    			post.addComment(comment).then(function(){
    				user.addComment(comment).then(function(){
    					return res.status(200).json(comment.id);
    				})
    			})
    		})
    		//return res.status(400).json(post);
    	});
    }
  });
});

router.get('/:id/comments', function(req, res, next) {
	var id = req.params['id'];
	var result = [];
	models.Post.find({where: {id: id}, include: [{model: models.Comment, include: [models.User]} ]}).then(function(post){
		if(!post){
			return res.status(404).json({error: 'PostNotFound'});
		} else {
			for(var i=post.Comments.length-1; i>=post.Comments.length-10; i--){
    		result.push({"id":post.Comments[i].id, "text":post.Comments[i].text, "author":post.Comments[i].User.username});
    		if(i == 0){
           break;
         }
    	};
    	result.reverse();
    	return res.status(200).json(result);
		}
	});
});

router.get('/:id/commentCount', function(req, res, next) {
  var id = req.params['id'];
  var result = [];
  models.Post.find({where: {id: id}, include: [{model: models.Comment, include: [models.User]} ]}).then(function(post){
    if(!post){
      return res.status(404).json({error: 'PostNotFound'});
    } else {
      return res.status(200).json({"commentCount":post.Comments.length})
      //post.Comment.count.then(function(count){
      //  return res.status(200).json({"commentCount":count});
      //})
    }
  });
});

// This is for getting the 10 newest posts(blog doesnt matter)
/*router.get('/', function(req, res, next) {
  var result = [];
  models.Post.findAll({include: [{model: models.User},{model: models.Blog}]}).then(function(posts){
    if(!posts){
      return res.status(404).json({error: 'NoPostsFound'});
    } else {
      for(var i=posts.length-1; i>=posts.length-10; i--){
        result.push({"id":posts[i].id, "title":posts[i].title, "author":posts[i].User.username,
          "blogID":posts[i].Blog.id, "blog":posts[i].Blog.name});
        if(i == 0) { break; }
      };
      result.reverse();
      return res.status(200).json(result);
    }
  })
})*/
/*
router.get(':id/comments', function(req, res, next) {
	var id = req.params['id'];
	var result = [];
	models.Post.find({where: {id: id}, include: [{model: models.Comment, include: [models.User]} ]}).then(function(post){
    if(!post) {
      return res.status(404).json({error: 'PostNotFound'});
    } else {
    	post.getComments().then(function(comments){
		    for(var i=comments.length-1; i>=comments.length-10; i--){
		    	result.push({ 'id': comments[i].id, 'text': comments[i].text, 'author': comments[i].User.username});
	  	  	if(i == 0){
	    	    break;
	      	}
	   		}
	    return res.json(result);
    	})
	  }
  });
});

router.post(':id/comments', function(req, res, next){
	var id = req.params['id'];
	var text = req.body.text;
	var result = [];
	if (!text) {
    return res.status(400).json({error: 'InvalidText'});
  } 
	models.Post.find({where: {id: id}}).then(function(post){
    if(!post) {
      return res.status(404).json({error: 'PostNotFound'});
    } else {
    	models.Comment.create({ text: text }).then(function(comment) {
		  	var username = 'teemu';
		  	models.User.find({where:{username:username}}).then(function(user){
		  		user.addComment(comment).then(function(){
		  			return res.status(201).json(comment.id);
		  		})
		 		})
			})
	  }
  });
});
*/

module.exports = router;