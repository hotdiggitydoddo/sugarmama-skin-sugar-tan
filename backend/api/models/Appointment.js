000/**
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

    // client: {
    //   model: 'Client'
    // },
    
    // store client values on the appointment for now
    name: {
      type: 'string',
      required: true,
      maxLength: 50
    },

    phoneNumber: {
      type: 'string',
      size: 10,
      numeric: true
    },

    emailAddress: {
      type: 'email',
      maxLength: 50,
    },
    
    gender: {
      type: 'string',
      enum: ['female', 'male'],
      required: true,
    },
    // end client values

    cost: {
      type: 'float',
      decimal: true,
      float: true
    },

    location: {
      model: 'Location',
      required: true
    },

    duration: function (startTime) {
      return this.endTime - startTime;
    },
    
    isNoShow: {
      type: 'boolean',
    },
    
    isBlockout: {
      type: 'boolean',
    },
    
    notifyByText: {
      type: 'boolean',
    },
    
    notifyByEmail : {
      type: 'boolean',
    }
  },

  //   beforeCreate: function(values, cb) {
  //       //Appointment.find({ location: values.location, startTime: {} })
  //   }
};

