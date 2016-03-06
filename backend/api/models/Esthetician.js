/**
 * Esthetician.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        user: {
            model: 'User'
        },

        appointments: {
            collection: 'Appointment',
            via: 'esthetician'
        },

        shifts: {
            collection: 'Shift',
            via: 'esthetician'
        },

        color: {
            type: 'string'
        }
    }
};