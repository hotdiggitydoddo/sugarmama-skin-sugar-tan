/**
 * AppointmentController
 *
 * @description :: Server-side logic for managing Appointments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // get: function(req, res) {
    //     res.json(200, [{
    //         id: 1,
    //         title: "Appt 1",
    //         start: '/Date(' + sails.moment('2016-04-05 09:30 UTC').valueOf() + ')/',
    //         end: '/Date(' + sails.moment('2016-04-05 11:30 UTC').valueOf() + ')/',
    //         phoneNumber: "No clue",
    //         // recurrenceId: { from: "RecurrenceID" },
    //         // recurrenceRule: { from: "RecurrenceRule" },
    //         // recurrenceException: { from: "RecurrenceException" },
    //         estheticianId: 1,
    //         isAllDay: false
    //     }])
    // },
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

        EstheticianService.getEstheticianById(parseInt(appt.estheticianId))
            .then(function (esth) {
                appt.esthetician = esth;
                return appt;
            })
            .then(function (appt) {
                var serviceIds = [];
                appt.services.forEach(function (apptSvc) {
                    serviceIds.push(parseInt(apptSvc.value));
                })

                SpaServiceService.getServices()
                    .then(function (services) {
                        appt.services = services;
                        return appt;
                    })
                return appt;
            })
            .then(function (appt) {
                AppointmentService.create(appt)
                    .then(function (newAppt) {
                        return res.json(200, newAppt);
                    })
                    .catch(function (err) {
                        return res.negotiate(err);
                    });
            });

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
    }
};

