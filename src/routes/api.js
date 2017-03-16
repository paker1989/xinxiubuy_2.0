const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const config = require('../../config')

const util = require('./util')
const db = require('../../db')
const Product = require('../model/product')

let productCollection = db.collection('products')

let rootPicPath = path.join(config.dev.assetsSubDirectory,'productResource')

/*
let upload = (req, res, next) => {
  console.log(req.files.thumbnail);
  var file = req.files.thumbnail

  fs.writeFile('./public/sdsds.jpg',file.data, err => {
    if(err)
     return res.status(500).send(err)

     res.send('File uploaded!')
  })
}
*/

let uploadProduct = (req, res, next) => {
//  console.log(req.body)
  let product = new Product({
   productName  : req.body.title,
   price        : req.body.price, 
   description  : req.body.description,
   picPaths     : req.body.filePaths.split(','),
   options      : req.body.addedOptions?req.body.addedOptions.split(','):[],
   tags         : req.body.selectedTags.split(','),
   createDate   : new Date()
  })

  product.save(function(err,data){
   if(!err){
     res.send({
       msg:'success',
       data:data
     });
   }else{
    res.send(404);
   }
  })  
}

//may deprecated
let getProducts = (req,res,next) => {
   productCollection.find({}).toArray((err,data) => {
    let wrapedProducts = new Array()

    if(!err){
       data.forEach( product => {
        wrapedProducts.push(util.wrapItem(product,rootPicPath))
       })

       res.send({
         msg:'success',
         products:wrapedProducts
       })
    }
   })
} 

let getProductById = (req,res,next) => {
 // console.log(req.body)
  Product.findById(req.body.id,(err,data) => {
  // console.log(data)
   res.send({
     msg:'success',
     product:util.wrapItem(data,rootPicPath)
   })
  })
}

let getProductByTag = (req, res, next) => {
       console.log(req.body.category)
  Product.find({ tags : { '$in' : [req.body.category] } },(err,data) => {
   if(err){
    console.log('err')
    res.status(404).redirect('/') 
   }else{
      let wrapedProducts = new Array() 

      console.log(req.body.category)
      console.log(data)
      data.forEach( product => {
      wrapedProducts.push(util.wrapItem(product,rootPicPath))
     }) 

     res.send({
       msg:'success',
       products:wrapedProducts
     })

   }
  })
}

let uploadPics = (req, res, next) => {
  let fileUuids = new Array()
  let fileNameEntries = req.body.fileNameEntries.split(',')

  fileNameEntries.forEach(fileName => {
   let uuidName = util.generateFileName(fileName)
   fileUuids.push(uuidName)

   req.files[fileName].mv(rootPicPath+'/'+uuidName,(err)=>{
    if(err){
     res.status(500).send(err)
     return
    }
   })
  })

  res.status(200).send({
   msg : 'ok',
   data: fileUuids
  })
}



//router.post('/upload',upload)
router.post('/uploadPics',uploadPics)
router.post('/uploadProduct',uploadProduct)
router.get('/getProducts',getProducts)
router.post('/getProductById',getProductById)
router.post('/getProductByTag',getProductByTag)

module.exports = router
