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
    get: function(req, res) {
        AppointmentService.getAll()
            .then(function(appointments) {
                return res.json(appointments);
            })
            .catch(function(err) {
                res.send(500);
            });
    },

    create: function(req, res) {
        var appt = req.query.models[0];
        EstheticianService.getEstheticianById(parseInt(9))
            .then(function(esth) {
                appt.esthetician = esth;
                AppointmentService.create(appt)
                    .then(function(newAppt) {
                        return res.ok(newAppt);
                    })
                    .catch(function(err) {
                        return res.negotiate(err);
                    })
            })
            .catch(function(err) {
                return res.negotiate(err);
            })
    },

    update: function(req, res) {
        console.log();
    },

    getEstheticians(req, res) {
        res.json(200, [
            { text: "Alicia", value: 1, color: "#ff00ff" },
            { text: "Bob", value: 2, color: "#51a0ed" },
            { text: "Charlie", value: 3, color: "#56ca85" }
        ])
    }
};

