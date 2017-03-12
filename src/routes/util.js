const path = require('path')

module.exports = {

  generateFileName : function(fileName){
  let fileExt = path.extname(fileName)
  let fileNameWithoutExt = fileName.substring(0,fileName.lastIndexOf(fileExt))
  
  return fileNameWithoutExt+'_'+new Number(new Date())+fileExt
  }
	
}
