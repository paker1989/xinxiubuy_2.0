var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userId        : String,
	userPseudo    : String,
	photoPath     : String,
	selectedTags  : [String],
	createdDate   : Date,
	isAuth        : Boolean,//is authenticated
	wishedList    : Schema.Types.Mixed;
})

var selfEnrollUser = mongoose.model('selfEnrollUser',userSchema);
module.exports = selfEnrollUser;
