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

                    var apptName = !appt.isBlockout ? appt.name + " - " : appt.name;
                    for (var x = 0; x < serviceData.length; x++) {
                        apptName += serviceData[x].text;
                        if (x != serviceData.length - 1)
                            apptName += ", "
                    }

                    if (!appt.esthetician) {
                        appt.esthetician = {
                            id: 0,
                            color: "000000"
                        }
                    }

                    results.push({
                        id: appt.id,
                        title: apptName,
                        phoneNumber: appt.phoneNumber,
                        estheticianId: appt.esthetician.id,
                        isBlockout: appt.isBlockout,
                        isNoShow: appt.isNoShow,
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

    getByEsthetician: function (esthId) {
        var appts = [];
        var deferred = sails.q.defer();
        var now = new Date();

        Appointment.find({ where: { esthetician: esthId, endTime: { '>=': now } }, sort: { startTime: 1 } })
            .populate('services')
            .populate('location')
            .then(function (appts) {
                deferred.resolve(appts);
            })
            .catch(function (err) {
                deferred.reject(err);
            })

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
                    name: appt.title,
                    isBlockout: false,
                    isNoShow: false
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
                            cost: newAppt.cost,
                            isBlockout: false,
                            isNoShow: false
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
        
        if (appt.title.indexOf('-') != -1) {
            appt.title = appt.title.substring(0, appt.title.indexOf('-')).trim();
        }
            
        
        Appointment.findOne({ id: appt.id })
            .then(function (apptInDb) {
                apptInDb.startTime = appt.start;
                apptInDb.endTime = appt.end;
                apptInDb.phoneNumber = appt.phoneNumber;
                apptInDb.gender = appt.gender;
                apptInDb.isNoShow = appt.isNoShow;
                apptInDb.name = appt.title;              
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
                            apptInDb.esthetician = newEsth.id;
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
                    cost: updated.cost,
                    isNoShow: updated.isNoShow,
                    isBlockout: updated.isBlockout
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

        var totalDuration = 0;
        apptRequest.selectedServices.forEach(function (svc) {
            totalDuration += svc.duration;
        });

        var momApptDate = sails.moment(apptRequest.selectedDate);
        var businessDay = {};

        BusinessDay.findOne({ location: apptRequest.location, dayOfWeek: momApptDate.format('dddd').toLowerCase() })
            .populate('shifts')
            .then(function (day) {
                if (!day)
                    return null;
                var selectedDate = new Date(apptRequest.selectedDate);
                day.shifts.forEach(function (shift) {
                    var currentStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(),
                        shift.startTime.getHours(), shift.startTime.getMinutes(), shift.startTime.getSeconds());
                    var currentEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(),
                        shift.endTime.getHours(), shift.endTime.getMinutes(), shift.endTime.getSeconds());

                    var shiftStart = sails.moment(currentStart)
                    var shiftEnd = sails.moment(currentEnd)

                    if (shiftEnd < shiftStart)
                        shiftEnd.add(1, 'day');

                    shift.startTime = shiftStart;
                    shift.endTime = shiftEnd;
                })
                return day;
            })
            .then(function (day) {
                if (!day)
                    return deferred.resolve(availableOpenings);
                else if (day.shifts.length === 0)
                    return deferred.resolve(availableOpenings);
                businessDay = day;
            }).then(function () {
                var d = sails.q.defer();
                businessDay.shifts.forEach(function (shift) {
                    return EstheticianService.getEstheticianById(shift.esthetician)
                        .then(function (esth) {
                            shift.esthetician = esth;
                            return d.resolve(shift);;
                        })
                })
                return d.promise;
            }).then(function () {
                return Appointment.find({ where: { location: businessDay.location }})
                    .populate('services')
                    .then(function (appts) {
                        return appts;
                    })
            }).then(function (appts) {
                var selectedDate = new Date(apptRequest.selectedDate);

                var openingTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(),
                    businessDay.openingTime.getHours(), businessDay.openingTime.getMinutes(), businessDay.openingTime.getSeconds());
                var closingTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(),
                    businessDay.closingTime.getHours(), businessDay.closingTime.getMinutes(), businessDay.closingTime.getSeconds());

                var businessDayOpen = sails.moment(openingTime)
                var businessDayClose = sails.moment(closingTime)

                if (businessDayClose < businessDayOpen)
                    businessDayClose.add(1, 'day');

                var possibleStart = businessDayOpen;
                var possibleEnd = sails.moment(possibleStart).add(totalDuration + apptReqBufferTime, 'minutes');

                while (possibleStart < businessDayClose && possibleEnd < businessDayClose) {
                    var timeSlot = {
                        start: sails.moment(possibleStart),
                        end: sails.moment(possibleEnd),
                    }

                    if (allowedToAdd(timeSlot, appts, apptReqBufferTime)) {

                        var shift = businessDay.shifts.find(x => timeSlot.start.isSameOrAfter(x.startTime) && timeSlot.end.isSameOrBefore(x.endTime))
                        var straddlesShifts = false;
                        
                        if (!shift || shift.length == 0) {
                            straddlesShifts = true;                            
                        }
                        else
                            timeSlot.esthetician = shift.esthetician.firstName.toLowerCase();
                            
                        timeSlot.end.add(-apptReqBufferTime, 'minutes');
                        if (!(straddlesShifts))
                            availableOpenings.push(timeSlot);
                    }

                    possibleStart.add(15, 'minutes');
                    possibleEnd.add(15, 'minutes');
                }

                return deferred.resolve(availableOpenings);
            })


        return deferred.promise;

    },

    scheduleBlockout: function (blockout) {
        var deferred = sails.q.defer();
        var location;
        blockout.selectedDate = new Date(blockout.selectedDate);
        blockout.startTime = new Date(blockout.startTime);
        blockout.endTime = new Date(blockout.endTime);

        var startDate = new Date(blockout.selectedDate.getFullYear(), blockout.selectedDate.getMonth(), blockout.selectedDate.getDate(),
            blockout.startTime.getHours(), blockout.startTime.getMinutes(), blockout.startTime.getSeconds());
        var endDate = new Date(blockout.selectedDate.getFullYear(), blockout.selectedDate.getMonth(), blockout.selectedDate.getDate(),
            blockout.endTime.getHours(), blockout.endTime.getMinutes(), blockout.endTime.getSeconds());

        var start = sails.moment(startDate)
        var end = sails.moment(endDate)

        if (end < start)
            end.add(1, 'day');

        Location.findOne({ id: blockout.location })
            .then(function (loc) {
                location = loc;
                return location;
            })
            .then(function () {
                return Appointment.create({
                    startTime: new Date(start),
                    endTime: new Date(end),
                    gender: 'female',
                    isBlockout: true,
                    location: location,
                    cost: 0,
                    name: '-- Blockout --'
                })
            })
            .then(function (appt) {
                if (appt)
                    return deferred.resolve("ok");
            })
            .catch(function (err) {
                console.log(err);
                return deferred.reject(err);
            });
        return deferred.promise;
    },

    book: function (apptForm) {
        var deferred = sails.q.defer();
        var appt = {};

        appt.services = apptForm.selectedServices.map(function (svc) { return svc.id; });
        appt.gender = apptForm.gender;
        appt.userInfo = apptForm.userInfo;
        appt.startTime = apptForm.startTime;
        appt.endTime = apptForm.endTime;
        appt.remindViaEmail = apptForm.remindViaEmail;
        appt.remindViaText = apptForm.remindViaText;

        getFinalCost(appt.services)
            .then(function (cost) {
                appt.cost = cost;
            })
            .then(function () {
                return getLocation(apptForm.location)
                    .then(function (locId) {
                        appt.location = locId;
                    })
            })
            .then(function () {
                return getEsthetician(apptForm.esthetician)
                    .then(function (esth) {
                        appt.esthetician = esth.id;
                    })
            })
            .then(function () {
                return saveAppt(appt)
                    .then(function (newAppt) {
                        deferred.resolve(newAppt);
                    })
            })

        return deferred.promise;
    }
}

