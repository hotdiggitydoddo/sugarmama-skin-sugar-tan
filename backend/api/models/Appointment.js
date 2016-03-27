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
      required: true,
      datetime: true
    },
    
    endTime: {
      type: 'datetime',
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
    
    location: {
        model: 'Location',
        required: true
    },
    
    duration: function(startTime) {
      return this.endTime - startTime;
    }
  },
  
  beforeCreate: function(values, cb) {
      Appointment.find({ location: values.location, startTime: {} })
  }
};

