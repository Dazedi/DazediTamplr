var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', function(req, res, next) {
  var htryhma = { "group": "420blazeit"};
  return res.json(htryhma);
});

module.exports = router;