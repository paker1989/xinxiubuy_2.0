const path = require('path')

module.exports = {

  generateFileName : function(fileName){
  let fileExt = path.extname(fileName)
  let fileNameWithoutExt = fileName.substring(0,fileName.lastIndexOf(fileExt))
  
  return fileNameWithoutExt+'_'+new Number(new Date())+fileExt
  },

  wrapItem : function(product,prefix){
    let wrapItem = {
         id          : product._id,
         title       : product.productName,
         price       : product.price,
         description : product.description,
         tags        : product.tags,
         options     : product.options.map( option => {                 
                        return {
                                name   :option.split('&')[0],
                                values :option.split('&')[1].split('-')  
                                }
                       }),
         picPath     : product.picPaths.length == 1?
                        path.join(prefix,product.picPaths[0]).replace(/\\/g,'/')
                       :product.picPaths.map(picPath => { return path.join(prefix,picPath).replace(/\\/g,'/')})
    }

    if(product.picPaths.length>1)
     wrapItem.nbPics = product.picPaths.length

    return wrapItem
  },

  wrapManualUser: function(rawManualUser){
   return  {
        userId       : rawManualUser._id,
        userName     :rawManualUser.userName || '数据出错',
        phoneNumber  :rawManualUser.phoneNumber || '',
        comment      :rawManualUser.comment || '无',
        createdDate  :rawManualUser.createdDate,
        address      :rawManualUser.address || '数据出错',
        orders       :rawManualUser.orders || []
   }
  }
	
}
