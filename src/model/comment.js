var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
   id                 :     String,
   linkedProductId    :     String,
   linkedUserId       :     String,
   content            :     String,
   timeStamp          :     Date,
   type               :     Number,//1 comment on product 2 comment on comment
   referCommentId     :     String //only for 2
});

var product = mongoose.model('Product',productSchema);
module.exports = product;
