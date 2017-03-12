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
  console.log(req.body)

  let product = new Product({
   productName  : req.body.title,
   price        : req.body.price, 
   description  : req.body.description,
   picPaths     : req.body.filePaths.split(','),
   options      : req.body.addedOptions.split(','),
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

let getProducts = (req,res,next) => {
   productCollection.find({}).toArray((err,data) => {
    console.log(data)
    if(!err){
       data.map( product => {
        let wrapItem = {
             id          : product._id,
             title       : product.productName,
             price       : product.price,
             description : product.description,
             tags        : product.tags,
             options     : product.options.map( option => {
                            let optionkey    = option.split('&')[0]
                            console.log(option.split('&')[1])
                            let optionValues = option.split('&')[1].split('-')
                            console.log(optionValues)
                            return {
                                    name   :optionkey,
                                    values :optionValues 
                                    }
                           }),
             picPath     : product.picPaths.length == 1?
                            path.join('rootPicPath',product.picPaths[0])
                           :product.picPaths.map(picPath => { return path.join('rootPicPath',picPath)})
        }

        if(product.picPaths.length>1)
         wrapItem.nbPics = product.picPaths.length

         console.log(wrapItem)
         return wrapItem
       })

       res.send({
         msg:'success',
         products:data
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

module.exports = router
