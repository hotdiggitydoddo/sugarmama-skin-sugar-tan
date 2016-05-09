/**
 * Location.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      city: {
          type: 'string'
      },
      
      streetAddress: {
          type: 'string'
      },
      
      state: {
          type: 'string'
      },
      
      zipCode: {
          type: 'integer'
      },
      
      appointments: {
          collection: 'Appointment',
          via: 'location'
      },
      
      businessDays: {
          collection: 'BusinessDay',
          via: 'location'  
      }
  }
};

