var User = require('../models/user');

exports.signup = function(req, res, next) {
    // Check for user with email
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email }, function(err, user) {
        
    });
    // if user exists, return error

    // no email then create and save a new user

    // respond to request
};