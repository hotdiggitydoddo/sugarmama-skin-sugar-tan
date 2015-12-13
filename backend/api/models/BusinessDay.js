/**
* BusinessDay.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    
    DayOfWeek: {
      type: 'string',
      enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      required: true
    },
    
    OpeningTime : {
      type: 'datetime',
      required: true
    },
    
    ClosingTime: {
      type: 'datetime',
      required: 'true'
    }
  }
};

