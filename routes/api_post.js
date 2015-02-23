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
  models.Post.findOne({where: {id: id}}).then(function(post){
    var result = { title: post.title, realname: user.realname};
    
    return res.json(result);
  });
});

module.exports = router;