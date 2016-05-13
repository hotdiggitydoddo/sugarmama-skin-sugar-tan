/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    signup: function (req, res) {
        var userVm = req.body;
        userVm.roles = [1];
        UserService.createUser(userVm)
            .then(function (success) {
                res.ok(success);
            })
            .catch(function (err) {
                res.negotiate(err);
            })
    },

    changePassword: function (req, res) {
        var passwordVm = req.body;

        UserService.changePassword(passwordVm)
            .then(function (success) {
                res.ok(success);
            })
            .catch(function (err) {
                res.send(403, err);
                //res.negotiate(err);
            })
    }

};
