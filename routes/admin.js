var express = require('express');
const {render} = require('../app');
var router = express.Router();





const govtHelpers = require('../helpers/govt-helpers')

const { response } = require('express');
const collections = require('../config/collections');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('',{admin:true});
});

router.get('/add-govt', function(req, res){
  res.render('admin/add-govt',{admin:true})
});
router.post('/add-govt', (req, res) => {
  var collectname = collections.GOVT_COLLECTION;
  govtHelpers.addItem(req.body,collectname,(id) => {
      res.render('admin/add-govt',{admin:true});
  });
});
router.get('/view-govt', (req, res) => {
  var collectname = collections.GOVT_COLLECTION;
    govtHelpers.getAllItems(collectname).then((govt) => {
      res.render('admin/view-govt', {govt, admin:true});
    })
});
router.get('/delete-govt/:id', (req, res) => {
  let govtId = req.params.id
  var collectname = collections.GOVT_COLLECTION;
  govtHelpers.deleteItem(govtId,collectname).then((response) => {
    res.redirect('/admin/view-govt')
  })
})
router.get('/edit-govt/:id', async (req, res) => {
  var collectname = collections.GOVT_COLLECTION;
  let govtcoll = await govtHelpers.getItemDetails(req.params.id,collectname);
  console.log(govtcoll);
  var items = govtcoll.items;
    var allitems = govtcoll.allitems;
  res.render('admin/edit-govt', { items, allitems, admin:true })
})
router.post('/edit-govt/:id', async (req, res) => {
  var collectname = collections.GOVT_COLLECTION;
  await govtHelpers.updateItem(req.params.id,req.body,collectname).then(() => {
    res.redirect('/admin/view-govt')
  })
})





module.exports = router;
