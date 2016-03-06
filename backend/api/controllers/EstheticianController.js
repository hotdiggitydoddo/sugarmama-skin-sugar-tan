/**
 * EstheticianController
 *
 * @description :: Server-side logic for managing Estheticians
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get: function (req, res) {
        console.log('getting estheticians')

        EstheticianService.getEstheticians()
            .then(function (estheticians) {
                return res.json(estheticians);
            })
            .catch(function (err) {
                res.send(500);
            });
    },

    getById: function (req, res) {
        EstheticianService.getEstheticianById(req.query.id)
            .then(function (esthetician) {
                console.log('here')
                return res.json(esthetician);
            })
            .catch(function (err) {
                res.send(500);
            });
    },

    create: function (req, res) {
        var estheticianVm = req.body;
        estheticianVm.password = '$ugar4Life';
        UserService.createUser(estheticianVm)
            .then(function (newUser) {
                console.log('created user: ' + newUser)
                EstheticianService.createEsthetician(newUser)
                    .then(function (newEsthetician) {
                        res.ok(newEsthetician);
                    })
            })
            .catch(function (err) {
                res.negotiate(err);
            })
    }
};