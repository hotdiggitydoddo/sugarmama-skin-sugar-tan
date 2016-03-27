/**
* Shifts.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        startTime: {
            type: 'datetime',
            required: true
        },

        endTime: {
            type: 'datetime',
            required: true
        },

        esthetician: {
            model: 'Esthetician'
        },

        businessDay: {
            model: 'BusinessDay'
        },
    },

    beforeCreate: function(values, cb) {
        Shift.find({ businessDay: values.businessDay })
            .exec(function(err, shifts) {
                if (err) return cb(err);

                var intersects = false;

                shifts.forEach(function(shiftInDb) {
                    var shift1Start = sails.moment(shiftInDb.startTime);
                    var shift1End = sails.moment(shiftInDb.endTime);
                    var shift2Start = sails.moment(values.startTime);
                    var shift2End = sails.moment(values.endTime);

                    if (
                        (shift2Start.isSameOrAfter(shift1Start) && shift2Start.isBefore(shift1End)) ||
                        (shift2End.isSameOrBefore(shift1End) && shift2End.isAfter(shift1Start))
                    ) {
                        intersects = true;
                        return;
                    }
                });

                if (intersects) {
                    var err = new Error('intersection');
                    err.name = 'RangeError';
                    return cb(err);
                }

                cb(null, values);
            });
    },
    
    beforeUpdate: function(values, cb) {
        console.log('in shift update');
        Shift.find({ businessDay: values.businessDay, id: { '!': values.id }})
            .exec(function(err, shifts) {
                if (err) return cb(err);

                var intersects = false;

                shifts.forEach(function(shiftInDb) {
                    var shift1Start = sails.moment(shiftInDb.startTime);
                    var shift1End = sails.moment(shiftInDb.endTime);
                    var shift2Start = sails.moment(values.startTime);
                    var shift2End = sails.moment(values.endTime);

                    if (
                        (shift2Start.isSameOrAfter(shift1Start) && shift2Start.isBefore(shift1End)) ||
                        (shift2End.isSameOrBefore(shift1End) && shift2End.isAfter(shift1Start))
                    ) {
                        intersects = true;
                        return;
                    }
                });

                if (intersects) {
                    var err = new Error('intersection');
                    err.name = 'RangeError';
                    return cb(err);
                }

                cb(null, values);
            });
    }
};
