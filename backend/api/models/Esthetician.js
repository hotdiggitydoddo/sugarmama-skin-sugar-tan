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
<<<<<<< HEAD
        color: {
            type: 'string'
        },
        appointments: {
            collection: 'Appointment',
            via: 'esthetician'
        }
    }
};
=======

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
>>>>>>> 4e39c953f3da28b6c97cc1fe3014e3ffd69d0885
