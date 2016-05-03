module.exports = {

    getAll: function () {
        var deferred = sails.q.defer();
        var results = [];
        Appointment.find().populate('services').populate('esthetician').populate('location')
            .then(function (appointments) {
                appointments.forEach(function (appt) {
                    var serviceData = [];

                    appt.services.forEach(function (svc) {
                        serviceData.push({ text: svc.name, value: svc.id });
                    });

                    var apptName = appt.name + " - ";
                    for (var x = 0; x < serviceData.length; x++) {
                        apptName += serviceData[x].text;
                        if (x != serviceData.length - 1)
                            apptName += ", "
                    }

                    results.push({
                        id: appt.id,
                        title: apptName,
                        phoneNumber: appt.phoneNumber,
                        estheticianId: appt.esthetician.id,
                        gender: appt.gender,
                        services: serviceData,
                        locationId: appt.location.id,
                        start: appt.startTime,
                        end: appt.endTime,
                        cost: appt.cost
                    });
                });
                deferred.resolve(results);
            })
            .catch(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    create: function (appt) {
        var serviceIds = [];
        var deferred = sails.q.defer();

        Esthetician.findOne({ id: appt.estheticianId })
            .then(function (esth) {
                appt.esthetician = esth
                return appt;
            })
            .then(function (appt) {
                return Location.findOne({ id: appt.locationId })
                    .then(function (loc) {
                        appt.location = loc;
                        return appt;
                    })
            })
            .then(function (appt) {
                return Service.find()
                    .then(function (services) {
                        appt.services.forEach(function (svc) {
                            serviceIds.push(svc.value);
                        });
                        var selectedServices = [];

                        services.forEach(function (svc) {
                            var isSelected = serviceIds.some(function (svcId) {
                                return svcId == svc.id;
                            });
                            if (isSelected)
                                selectedServices.push(svc);
                        });

                        appt.services = selectedServices;
                        return appt;
                    })
            })
            .then(function (appt) {
                return Appointment.create({
                    startTime: appt.start,
                    endTime: appt.end,
                    esthetician: appt.esthetician,
                    gender: appt.gender,
                    services: appt.services,
                    location: appt.location,
                    cost: 0,
                    phoneNumber: appt.phoneNumber,
                    name: appt.title
                })
                    .then(function (newAppt) {
                        var serviceData = [];
                        var apptName = newAppt.name + " - ";

                        appt.services.forEach(function (svc) {
                            serviceData.push({ text: svc.name, value: svc.id });
                        });

                        for (var x = 0; x < serviceData.length; x++) {
                            apptName += serviceData[x].text;
                            if (x != serviceData.length - 1)
                                apptName += ", "
                        }

                        var retVal = {
                            id: newAppt.id,
                            title: apptName,
                            estheticianId: newAppt.esthetician,
                            services: serviceData,
                            locationId: newAppt.location,
                            gender: appt.gender,
                            start: appt.start,
                            end: appt.end,
                            cost: newAppt.cost
                        }
                        deferred.resolve(retVal);
                    })
                    .catch(function (err) {
                        deferred.reject(err);
                    })
            })

        return deferred.promise;
    },

    update: function (appt) {
        var deferred = sails.q.defer();
        var serviceIds = [];
        var selectedServices = [];

        appt.services.forEach(function (svc) {
            serviceIds.push(parseInt(svc.value));
        });

        Appointment.findOne({ id: appt.id })
            .then(function (apptInDb) {
                apptInDb.startTime = appt.start;
                apptInDb.endTime = appt.end;
                apptInDb.phoneNumber = appt.phoneNumber;
                apptInDb.gender = appt.gender;
                return apptInDb;
            })
            .then(function (apptInDb) {
                return Service.find()
                    .then(function (services) {
                        appt.services.forEach(function (svc) {
                            serviceIds.push(svc.value);
                        });
                        var selectedServices = [];

                        services.forEach(function (svc) {
                            var isSelected = serviceIds.some(function (svcId) {
                                return svcId == svc.id;
                            });
                            if (isSelected)
                                selectedServices.push(svc);
                        });

                        apptInDb.services = selectedServices;
                        return apptInDb;
                    })
            })
            .then(function (apptInDb) {
                if (appt.estheticianId != apptInDb.esthetician) {
                    return Esthetician.findOne({ id: appt.estheticianId })
                        .then(function (newEsth) {
                            apptInDb.esthetician = newEsth;
                            return apptInDb;
                        })
                }
                return apptInDb;
            })
            .then(function (apptInDb) {
                if (appt.locationId != apptInDb.location) {
                    return Location.findOne({ id: appt.locationId })
                        .then(function (newLoc) {
                            apptInDb.location = newLoc.id;
                            return apptInDb;
                        })
                }
                else
                    return apptInDb;
            })
            .then(function (apptInDb) {
                return Appointment.update({ id: apptInDb.id }, apptInDb)
                    .then(function (updatedAppts) {
                        updatedAppts[0].services = apptInDb.services;
                        return updatedAppts[0];
                    })

            })
            .then(function (updated) {
                var serviceData = [];
                var apptName = updated.name + " - ";

                updated.services.forEach(function (svc) {
                    serviceData.push({ text: svc.name, value: svc.id });
                });

                for (var x = 0; x < serviceData.length; x++) {
                    apptName += serviceData[x].text;
                    if (x != serviceData.length - 1)
                        apptName += ", "
                }

                var retVal = {
                    id: updated.id,
                    title: apptName,
                    estheticianId: appt.estheticianId,
                    services: serviceData,
                    gender: appt.gender,
                    locationId: appt.locationId,
                    start: appt.start,
                    end: appt.end,
                    cost: updated.cost
                }
                deferred.resolve(retVal);
            })
        return deferred.promise;
    },

    destroy: function (appt) {
        var deferred = sails.q.defer();

        Appointment.destroy({ id: appt.id })
            .then(function (result) {
                console.log(result);
                deferred.resolve(result);
            })
            .catch(function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    },

    checkOpenings: function (apptRequest) {
        var deferred = sails.q.defer();
        var availableOpenings = [];
        var stdBufferTime = 15;

        var apptReqBufferTime = (apptRequest.selectedServices.length === 1 && apptRequest.selectedServices[0].quickService)
            ? 0
            : stdBufferTime;
        var apptDate = sails.moment(apptRequest.selectedDate);
        var businessDay = {};
        
        BusinessDay.findOne({ location: apptRequest.location, dayOfWeek: apptDate.format('dddd').toLowerCase() })
            .populate('shifts')
            .then(function (day) {
                if (!day)
                    return deferred.resolve(availableOpenings);
                else if (day.shifts.length === 0)
                    return deferred.resolve(availableOpenings);
                return day;
            })
            .then(function (day) {
                businessDay = day;
                
                var momBusinessDayOpen = sails.moment(day.openingTime)
                var momBusinessDayClose = sails.moment(day.closingTime)
                
                
            })


        return deferred.promise;

    }
}