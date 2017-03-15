var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
var productSchema = new Schema({
	productName :String,
	price       :Number,
	deliveryFee :Number,
    description :String,
	picPaths    : [],
	options     : [],
	tags        : [],
	createDate  : Date
});
*/
var userSchema = new Schema({
	userId        : String,
	userPseudo    : String,
	photoPath     : String,
	selectedTags  : [String],
	createdDate   : Date,
	isAuth        : Boolean,//is authenticated
	wishedList    : Schema.Types.Mixed;
})

var product = mongoose.model('Product',productSchema);
module.exports = product;
