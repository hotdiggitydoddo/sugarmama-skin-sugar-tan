module.exports = {
    createUser: function (userVm) {
        var deferred = sails.q.defer();
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
                    phoneNumber: userVm.phoneNumber,
                    password: encryptedPassword,
                    roles: userVm.roles
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

    getUserById: function (id) {
        var deferred = sails.q.defer();

        User.findOne()
            .where({ id: id })
            .then(function (user) {
                deferred.resolve(user);
            })
            .catch(function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    },

    getByEmail: function (email) {
        var deferred = sails.q.defer();

        User.findOne({ emailAddress: email })
            .populate('roles')
            .then(function (user) {
                deferred.resolve(user);
            })
            .catch(function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    },

    updateUser: function (userVm) {
        var deferred = sails.q.defer();

        User.findOne({ id: userVm.id })
            .then(function (existing) {
                existing.emailAddress = userVm.email;
                existing.phoneNumber = userVm.phone;
                existing.save(function (err, updated) {
                    if (err) {
                        deferred.reject(err)
                    } else {
                        deferred.resolve(updated);
                    }
                });
            })
            .catch(function (err) {
                console.log(err);
                deferred.reject(err.originalError);
            });
        return deferred.promise;
    },

    changePassword: function (changePasswordVm) {
        var deferred = sails.q.defer();
        var Passwords = require('machinepack-passwords');
        console.log('changepw: looking up user with id: ' + changePasswordVm.userId);
        User.findOne({ id: changePasswordVm.userId })
            .then(function (user) {
                if (changePasswordVm.isAdmin) {
                    return commitPasswordChange(user, changePasswordVm)
                        .then(function (result) {
                            deferred.resolve(result);
                        })
                        .catch(function (err) {
                            deferred.reject(err);
                        });
                } else {
                    Passwords.checkPassword({
                        passwordAttempt: changePasswordVm.password,
                        encryptedPassword: user.password
                    }).exec({
                        error: function (err) {
                            deferred.reject(err);
                        },

                        incorrect: function () {
                            deferred.reject('Your current password does not match the current password provided.');
                        },

                        success: function () {
                            commitPasswordChange(user, changePasswordVm)
                                .then(function (result) {
                                    deferred.resolve(result);
                                })
                                .catch(function (err) {
                                    deferred.reject(err);
                                })
                        }
                    });
                }
            })
            .catch(function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }
};

function commitPasswordChange(user, changePasswordVm) {
    var deferred = sails.q.defer();
    var Passwords = require('machinepack-passwords');
    // Encrypt a string using the BCrypt algorithm.
    console.log('encrypting new password: ' + changePasswordVm.newPassword)
    Passwords.encryptPassword({
        password: changePasswordVm.newPassword,
        difficulty: 10
    }).exec({
        error: function (err) {
            deferred.reject(err);
        },

        success: function (encryptedPassword) {
            user.password = encryptedPassword;
            user.save(function (err, updated) {
                if (err) {
                    deferred.reject(err)
                } else {
                    deferred.resolve("ok");
                }
            });
        }
    })
    return deferred.promise;
}