function saveAppt(apptToSave) {
    var deferred = sails.q.defer();

    Appointment.create({
        startTime: apptToSave.startTime,
        endTime: apptToSave.endTime,
        esthetician: apptToSave.esthetician,
        gender: apptToSave.gender,
        services: apptToSave.services,
        location: apptToSave.location,
        cost: apptToSave.cost,
        phoneNumber: apptToSave.userInfo.phoneNumber,
        emailAddress: apptToSave.userInfo.emailAddress,
        name: apptToSave.userInfo.firstName,
        notifyByText: apptToSave.remindViaText,
        notifyByEmail: apptToSave.remindViaEmail,
        isBlockout: false,
        isNoShow: false
    })
        .then(function (newAppt) {
            deferred.resolve(newAppt);
        })
        .catch(function (err) {
            deferred.reject(err);
        })

    return deferred.promise;
}

function getEsthetician(estheticianName) {
    var deferred = sails.q.defer();

    User.findOne({ firstName: estheticianName.capitalize() })
        .exec(function (err, user) {
            Esthetician.findOne({ user: user.id })
                .exec(function (err, esth) {
                    deferred.resolve(esth);
                })
        })
    return deferred.promise;
}

function getLocation(selectedLoc) {
    var deferred = sails.q.defer();

    Location.findOne({ city: selectedLoc.capitalize() })
        .then(function (loc) {
            deferred.resolve(loc.id);
        })

    return deferred.promise;
}

