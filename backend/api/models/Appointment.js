/**
* Appointment.js
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
      datetime: true
    },
    
    endTime: {
      type: 'datetime',
      unique: true,
      required: true,
      datetime: true
    },
    
    services: {
      collection: 'Service',
      via: 'appointments'
    },
    
    esthetician: {
      model: 'Esthetician',
    },
    
    client: {
      model: 'Client'
    },
    
    numberOfGuests: {
      type: 'integer',
      required: true,
      defaultsTo: 1
    },
    
    cost: {
      type: 'float',
      decimal: true,
      float: true
    },
    
    
    
    duration: function(startTime) {
      return this.endTime - startTime;
    }
  }
};

