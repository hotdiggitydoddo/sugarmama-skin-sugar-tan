module.exports = {
    createUser: function(userVm) {
        var deferred = sails.q.defer();
        var Passwords = require('machinepack-passwords');
        // Encrypt a string using the BCrypt algorithm.
        Passwords.encryptPassword({
            password: userVm.password,
            difficulty: 10
        }).exec({
            error: function(err) {
                deferred.reject(err);
            },

            success: function(encryptedPassword) {
                User.create({
                    firstName: userVm.firstName,
                    lastName: userVm.lastName,
                    emailAddress: userVm.emailAddress,
                    phoneNumber: userVm.phoneNumber,
                    password: encryptedPassword
                })
                    .then(function(newUser) {
                        deferred.resolve(newUser);
                    })
                    .catch(function(err) {
                        deferred.reject(err);
                    })
            }
        })
        return deferred.promise;
    },

    getUserById: function(id) {
        var deferred = sails.q.defer();

        User.findOne()
            .where({ id: id })
            .then(function(user) {
                deferred.resolve(user);
            })
            .catch(function(err) {
                deferred.reject(err);
            })

        return deferred.promise;
    },
    
    getByEmail: function(email) {
        var deferred = sails.q.defer();

        User.findOne({ emailAddress: email })
            .populate('roles')
            .then(function(user) {
                deferred.resolve(user);
            })
            .catch(function(err) {
                deferred.reject(err);
            })

        return deferred.promise;
    },

    updateUser: function(userVm) {
        var q = sails.q;
        var deferred = q.defer();

        User.findOne({ id: userVm.id })
            .then(function(existing) {
                existing.emailAddress = userVm.email;
                existing.phoneNumber = userVm.phone;
                existing.save(function(err, updated) {
                    if (err) {
                        deferred.reject(err)
                    } else {
                        deferred.resolve(updated);
                    }
                });
            })
            .catch(function(err) {
                console.log(err);
                deferred.reject(err.originalError);
            });
           return deferred.promise;  
    }
}