function getFinalCost(svcIds) {
    var deferred = sails.q.defer();

    Service.find({ where: { id: svcIds }, select: ['cost'] }).sum('cost')
        .then(function (total) {
            deferred.resolve(total[0].cost);
        })

    return deferred.promise;
}


function allowedToAdd(timeSlot, appts, apptReqBufferTime) {
    var intersected = false;
    var now = sails.moment(new Date());

    if (timeSlot.start < sails.moment(now).add(1, 'hours')) return false;

    intersected = appts.some(function (appt) {
        var currentApptBufferTime = apptReqBufferTime;

        //check for quickService;
        if (appt.isBlockout || (appt.services.length === 1 && appt.services[0].quickService))
            currentApptBufferTime = 0;

        var currApptStart = sails.moment(appt.startTime);
        var currApptEnd = sails.moment(appt.endTime);

        return ((currApptStart < timeSlot.start && timeSlot.start < sails.moment(currApptEnd).add(currentApptBufferTime, 'minutes')) ||
            (currApptStart < timeSlot.end && timeSlot.end <= sails.moment(currApptEnd).add(currentApptBufferTime, 'minutes')) ||
            (timeSlot.start < currApptStart && currApptStart < sails.moment(timeSlot.end).add(apptReqBufferTime, 'minutes')) ||
            (timeSlot.start < sails.moment(currApptEnd).add(currentApptBufferTime, 'minutes')) &&
            sails.moment(currApptEnd).add(currentApptBufferTime, 'minutes') <= sails.moment(timeSlot.end).add(apptReqBufferTime, 'minutes'))
    });

    return !intersected;


    // appts.forEach(function (appt) {
    //     var currentApptBufferTime = apptReqBufferTime;

    //     if (appt.services.length === 1 && appt.services[0].quickService)
    //         currentApptBufferTime = 0;

    //     var currApptStart = sails.moment(appt.startTime);
    //     var currApptEnd = sails.moment(appt.endTime);

    //     if ((currApptStart < timeSlot.start && timeSlot.start < sails.moment(currApptEnd).add(currentApptBufferTime, 'minutes')) ||
    //         (currApptStart < timeSlot.end && timeSlot.end <= sails.moment(currApptEnd).add(currentApptBufferTime, 'minutes')) ||
    //         (timeSlot.start < currApptStart && currApptStart < sails.moment(timeSlot.end).add(apptReqBufferTime, 'minutes')) ||
    //         (timeSlot.start < sails.moment(currApptEnd).add(currentApptBufferTime, 'minutes')) &&
    //         sails.moment(currApptEnd).add(currentApptBufferTime, 'minutes') <= sails.moment(timeSlot.end).add(apptReqBufferTime, 'minutes')) {

    //         intersected = true;
    //     }
    // });
}
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}