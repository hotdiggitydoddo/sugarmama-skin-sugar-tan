/**
 * BusinessDay.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        dayOfWeek: {
            type: 'string',
            enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
            required: true,
        },

        openingTime: {
            type: 'time',
            required: true
        },

        closingTime: {
            type: 'time',
            required: true
        },

        shifts: {
            collection: 'Shift',
            via: 'businessDay'
        },
        
        location: {
            type: 'string',
            enum: ['stanton', 'brea'],
            required: true
        }
        
    },
    
    afterValidate: function (values, cb) {
        BusinessDay.findOne({
            location: values.location,
            dayOfWeek: values.dayOfWeek
        }).exec(function(err, itemInDb){
            if(err) return cb(err);
            if(itemInDb) return cb('Not unique');
            cb(null, values);
        });
    }
};
