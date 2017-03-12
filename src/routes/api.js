const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const config = require('../../config')
const util = require('./util')

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
}

let uploadPics = (req, res, next) => {
  let fileUuids = new Array()
  let fileNameEntries = req.body.fileNameEntries.split(',')

  fileNameEntries.forEach(fileName => {
   let uuidName = util.generateFileName(fileName)
   fileUuids.push(uuidName)

   req.files[fileName].mv(rootPicPath+'/'+uuidName,(err)=>{
    if(err)
     res.status(500).send(err)
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

module.exports = router
