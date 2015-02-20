var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

/* GET cattax */
router.get('/cattax', function(req, res, next) {
  res.render('cattax', { title: 'CatTax' });
});

/* GET magicks */
router.get('/magicks', function(req, res, next) {
  res.render('magicks', { title: 'Magicks!' });
});

/* GET log */
router.get('/log', function(req, res, next) {
  res.render('log', { title: 'Log'});
});

/* GET webohjelmointi */
router.get('/webohjelmointi', function(req, res, next) {
  res.render('webohjelmointi', { title: 'Web Ohjelmointi'});
});

/* GET ht0 */
router.get('/ht0', function(req, res, next) {
  res.render('ht0', { title: 'HT0'});
});

/* GET marjametsa */
router.get('/marjametsa', function(req, res, next) {
  res.render('marjametsa', { title: 'Marjametsa The Game'});
});

/* GET projects */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Other projects'});
});

/* GET contact */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact'});
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET statusUpdate */
router.get('/statusUpdate', function(req, res, next) {
  models.Post.findAll().then(function(posts) {
    res.render('index', {
      host: req.headers.host,
      posts: posts
    });
  });
});
/*
router.get('/statusUpdate', function(req, res, next) {
  	var db = req.db;
	var collection = db.get('postcollection');
	collection.find({},{},function(e, docs){
		res.render('statusUpdate', {
			"statusUpdate" : docs
		});
	});
});
*/
/* POST to add new posts */

/*
router.post('/addpost', function(req, res) {
	var db = req.db;
	var update = req.body.update;
	var collection = db.get('postcollection');
	collection.insert({
		"update" : update
	}, function(err, doc) {
		if(err) {
			res.send("There was a problem adding post to database");
		} else {
			res.location("statusUpdate");
			res.redirect("statusUpdate");
		}
	});
});*/



/* GET Userlist page. */
/*
router.get('/userlist', function(req, res, next) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e, docs){
		res.render('userlist', {
			"userlist": docs
		});
	});
});*/

router.get('/userlist', function(req, res, next) {
  models.User.findAll({
  	include: [models.Post]
  }).then(function(users) {
    res.render('userlist', {
      //host: req.headers.host,
      title: 'User List'
      users: users
    });
  });
});

/* GET New User page. */
/*
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

router.post('/adduser', function(req, res){
	var db = req.db;
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	var collection = db.get('usercollection');
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function(err, doc) {
		if(err) {
			res.send("There was a problem adding to database");
		} else {
			res.location("userlist");
			res.redirect("userlist");
		}
	});
});*/

module.exports = router;
