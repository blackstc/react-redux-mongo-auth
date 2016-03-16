var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Define model
var userSchema = new Schema({
   email: { type: String, unique: true, lowercase: true },
   password: String
});

// Create model class
var model = mongoose.model('user', userSchema);

// export model
module.exports = model;