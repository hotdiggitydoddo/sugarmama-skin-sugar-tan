/**
 * AppointmentController
 *
 * @description :: Server-side logic for managing Appointments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get: function (req, res) {
        AppointmentService.getAll()
            .then(function (appointments) {
                return res.json(appointments);
            })
            .catch(function (err) {
                res.send(500);
            });
    },

    create: function (req, res) {
        var appt = req.query.models[0];

        AppointmentService.create(appt)
            .then(function (newAppt) {
                //sails.sockets.broadcast('apptUpdates', 'refresh', 'hello');
                res.json(200, newAppt);
                SmsEmailService.sendNewAppointmentCorrespondence(newAppt.id);
            })
            .catch(function (err) {
                return res.negotiate(err);
            });

        // AppointmentService.intersects(appt)
        //     .then(function (result) {
        //         if (result) {
        //             res.status(403).send('Another appointment has been booked during this time.  Refresh your browser!');
        //         } else {

        //         }
        //     })

    },

    update: function (req, res) {
        var appt = req.query.models[0];

        AppointmentService.update(appt)
            .then(function (updated) {
                return res.json(200, updated);
            })
            .catch(function (err) {
                return res.negotiate(err);
            });
    },

    destroy: function (req, res) {
        var appt = req.query.models[0];

        AppointmentService.destroy(appt)
            .then(function (updated) {
                return res.json(200, updated);
            })
            .catch(function (err) {
                return res.negotiate(err);
            });
    },

    sync: function (req, res) {
        if (!req.isSocket) return res.badRequest();

        sails.sockets.join(req, 'apptUpdates');
        return res.ok();
    },

    getEstheticians: function (req, res) {
        var results = [];
        EstheticianService.getEstheticians()
            .then(function (estheticians) {
                estheticians.forEach(function (esth) {
                    results.push({
                        text: esth.firstName,
                        value: esth.id,
                        color: "#" + esth.color
                    });
                });
                return res.json(200, results);
            })
            .catch(function (err) {
                res.send(500);
            });
    },

    getByEsthetician: function (req, res) {
        AppointmentService.getByEsthetician(req.query.id)
            .then(function (appointments) {
                return res.json(appointments);
            })
            .catch(function (err) {
                res.negotiate(err);
            });
    },

    submitRequest: function (req, res) {
        var apptRequest = req.body;

        AppointmentService.checkOpenings(apptRequest)
            .then(function (results) {
                return res.json(200, results);
            })
            .catch(function (err) {
                return res.negotiate(err);
            });
    },

    checkAvailableOpenings: function (req, res) {
        var apptRequest = req.body;
        AppointmentService.checkOpenings1(apptRequest)
            .then(function (results) {
                return res.json(200, results);
            })
            .catch(function (err) {
                return res.negotiate(err);
            });
    },

    submitBlockout: function (req, res) {
        var blockout = req.body;

        AppointmentService.scheduleBlockout(blockout)
            .then(function (result) {
                return res.json(200, result);
            })
            .catch(function (err) {
                return res.negotiate(err);
            });
    },

    book: function (req, res) {
        var apptForm = req.body;

        AppointmentService.book(apptForm)
            .then(function (results) {
                res.json(200, results);
                SmsEmailService.sendNewAppointmentCorrespondence(results.id);
            })
            .catch(function (err) {
                return res.negotiate(err);
            });
    },

    start: function (req, res) {
        var data = {};

        SpaServiceService.getServices()
            .then(function (services) {
                data.services = groupServices(services);
                EstheticianService.getEstheticians()
                    .then(function (estheticians) {
                        data.estheticians = estheticians.map(esth => ({ id: esth.id, name: esth.firstName, services: esth.services.map(svc => (svc.id)) }));
                        LocationService.getAll()
                            .then(function (locations) {
                                data.locations = locations;
                                res.json(200, data);
                            })
                    })
            })
            .catch(function (err) {
                res.negotiate(err);
            })
    }

};

function groupServices(services) {
    var hairRemoval = [];
    var chemicalPeel = [];
    var sprayTan = [];
    var microderm = [];
    var tinting = [];
    var facial = [];

    services.forEach(function (svc) {
        svc.isSelected = false;
        switch (svc.serviceType) {
            case "hairRemoval":
                hairRemoval.push(svc);
                break;
            case "facial":
                facial.push(svc);
                break;
            case "sprayTan":
                sprayTan.push(svc);
                break;
            case "chemicalPeel":
                chemicalPeel.push(svc);
                break;
            case "microderm":
                microderm.push(svc);
                break;
            case "tinting":
                tinting.push(svc);
                break;
        }
    });
    return {
        hairRemoval: hairRemoval,
        facial: facial,
        sprayTan: sprayTan,
        chemicalPeel: chemicalPeel,
        microderm: microderm,
        tinting: tinting
    }


}

