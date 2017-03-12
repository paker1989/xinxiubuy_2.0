var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var product = mongoose.model('Product',productSchema);
module.exports = product;
