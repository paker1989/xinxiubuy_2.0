//bxu1
const express = require('express')
const router = express.Router()
const fs = require('fs')

let upload = (req, res, next) => {
  console.log(req.files.thumbnail);
  var file = req.files.thumbnail
  /*
  file.mv('./public/thumbnail.jpg',function(err){
    if(err)
     return res.status(500).send(err)
     res.send('File uploaded!')
  })
  */
  fs.writeFile('./public/sdsds.jpg',file.data, err => {
    if(err)
     return res.status(500).send(err)

     res.send('File uploaded!')
  })
}

router.post('/upload',upload)

module.exports = router
