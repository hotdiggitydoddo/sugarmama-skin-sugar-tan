module.exports = {
    createUser: function (userVm) {
        var q = require('q');
        var deferred = q.defer();
        var Passwords = require('machinepack-passwords');
        // Encrypt a string using the BCrypt algorithm.
        Passwords.encryptPassword({
            password: userVm.password,
            difficulty: 10
        }).exec({
            error: function (err) {
                deferred.reject(err);
            },

            success: function (encryptedPassword) {
                User.create({
                        firstName: userVm.firstName,
                        lastName: userVm.lastName,
                        emailAddress: userVm.emailAddress,
                        password: encryptedPassword
                    })
                    .then(function (newUser) {
                        deferred.resolve(newUser);
                    })
                    .catch(function (err) {
                        deferred.reject(err);
                    })
            }
        })
        return deferred.promise;
    },
    
    getUserById: function(id) {
        var q = require('q');
        var deferred = q.defer();
        
        User.findOne()
        .where({ id: id }) 
        .then(function(user) {
            deferred.resolve(user);
        })
        .catch(function(err) {
            deferred.reject(err);
        })
       
        return deferred.promise;
    }
}
