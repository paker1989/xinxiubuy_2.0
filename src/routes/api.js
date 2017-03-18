const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const config = require('../../config')

const util = require('./util')
const db = require('../../db')
const Product = require('../model/product')
const Tag = require('../model/tag')

let productCollection = db.collection('products')
let tagCollection = db.collection('tags')

let rootPicPath = path.join(config.dev.assetsSubDirectory,'productResource')

let uploadProduct = (req, res, next) => {
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
  Product.findById(req.body.id,(err,data) => {
   res.send({
     msg:'success',
     product:util.wrapItem(data,rootPicPath)
   })
  })
}

let getProductByTag = (req, res, next) => {
 // productCollection.find({}).toArray((err,data) => {
 Product.find({ tags : { '$in' : [req.body.category] } },(err,data) => {
   if(err){
    res.status(404).redirect('/') 
   }else{
      let wrapedProducts = new Array() 

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

let fetchAllTags = (req, res, next) => {
  tagCollection.find({}).toArray((err,data) => {
   if(!err){
    res.status(200).send({
     msg     : 'success',
     allTags : data
    })
   }
  })
}

let saveNewTags = (req, res, next) => {
   let errs =     []
   let savedTags = []

   req.body.tagsToSave.split(',').forEach(tag => {
    let tagToSave = new Tag({
                      tagName     : tag,
                      createdDate : new Date()
                    })
//should refactor here
    tagToSave.save(function(err,data){
      if(err){
       errs.push(err)
      }else{
       savedTags.push(tag)
      }
    })
   })

  res.status(200).send({
   msg    : 'success'
  })
   

}



router.post('/uploadPics',uploadPics)
router.post('/uploadProduct',uploadProduct)
router.get('/getProducts',getProducts)
router.post('/getProductById',getProductById)
router.post('/getProductByTag',getProductByTag)
router.post('/fetchAllTags',fetchAllTags)
router.post('/saveNewTags',saveNewTags)

module.exports = router

/*
let upload = (req, res, next) => {
  var file = req.files.thumbnail

  fs.writeFile('./public/sdsds.jpg',file.data, err => {
    if(err)
     return res.status(500).send(err)

     res.send('File uploaded!')
  })
}
*/