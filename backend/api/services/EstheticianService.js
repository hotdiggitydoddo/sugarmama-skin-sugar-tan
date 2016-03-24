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

    saveShift: function(shift) {
        var self = this;
        var deferred = sails.q.defer();
        var result = {};

        BusinessDay.findOne({
            location: shift.location,
            dayOfWeek: shift.day
        }).populate('shifts')
            .then(function(businessDay) {
                if (businessDay.shifts.length == 0) {
                    return self.getEstheticianById(shift.estheticianId)
                        .then(function(esthetician) {
                            var start = new Date(shift.startTime);
                            var end = new Date(shift.endTime);

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
                                    deferred.reject(err);
                                });
                        })
                }
            });

        return deferred.promise;
    }
}
