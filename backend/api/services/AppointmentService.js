module.exports = {

    getAll: function () {
        var deferred = sails.q.defer();
        var results = [];
        Appointment.find().populate('services').populate('esthetician')
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
                        services: serviceData,
                        location: appt.location,
                        start: appt.startTime,
                        end: appt.endTime,
                        numberOfGuests: appt.numberOfGuests,
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

        appt.services.forEach(function (svc) {
            serviceIds.push(parseInt(svc.value));
        });
        var selectedServices = [];

        Service.find()
            .then(function (services) {
                services.forEach(function (svc) {
                    var isSelected = serviceIds.some(function (svcId) {
                        return svcId == svc.id;
                    });

                    if (isSelected)
                        selectedServices.push(svc);
                });
                return selectedServices;
            })
            .then(function (selectedServices) {
                appt.services = selectedServices;
                return Appointment.create({
                    startTime: appt.start,
                    endTime: appt.end,
                    esthetician: appt.esthetician,
                    services: appt.services,
                    location: 1,
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
                            estheticianId: appt.esthetician.id,
                            services: serviceData,
                            location: appt.location,
                            start: appt.start,
                            end: appt.end,
                            numberOfGuests: newAppt.numberOfGuests,
                            cost: newAppt.cost
                        }
                        deferred.resolve(retVal);
                    })
                    .catch(function (err) {
                        deferred.reject(err);
                    })
            });

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
                return Service.find()
                    .then(function (services) {
                        services.forEach(function (svc) {
                            var isSelected = serviceIds.some(function (svcId) {
                                return svcId == svc.id;
                            });

                            if (isSelected)
                                selectedServices.push(svc);
                        });
                        return selectedServices;
                    })
                    .then(function (selectedServices) {
                        apptInDb.services = selectedServices;
                        return apptInDb;
                    })
                    .then(function (apptInDb) {
                        if (appt.estheticianId != apptInDb.esthetician) {
                            return Esthetician.findOne({ id: appt.estheticianId })
                                .then(function (newEsth) {
                                    appt.esthetician = newEsth;
                                    return appt;
                                })
                                .then(function (apptToUpdate) {
                                   return Appointment.update({ id: apptToUpdate.id }, apptToUpdate)
                                        .then(function (updatedAppts) {
                                            var updated = updatedAppts[0];
                                            var serviceData = [];
                                            var apptName = updated.name + " - ";

                                            apptInDb.services.forEach(function (svc) {
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
                                                location: appt.location,
                                                start: appt.start,
                                                end: appt.end,
                                                numberOfGuests: updated.numberOfGuests,
                                                cost: updated.cost
                                            }
                                            deferred.resolve(retVal);
                                        })
                                        .catch(function(err) {
                                            console.log(err);
                                            deferred.reject(err);
                                        })
                                })
                        } else {
                            return Appointment.update({ id: apptInDb.id }, apptInDb)
                                .then(function (updatedAppts) {
                                    var updated = updatedAppts[0];
                                    var serviceData = [];
                                    var apptName = updated.name + " - ";

                                    apptInDb.services.forEach(function (svc) {
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
                                        location: appt.location,
                                        start: appt.start,
                                        end: appt.end,
                                        numberOfGuests: updated.numberOfGuests,
                                        cost: updated.cost
                                    }
                                    deferred.resolve(retVal);
                                })
                        }
                    })
            })
        return deferred.promise;
    }
}