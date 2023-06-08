var express = require('express');
const {render} = require('../app');
var router = express.Router();



const fs = require('fs');






const { response } = require('express');
const collections = require('../config/collections');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('',{admin:true});
});







module.exports = router;
