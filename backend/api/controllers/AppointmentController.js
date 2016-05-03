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
                return res.json(200, newAppt);
            })
            .catch(function (err) {
                return res.negotiate(err);
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

    getLocations: function (req, res) {
        return res.json(200, [{ text: 'stanton', value: 1 }, { text: 'brea', value: 2 }])
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
    }

};

