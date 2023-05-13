var express = require('express');
const {render} = require('../app');
var router = express.Router();



const fs = require('fs');





const govtHelpers = require('../helpers/govt-helpers')
const imageHelpers = require('../helpers/image-helpers')

const { response } = require('express');
const collections = require('../config/collections');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('',{admin:true});
});

router.get('/add-govt', function(req, res){
  res.render('admin/add-govt',{admin:true})
});
router.get('/add-sampleel', function(req, res){
  res.render('admin/sampleel',{admin:true})
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


router.get('/add-files', function(req, res){
  res.render('admin/add-files',{admin:true})
});
router.post('/add-files', (req, res) => {
  console.log(req.files.Image)
  var collectname = collections.IMAGE_COLLECTION;
  imageHelpers.addItem(req.body,collectname,(id) => {
    let image = req.files.Image
    console.log(id)
    image.mv('./public/file-images/'+id+'.pdf',(err,done)=>{
      if(!err){
        res.render('admin/add-files',{admin:true});
      }else{
        console.log(err)
      }
    })
      
  });
});


router.get('/view-files', (req, res) => {
  var collectname = collections.IMAGE_COLLECTION;
    imageHelpers.getAllItems(collectname).then((image) => {
      res.render('admin/view-files', {image, admin:true});
    })
});
router.get('/delete-files/:id', (req, res) => {
  let imageId = req.params.id
  var collectname = collections.IMAGE_COLLECTION;
  imageHelpers.deleteItem(imageId,collectname).then((response) => {
    res.redirect('/admin/view-files')
  })
})


router.get('/edit-files/:id', function (req, res, next) {
  let fileId = req.params.id
  const file = './public/file-images/'+fileId+'.pdf';
  res.download(file);
  
})





module.exports = router;
