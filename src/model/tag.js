var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
   tagName         : String,
   createdDate     : Date
});

var tag = mongoose.model('Tag',tagSchema);
module.exports = tag;
