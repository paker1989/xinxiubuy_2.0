var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username          :  String,
	password          :  String,
	phoneNumber       :  String,
	photoPath         : {type:  String,             default: '无'},
	linkedManualId    : {type:  String,             default: '-1'},
	selectedTags      : {type : [String],           default: ['店长推荐']},
	wishedList        : {type : Schema.Types.Mixed, default: []},
	selfCreatedOrders : {type : Schema.Types.Mixed, default: []},
    createdDate       : {type : Date,               default:Date.now}
})

var selfEnrollUser = mongoose.model('selfEnrollUser',userSchema);
module.exports = selfEnrollUser;
