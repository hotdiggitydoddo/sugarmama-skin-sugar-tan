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
      password: 'l0lcatzz',
    }).exec({
      // An unexpected error occurred.
      error: function(err) {

      },
      // OK.
      success: function(result) {

      },
    });
  }
};
