/**
 * EstheticianController
 *
 * @description :: Server-side logic for managing Estheticians
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get: function(req, res) {
        console.log('getting estheticians')

        EstheticianService.getEstheticians()
            .then(function(estheticians) {
                return res.json(estheticians);
            })
            .catch(function(err) {
                res.send(500);
            });
    },

    getById: function(req, res) {
        EstheticianService.getEstheticianById(req.query.id)
            .then(function(esthetician) {
                console.log('here')
                return res.json(esthetician);
            })
            .catch(function(err) {
                res.send(500);
            });
    },
    
     getByEmail: function(req, res) {
        
        EstheticianService.getEstheticianByEmail(req.query.email)
            .then(function(esthetician) {
                console.log('here')
                return res.json(esthetician);
            })
            .catch(function(err) {
                res.send(500);
            });
    },

    create: function(req, res) {
        var estheticianVm = req.body;
        estheticianVm.password = '$ugar4Life';
        UserService.createUser(estheticianVm)
            .then(function(newUser) {
                console.log('created user: ' + newUser)
                EstheticianService.createEsthetician(newUser)
                    .then(function(newEsthetician) {
                        res.ok(newEsthetician);
                    })
            })
            .catch(function(err) {
                res.negotiate(err);
            })
    },

    update: function(req, res) {
        var estheticianVm = req.body;
        var esthId = estheticianVm.id;
        estheticianVm.id = estheticianVm.userId;
        UserService.updateUser(estheticianVm)
            .then(function(updatedUser) {
                console.log('updated user: ' + updatedUser)
                estheticianVm.id = esthId;
                res.ok(estheticianVm);
            })
            .catch(function(err) {
                res.negotiate(err);
            })
    },

    delete: function(req, res) {
        var estheticianInfo = req.body.estheticianInfo;
        console.log("request: " + req.body);
        Appointment.findOne({ esthetician: estheticianInfo.id })
            .then(function(appt) {
                if (appt) {
                    return res.status(403).send('Delete failed.  This esthetician has appointments scheduled.  Cancel or reschedule those appointments and try again.');
                }
                EstheticianService.deleteEsthetician(estheticianInfo)
                    .then(function(deleted) {
                        res.ok(deleted);
                    })
                    .catch(function(err) {
                        res.negotiate(err);
                    });
            })
            .catch(function(err) {
                res.negotiate(err);
            });
    }
};