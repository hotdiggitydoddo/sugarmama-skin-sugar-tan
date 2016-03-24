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

      businessDay : {
          model: 'BusinessDay'
      },
  }
};
