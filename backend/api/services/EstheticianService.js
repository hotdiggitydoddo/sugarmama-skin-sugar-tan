module.exports = {

    createEsthetician: function (newUser) {
        var deferred = sails.q.defer();

        Esthetician.create({
            user: newUser,
            color: UtilityService.getRandomHexValue(6)
        })
            .then(function (newEsthetician) {
                console.log('created:' + newEsthetician)
                UserService.getUserById(newEsthetician.user)
                    .then(function (user) {
                        newEsthetician.firstName = user.firstName;
                        newEsthetician.lastName = user.lastName;
                        newEsthetician.email = user.emailAddress;
                        deferred.resolve(newEsthetician);
                    })
            })
            .catch(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getEstheticians: function () {
        var deferred = sails.q.defer();
        var results = [];
        Esthetician.find().populate('user')
            .then(function (estheticians) {
                estheticians.forEach(function (est) {
                    results.push({
                        id: est.id,
                        firstName: est.user.firstName,
                        lastName: est.user.lastName,
                        email: est.user.emailAddress,
                        color: est.color
                    });
                })
                deferred.resolve(results);
            })
            .catch(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getEstheticianById: function (id) {
        var deferred = sails.q.defer();
        var result = {};
        console.log('getting est with id: ' + id);

        Esthetician.findOne({
            id: id
        })
            .populate('user')
            .populate('services')
            .then(function (esthetician) {
                console.log(esthetician);
                result = {
                    id: esthetician.id,
                    userId: esthetician.user.id,
                    phone: esthetician.user.phoneNumber,
                    firstName: esthetician.user.firstName,
                    lastName: esthetician.user.lastName,
                    email: esthetician.user.emailAddress,
                    color: esthetician.color
                };
                if (esthetician.services.length == 0) {
                    deferred.resolve(result);                    
                } else {
                    var services = esthetician.services.map(function(svc) { return { id: svc.id, name: svc.name };});
                    result.services = services;
                }
                deferred.resolve(result);
            })
            .catch(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getEstheticianByEmail: function (email, includeServices) {
        var deferred = sails.q.defer();
        var user = null;
        User.findOne({ emailAddress: email })
            .then(function (foundUser) {
                user = foundUser;
                return Esthetician.findOne({ user: user.id })
                    .then(function (esth) {
                        var result = {
                            id: esth.id,
                            userId: esth.user.id,
                            phone: user.phoneNumber,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.emailAddress,
                            color: esth.color
                        };
                        return deferred.resolve(result);
                    })
            })
            .catch(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    deleteEsthetician: function (estheticianInfo) {
        var self = this;
        var deferred = sails.q.defer();
        var result = null;

        Shift.destroy({ esthetician: estheticianInfo.id })
            .exec(function (err) {
                if (err) {
                    deferred.reject(err);
                }

                Esthetician.destroy({ id: estheticianInfo.id })
                    .exec(function (err) {
                        if (err) {
                            deferred.reject(err);
                        }

                        User.destroy({ id: estheticianInfo.userId })
                            .exec(function (err) {
                                if (err) {
                                    deferred.reject(err);
                                }

                                deferred.resolve(estheticianInfo);
                            })
                    })
            })
        return deferred.promise;
    },

    getShift: function (shiftId) {
        var self = this;
        var deferred = sails.q.defer();
        var result = {};

        Shift.findOne({ id: shiftId })
            .then(function (shifts) {
                deferred.resolve(shifts);
            })
            .catch(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getShiftsForEsthetician: function (id) {
        var self = this;
        var deferred = sails.q.defer();
        var result = {};

        Shift.find({ where: { esthetician: id }, sort: { businessDay: 0, startTime: 1 } })
            .populate('businessDay')
            .then(function (shifts) {
                if (shifts.length == 0)
                    return deferred.resolve(shifts);
                return self.getLocationInfo(shifts)
                    .then(function (s) {
                        deferred.resolve(s);
                    })
            })
            .catch(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    saveShift: function (shift) {
        var self = this;
        var deferred = sails.q.defer();
        var result = {};





        /*-----*/
        BusinessDay.findOne({ dayOfWeek: shift.businessDay.dayOfWeek, location: shift.businessDay.location.id })
            .populate('location')
            .then(function (businessDay) {
                return self.getEstheticianById(shift.esthetician)
                    .then(function (esthetician) {
                        var start = new Date(shift.startTime);
                        var end = new Date(shift.endTime);

                        if (shift.id > 0) {
                            Shift.findOne({ id: shift.id })
                                .then(function (existing) {
                                    existing.startTime = start;
                                    existing.endTime = end;
                                    existing.businessDay = businessDay;

                                    existing.save(function (err, updated) {
                                        if (err) {
                                            deferred.reject(err)
                                        } else {
                                            existing.businessDay = businessDay;
                                            deferred.resolve(existing);
                                        }
                                    });
                                })
                                .catch(function (err) {
                                    console.log(err);
                                    deferred.reject(err.originalError);
                                });
                        } else {
                            Shift.create({
                                startTime: start,
                                endTime: end,
                                businessDay: businessDay,
                                esthetician: esthetician
                            })
                                .then(function (newShift) {
                                    newShift.businessDay = businessDay;
                                    result = newShift;
                                    deferred.resolve(result);
                                })
                                .catch(function (err) {
                                    console.log(err);
                                    deferred.reject(err.originalError);
                                });
                        }
                    })
            });

        return deferred.promise;
    },

    deleteShift: function (shiftId) {
        var self = this;
        var deferred = sails.q.defer();
        var result = {};

        Shift.destroy({ id: shiftId })
            .then(function () {
                deferred.resolve(shiftId);
            })
            .catch(function (err) {
                console.log(err);
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getLocationInfo: function (shifts) {
        var self = this;
        var deferred = sails.q.defer();
        var result = {};
        var count = shifts.length;


        shifts.forEach(function (shift) {
            if (shift.businessDay) {
                Location.findOne({ id: shift.businessDay.location })
                    .then(function (location) {
                        shift.businessDay.location = location
                        count--;
                        if (count === 0)
                            deferred.resolve(shifts);
                    })
                    .catch(function (err) {
                        deferred.reject(err);
                    })
            } else {
                deferred.resolve(shifts);
            }
        });

        return deferred.promise;
    }
}

