/**
* Service.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      maxLength: 100,
      alpha: true,
      required: true
    },
    
    description: {
      type: 'string',
      required: true
    },
    
    quickService: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },
    
    premium: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },
    
    unisex: {
      type: 'boolean',
      defaultsTo: true,
      required: true
    },
    
    appointments: {
      collection: 'Appointment',
      via: 'services'
    },
    
    duration: {
      type: 'integer',
      required: true
    },
    
    cost: {
      type: 'float',
      decimal: true,
      float: true,
      required: true
    },
    
    serviceType: {
      type: 'string',
      enum: ['hairRemoval', 'sprayTan', 'facial', 'chemicalPeel', 
      , 'microderm', 'tinting']
    }
  }
};

