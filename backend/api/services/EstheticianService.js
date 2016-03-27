module.exports = {

    createEsthetician: function(newUser) {
        var deferred = sails.q.defer();

        Esthetician.create({
            user: newUser,
            color: UtilityService.getRandomHexValue(6)
        })
            .then(function(newEsthetician) {
                console.log('created:' + newEsthetician)
                UserService.getUserById(newEsthetician.user)
                    .then(function(user) {
                        newEsthetician.firstName = user.firstName;
                        newEsthetician.lastName = user.lastName;
                        newEsthetician.email = user.emailAddress;
                        deferred.resolve(newEsthetician);
                    })
            })
            .catch(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getEstheticians: function() {
        var deferred = sails.q.defer();
        var results = [];
        Esthetician.find().populate('user')
            .then(function(estheticians) {
                estheticians.forEach(function(est) {
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
            .catch(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getEstheticianById: function(id) {
        var deferred = sails.q.defer();
        var result = {};
        console.log('getting est with id: ' + id);

        Esthetician.findOne({
            id: id
        }).populate('user')
            .then(function(esthetician) {
                console.log(esthetician);
                result = {
                    id: esthetician.id,
                    firstName: esthetician.user.firstName,
                    lastName: esthetician.user.lastName,
                    email: esthetician.user.emailAddress,
                    color: esthetician.color,
                };
                deferred.resolve(result);
            })
            .catch(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getShift: function(shiftId) {
        var self = this;
        var deferred = sails.q.defer();
        var result = {};

        Shift.findOne({ id: shiftId })
            .then(function(shifts) {
                deferred.resolve(shifts);
            })
            .catch(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getShiftsForEsthetician: function(id) {
        var self = this;
        var deferred = sails.q.defer();
        var result = {};

        Shift.find({ where: { esthetician: id }, sort: { businessDay: 0, startTime: 1 } })
            .populate('businessDay')
            .then(function(shifts) {
                return self.getLocationInfo(shifts)
                    .then(function(s) {
                        deferred.resolve(s);
                    })
            })
            .catch(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    saveShift: function(shift) {
        var self = this;
        var deferred = sails.q.defer();
        var result = {};

        BusinessDay.findOne({
            id: shift.businessDay.id
        }).then(function(businessDay) {
            return self.getEstheticianById(shift.esthetician)
                .then(function(esthetician) {
                    var start = new Date(shift.startTime);
                    var end = new Date(shift.endTime);

                    if (shift.id > 0) {
                        Shift.findOne({ id: shift.id })
                            .then(function(existing) {
                                existing.startTime = start;
                                existing.endTime = end;
                                existing.businessDay = businessDay;

                                existing.save(function(err, updated) {
                                    if (err) {
                                        deferred.reject(err)
                                    } else {
                                        deferred.resolve(existing);
                                    }
                                });
                            })
                            .catch(function(err) {
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
                            .then(function(newShift) {
                                result = newShift;
                                deferred.resolve(result);
                            })
                            .catch(function(err) {
                                console.log(err);
                                deferred.reject(err.originalError);
                            });
                    }
                })
        });

        return deferred.promise;
    },

    deleteShift: function(shiftId) {
        var self = this;
        var deferred = sails.q.defer();
        var result = {};

        Shift.destroy({ id: shiftId })
            .then(function() {
                deferred.resolve(shiftId);
            })
            .catch(function(err) {
                console.log(err);
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getLocationInfo: function(shifts) {
        var self = this;
        var deferred = sails.q.defer();
        var result = {};
        var count = shifts.length;


        shifts.forEach(function(shift) {
            Location.findOne({ id: shift.businessDay.location })
                .then(function(location) {
                    shift.businessDay.location = location
                    count--;
                    if (count === 0)
                        deferred.resolve(shifts);
                })
        });

        return deferred.promise;
    }
}
