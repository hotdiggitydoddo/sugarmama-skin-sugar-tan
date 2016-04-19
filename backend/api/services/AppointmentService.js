module.exports = {

    getAll: function() {
        var deferred = sails.q.defer();
        var results = [];
        Appointment.find().populate('services').populate('esthetician')
            .then(function(appointments) {
                appointments.forEach(function(appt) {
                    results.push({
                        id: appt.id,
                        title: 'Appt 1',
                        estheticianId: appt.esthetician,
                        services: appt.services,
                        location: appt.location,
                        start: appt.startTime,
                        end: appt.endTime,
                        numberOfGuests: appt.numberOfGuests,
                        cost: appt.cost
                    });
                })
                deferred.resolve(results);
            })
            .catch(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    create: function(appt) {
        var serviceIds = [];

        var deferred = sails.q.defer();

        appt.services.forEach(function(svc) {
            serviceIds.push(parseInt(svc.value));
        });

        Appointment.create({
            startTime: new Date(appt.start),
            endTime: new Date(appt.end),
            //esthetician: appt.esthetician,//parseInt(appt.estheticianId),
            //services: serviceIds,
            location: 1
        })
            .then(function(newAppt) {
                deferred.resolve(newAppt);
            })
            .catch(function(err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }
}