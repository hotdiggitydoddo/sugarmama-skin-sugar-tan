/**
 * ShiftsController
 *
 * @description :: Server-side logic for managing shifts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getShift: function(req, res) {
        EstheticianService.getShift(req.query.shiftId)
            .then(function(shift) {
                console.log('got a shift');
                return res.json(shift);
            })
            .catch(function(err) {
                return res.send(500);
            });
    },

    getByEsthetician: function(req, res) {
        EstheticianService.getShiftsForEsthetician(req.query.id)
            .then(function(shifts) {
                console.log('here')
                return res.json(shifts);
            })
            .catch(function(err) {
                return res.send(500);
            });
    },

    save: function(req, res) {
        var moment = require('moment');
        var shift = req.body;
        console.log(shift);
        shift.startTime = moment(shift.startTime);
        shift.endTime = moment(shift.endTime);

        if (!shift.startTime.isBefore(shift.endTime))
            return res.status(403).send('End time can\'t be before start time.');

        EstheticianService.saveShift(shift)
            .then(function(shift) {
                return res.json(shift);
            })
            .catch(function(err) {
                if (err.name == "RangeError")
                    return res.status(403).send('Another shift exists that would intersect with this one.');
                return res.negotiate(err);
            });
    },
    
    delete: function(req, res) {
        EstheticianService.deleteShift(req.query.id)
            .then(function(id) {
                return res.json(id);
            })
            .catch(function(err) {
                return res.negotiate(err);
            });
    }

};

