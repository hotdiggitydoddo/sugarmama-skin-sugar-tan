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
            unique: true
        },

        openingTime: {
            type: 'datetime',
            required: true
        },

        closingTime: {
            type: 'datetime',
            required: 'true'
        },

        shifts: {
            collection: 'Shift',
            via: 'businessDay'
        }
    }
};
