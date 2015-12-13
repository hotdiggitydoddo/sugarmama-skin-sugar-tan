/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  types: {
    password: function(password) {
      return password === this.passwordConfirmation
    }
  },

  attributes: {
    firstName: {
      type: 'string',
      required: 'true',
      minLength: 2,
      maxLength: 25,
      alpha: true
    },
    
    lastName: {
      type: 'string',
      required: 'true',
      minLength: 2,
      maxLength: 25,
      alpha: true
    },
    
    emailAddress: {
      type: 'email',
      required: true,
      maxLength: 50,
      unique: true
    },
    
    password: {
      type: 'string',
      password: true,
      protected: true
    },
    
    passwordConfirmation: {
      type: 'string',
      protected: true
    },
    
    roles: {
      collection: 'Role',
      via: 'users'
    }
  }
};

