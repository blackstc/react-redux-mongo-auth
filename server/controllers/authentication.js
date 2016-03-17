var User = require('../models/user');

exports.signup = function(req, res, next) {
    // Check for user with email
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide an email and password' });
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        var user = new User({
            email: email,
            password: password
        });

        user.save(function(err) {
            if (err) { return next(err); }

            res.json(user);
        });
    });
};