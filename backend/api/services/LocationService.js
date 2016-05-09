module.exports = {

    create: function (locationVm) {
        var deferred = sails.q.defer();
        Location.create({
            city: locationVm.city,
            streetAddress: locationVm.streetAddress,
            state: locationVm.state,
            zipCode: locationVm.zipCode
        })
            .then(function (newLocation) {
                deferred.resolve(newLocation);
            })
            .catch(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getAll: function () {
        var deferred = sails.q.defer();
        var results = [];

        Location.find()
            .populate('businessDays')
            .then(function (locations) {
                results = locations;
                deferred.resolve(results);
            })
            .catch(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getById: function (id) {
        var deferred = sails.q.defer();

        Location.findOne({
            id: id
        }).populate('businessDays')
            .then(function (location) {
                deferred.resolve(location);
            })
            .catch(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    update: function (locationVm) {
        var q = sails.q;
        var deferred = q.defer();

        Location.findOne({ id: locationVm.id })
            .then(function (existing) {
                existing.streetAddress = locationVm.streetAddress;
                existing.city = locationVm.city;
                existing.state = locationVm.state;
                existing.zipCode = locationVm.zipCode;

                existing.save(function (err, updated) {
                    if (err) {
                        deferred.reject(err)
                    } else {
                        deferred.resolve(existing);
                    }
                });
            })
            .catch(function (err) {
                console.log(err);
                deferred.reject(err.originalError);
            });
        return deferred.promise;
    },

    saveBusinessDay: function (businessDayVm) {
        var self = this;
        var deferred = sails.q.defer();
        var result = {};

        Location.findOne({
            id: businessDayVm.location
        })
            .then(function (location) {
                businessDayVm.location = location;

                if (businessDayVm.id > 0) {
                    BusinessDay.findOne({ id: businessDayVm.id })
                        .then(function (existing) {
                            existing.openingTime = new Date(businessDayVm.openingTime);
                            existing.closingTime = new Date(businessDayVm.closingTime);
                            existing.dayOfWeek = businessDayVm.dayOfWeek;
                            existing.location = businessDayVm.location;

                            existing.save(function (err, updated) {
                                if (err) {
                                    deferred.reject(err)
                                } else {
                                    deferred.resolve(existing);
                                }
                            });
                        })
                        .catch(function (err) {
                            console.log(err);
                            deferred.reject(err.originalError);
                        });
                } else {
                    BusinessDay.create({
                        openingTime: new Date(businessDayVm.openingTime),
                        closingTime: new Date(businessDayVm.closingTime),
                        dayOfWeek: businessDayVm.dayOfWeek,
                        location: businessDayVm.location
                    })
                        .then(function (newBusinessDay) {
                            result = newBusinessDay;
                            return deferred.resolve(result);
                        })
                        .catch(function (err) {
                            console.log(err);
                            return deferred.reject(err.originalError);
                        });
                }
            });

        return deferred.promise;
    },

    getBusinessDaysByLocation: function (id) {
        var deferred = sails.q.defer();
        var results = [];

        BusinessDay.find({ where: { location: id }, sort: { dayOfWeek: 1 } })
            .then(function (businessDays) {
                deferred.resolve(businessDays);
            })
            .catch(function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }


    //getAll: function () {
    //     var deferred = sails.q.defer();
    //     var results = [];
    //     BusinessDay.find().populate('location')
    //         .then(function (businessDays) {
    //             // estheticians.forEach(function(est) {
    //             //     results.push({
    //             //         id: est.id,
    //             //         firstName: est.user.firstName,
    //             //         lastName: est.user.lastName,
    //             //         email: est.user.emailAddress,
    //             //         color: est.color
    //             //     });
    //             // })
    //             deferred.resolve(businessDays);
    //         })
    //         .catch(function (err) {
    //             deferred.reject(err);
    //         });

    //     return deferred.promise;
    // }
}
