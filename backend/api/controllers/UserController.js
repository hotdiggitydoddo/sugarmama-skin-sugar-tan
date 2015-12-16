/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  signup: function(req, res) {

    var Passwords = require('machinepack-passwords');

    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.body.password,
	  difficulty: 10,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
		  res.negotiate(err);
      },
      // OK.
      success: function(encryptedPassword) {
		  User.create({
			  firstName: req.body.firstName,
			  lastName: req.body.lastName,
			  emailAddress: req.body.emailAddress,
			  password: encryptedPassword
		  }, function userCreated(err, newUser) {
			  if (err) {
				  return res.negotiate(err);
			  }
			  console.log(newUser.id);
			  return res.json({
				  id: newUser.id
			  });
		  });
	  }
    });
  }
};
