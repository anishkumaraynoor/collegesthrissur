var express = require('express');
var collection = require('../config/collections');




const { render, response } = require('../app');
const userHelpers = require('../helpers/user-helpers');
const elsHelpers = require('../helpers/els-helpers')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user;
  console.log(user);
  res.render('user/add-els', { user });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('user/login', { "LoginErr": req.session.loginErr });
    req.session.loginErr = false;
  }
});
router.get('/signup', function (req, res) {
  res.render('user/signup');
})
router.post('/signup', function (req, res) {
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response);
    res.redirect('/');
  })
})
router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/');
    } else {
      req.session.loginErr = true;
      res.redirect('/login');
    }
  })
})
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
})

router.get('/add-els', function (req, res, next) {
  let user = req.session.user;
  res.render('user/add-els', { user });
});

router.post('/view-els', (req, res) => {
  elsHelpers.elsWork(req.body).then((elsdata) => {
    console.log(elsdata);
    res.render('user/view-els',{elsdata});
  })
});


module.exports = router;
