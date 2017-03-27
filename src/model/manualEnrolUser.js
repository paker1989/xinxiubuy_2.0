var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
var manualEnrolUserSchema = new Schema({
	userId        : String,
	userPseudo    : String,
	photoPath     : String,
	selectedTags  : [String],
	createdDate   : Date,
	isAuth        : Boolean,//is authenticated
	wishedList    : Schema.Types.Mixed;
})
*/

var manualEnrolUserSchema = new Schema({
	userName      : String,
	address       : String,
	phoneNumber    : String,
	createdDate   : Date,
	comment       : String,
	orders        : [Schema.Types.Mixed]
})

var manualEnrolUser = mongoose.model('manualEnrolUser',manualEnrolUserSchema);
module.exports = manualEnrolUser;
