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
  var idnum = 0;
  models.Blog.max('id', {where: {id: { $lt: 'a'}}}).then(function(blogid){
  	if(!blogid){
  		idnum = 1;
  		//return res.status(201).json(idnum);
  	} else {
  		//return res.status(201).json(blogid);
  		idnum = parseInt(blogid)+1;
  	}
		models.Blog.create({ 
		  id: idnum,
		  name: name 
		}).then(function(blog) {
		  var username = 'teemu';
		  models.User.find({where:{username:username}}).then(function(user){
		  	user.addAuthoredBlog(blog).then(function(){
		  		return res.status(201).json(blog.id);
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
router.delete('/:id', function(req, res, next) {
  var id = req.params['id'];
  var query = {where: {id: id}};
  models.Blog.findOne({where: {id: id}}).then(function(blog) {
    if (!blog) {
      return res.status(404).json({error: 'BlogNotFound'});
    }
    else {
      // destroying blog _should_ cascade and destroy all posts 
      // and deal with associations
      blog.destroy().complete(function(){
        return res.status(200).end();
      });
    }
  });
});


// WORKS WHEN LOGGED IN AND IS AN AUTHOR OF THE BLOG(need to add check later)
router.put('/:id/author/:username', function(req, res, next) {
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
  		}
    }
  });
});

// // add DELETE /:id/author/:username HERE
router.delete('/:id/author/:username', function(req, res, next) {
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
	  		for(var i = 0; i < result.length; i++){
	  			if(result[i].username == username){
	  				found = true;
	  			}
	  		}
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
  });
})

// router.get('/:id/posts', function(req, res, next) {
//   var id = req.params['id'];
//   var query = {
//     where: {id: id}
//   };
//   var result = [];
//   if(typeof id == 'number'){
//     models.Blog.findOne(query).then(function(blog) {
//       if(!blog) {
//         return res.status(404).json({error: 'BlogNotFound'});
//       } else {
//         blog.getPosts().success(function(posts){
//           for(var i=posts.length-1; i>=posts.length-10; i--){
//             if(i == 0){
//               break;
//             }
//             result.push({"id":posts[i].id, "title":posts[i].title, "author":posts[i].author});
//           }
//           return res.status(200).json(result);
//         });
//       }
//     });
//   } else {
//     models.DefBlog.findOne(query).then(function(blog) {
//       if(!blog) {
//         return res.status(404).json({error: 'BlogNotFound'});
//       } else {
//         blog.getPosts().success(function(posts){
//           for(var i=posts.length-1; i>=posts.length-10; i--){
//             if(i == 0){
//               break;
//             }
//             result.push(posts[i]);
//           }
//           return res.status(200).json(result);
//         });
//       }
//     });
//   }
// });


// // WORKS WHEN LOGGED IN AND IS AN AUTHOR OF THE BLOG(need to add check later)
// router.post('/:id/posts', function(res, req, next) {
//   var id = req.params['id'];
//   var title = req.body.title;
//   var text = req.body.text;
//   if (!title) {
//     return res.status(400).json({error: 'InvalidTitle'});
//   } else if (!text) {
//     return res.status(400).json({error: 'InvalidText'});
//   }

//   // NEED TO ADD POSTING TO DEFAULT BLOG IF ID IS LOGGED IN GUYS USERNAME

//   models.Blog.findOne({ where: {id: id} }).then( function(blog) {

//     // NEED TO ADD AUTHOR WHEN AUTHENTICATION WORKS

//     models.Post.create({
//       title: title,
//       text: text,
//     }).complete(function(err, result) {
//       return res.status(201).json(result.id);
//     })
//   })

//   models.Blog.create({ 
//     name: name 
//   }).complete(function(err, result) {
//     return res.status(201).json(result.id);
//     //return res.status(201).json(user.id);
//   });
// });

module.exports = router;