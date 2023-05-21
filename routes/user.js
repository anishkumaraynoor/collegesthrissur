var express = require('express');
var collection = require('../config/collections');




const { render, response } = require('../app');
const userHelpers = require('../helpers/user-helpers');
const govtHelpers = require('../helpers/govt-helpers');
const imageHelpers = require('../helpers/image-helpers');
const elsHelpers = require('../helpers/els-helpers')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.user;
  console.log(user);
  res.render('user/homepage', { user });
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

router.get('/message', function (req, res, next) {
  let user = req.session.user;
  res.render('user/message', { user });
});

router.get('/view-govtcoll', function (req, res, next) {
  let user = req.session.user;
  var collectname = collection.GOVT_COLLECTION;
  govtHelpers.getAllItems(collectname).then((govt) => {
    res.render('user/view-govtcoll', { govt, user });
  })
});
router.get('/edit-govtcoll/:id', async (req, res) => {
  let user = req.session.user;
  var collectname = collection.GOVT_COLLECTION;
  let govtcoll = await govtHelpers.getItemDetails(req.params.id, collectname);
  console.log(govtcoll);
  var items = govtcoll.items;
  var allitems = govtcoll.allitems;
  res.render('user/edit-govtcoll', { items, allitems, user })
})

router.get('/download-file', function (req, res, next) {
  const file = `files/letterreplace.docx`;
  res.download(file);
})

router.get('/view-file', function (req, res, next) {
  let user = req.session.user;
  var collectname = collection.IMAGE_COLLECTION;
  imageHelpers.getAllItems(collectname).then((image) => {
    res.render('user/view-file', { image, user });
  })
});


router.get('/edit-file/:id', function (req, res, next) {
  let fileId = req.params.id
  const file = './public/file-images/' + fileId + '.pdf';
  res.download(file);

});

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
