/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  signup: function(req, res) {
      var userVm = req.body;

      UserService.createUser(userVm)
      .then(function(success) {
          res.ok(success);
      })
      .catch(function(err) {
          res.negotiate(err);
      })
  },

 
};
