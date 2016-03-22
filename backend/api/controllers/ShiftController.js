/**
 * ShiftsController
 *
 * @description :: Server-side logic for managing shifts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
	getByEsthetician: function (req, res) {
        EstheticianService.getEstheticianById(req.query.id)
            .then(function (esthetician) {
                console.log('here')
                return res.json(esthetician);
            })
            .catch(function (err) {
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
            return res.status(400).send('End time can\'t be before start time.');
        
        EstheticianService.saveShift(shift);
        
        return res.send(200);
        
    }

};

