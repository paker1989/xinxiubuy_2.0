const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const config = require('../../config')

const util = require('./util')

const db = require('../../db')
const Product = require('../model/product')
const Tag = require('../model/tag')
const ManualEnrolUser = require('../model/manualEnrolUser')

let productCollection = db.collection('products')
let tagCollection = db.collection('tags')
let manualUserCollection = db.collection('manualenrolusers')

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

let fetchManualUsers = (req, res, next) => { 
   manualUserCollection.find({}).toArray((err,data) => {
    if(!err){
       let wrapedUsers = new Array()
       data.forEach( user => {
        wrapedUsers.push(util.wrapManualUser(user))
       })

       res.send({
         msg:'success',
         users:wrapedUsers
       })
    }
   })  
}

let saveNewUser = (req, res, next) => {
  //new user
  if(req.body.userId == ''){
     let newManualUser = new ManualEnrolUser({
                             userName   : req.body.userName,
                             address    : req.body.address,
                             phoneNumber: req.body.phoneNumber,
                             createdDate: new Date(),
                             comment    : req.body.comment,
                             orders     : []
                            })

    newManualUser.save((err,data) => {
     if(!err){
      res.status(200).send({
       msg    : 'success',
       user   :  util.wrapManualUser(data)
      })
     }
    }) 
  }
  else{
    //update user
    ManualEnrolUser.update({_id:req.body.userId},{
                        $set:{
                           userName   : req.body.userName,
                           address    : req.body.address,
                           phoneNumber: req.body.phoneNumber,
                           comment    : req.body.comment}
                         },
      (err,data) => {
       res.status(200).send({
       msg    : 'success'
      })    
    
   })    
  }                       
}


let saveOrUpdateOrder = (req,res,next) => {
  let order = JSON.parse(req.body.order)
  if(req.body.isUpdate){
   ManualEnrolUser.update({_id:req.body.userId,
                          'orders.uuid':order.uuid},
                          {$set: {"orders.$":order} },(data) => {
                           res.status(200).send({
                            msg   : 'success',
                            data  : data
                           })
                          })
                         
  }
  else{
   ManualEnrolUser.update({_id:req.body.userId},{
    $push: {orders : order}
   },(
   err,data) => {
    res.status(200).send({
     msg  : 'success',
     data :  data
    })
   })  
   }
 }

router.post('/uploadPics',uploadPics)
router.post('/uploadProduct',uploadProduct)
router.get('/getProducts',getProducts)
router.post('/getProductById',getProductById)
router.post('/getProductByTag',getProductByTag)
router.post('/fetchAllTags',fetchAllTags)
router.post('/saveNewTags',saveNewTags)
router.post('/fetchManualUsers',fetchManualUsers)
router.post('/saveNewUser',saveNewUser)
router.post('/saveOrUpdateOrder',saveOrUpdateOrder)

module.exports = (passport) =>{
  router.post('/signup',passport.authenticate('signup'), (req,res) => {
   if(req.user){
    res.send({
     msg  : 'success',
     user : req.user
    })
   }
  }
 )

/*
 router.post('/login', (req,res,next) => {
  passport.authenticate('login',(err,user,info) => {
   if(err) return next(err)

   if(!user) return next()

   req.logIn(user,(err) => {
    if(err) return next(err)
    return next()
   })
  })
 },
 (req,res,next) => {
  console.log('??')
  if(req.user){
   res.send({
    msg  : 'success',
    user :  req.user
   })
  }
  else{
   res.send({
    msg : req.flsh('message')
   })
  }
 })
 */
 
 router.post('/login',(req, res, next) => {
   passport.authenticate('login', (err, user, info) => {
    if(err) {
      return next(err)
     }
    if(!user){
     return res.send({
      msg: req.flash('message')
     })
    }
    req.logIn(user,(err) => {
     if(err) {return next(err)}
     return res.send({
      msg  : 'success',
      user : req.user
     })
    })
   })(req, res, next)
  })
  

  return router
}