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
        unique: true,
        required: true,
        datetime: true,
        unique: true
      },

      endTime: {
        type: 'datetime',
        unique: true,
        required: true,
        datetime: true,
        unique: true
      },

      esthetician: {
          model: 'Esthetician'
      },

      businessDay : {
          model: 'BusinessDay'
      }
  }
};
