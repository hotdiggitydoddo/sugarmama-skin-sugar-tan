module.exports = {
    loginUser: function (userVm, hostname) {
        var q = require('q');
        var deferred = q.defer();
        var Passwords = require('machinepack-passwords');

        User.findOne({
                emailAddress: userVm.emailAddress
            })
            .then(function (foundUser) {
                if (!foundUser) {
                    deferred.reject('User not found.');
                    return deferred.promise;
                }
                Passwords.checkPassword({
                    passwordAttempt: userVm.password,
                    encryptedPassword: foundUser.password,
                }).exec({
                    error: function (err) {
                        deferred.reject(err);
                    },

                    incorrect: function () {
                        deferred.reject("Invalid password.");
                    },

                    success: function () {
                        createToken(foundUser, hostname)
                            .then(function (result) {
                                deferred.resolve(result);
                            })
                            .catch(function (err) {
                                deferred.reject(err);
                            })
                    }
                });
            })
            .catch(function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }
};

function createToken(user, hostname) {
    var JWT = require('machinepack-jwt');
    var q = require('q');
    var deferred = q.defer();

    var payload = {
        iss: hostname,
        sub: user.id
    };
    var returnVal = {};
    // Encode a JWT.
    JWT.encode({
        secret: 'abc123jdhs3h4js',
        payload: payload,
        algorithm: 'HS256',
        expires: 43200,
    }).exec({
        // An unexpected error occurred.
        error: function (err) {
            console.log(err);
            deferred.reject(err);
        },
        // OK.
        success: function (result) {
            returnVal.userName = user.emailAddress;
            returnVal.token = result;
            deferred.resolve(returnVal);
        },
    });
    return deferred.promise;
}