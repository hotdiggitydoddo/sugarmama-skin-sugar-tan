module.exports.schedule = {
    sailsInContext: true, //If sails is not as global and you want to have it in your task
    tasks: {
        firstTask: {
            cron: "00 17 * * *",
            task: function (context, sails) {
                var today = sails.moment();
                today.hour(8).minutes(00).seconds(00);

                var tomorrow = sails.moment(today).add(1, 'days');
                var followingDay = sails.moment(today).add(2, 'days');

                Appointment.find({ startTime: { '>': tomorrow.toDate(), '<': followingDay.toDate() }, isBlockout: false, or: [{ notifyByEmail: true }, { notifyByText: true }] })
                    .populate('esthetician')
                    .populate('services')
                    .populate('location')
                    .then(function (appts) {
                        appts.forEach(function (appt) {
                            linkEstheticianAndServices(appt)
                            .then(function(updatedAppt) {
                                appt = updatedAppt;
                                SmsEmailService.sendClientAppointmentReminder(appt);
                            })
                        })
                    })

            },
            context: {}
        }
    }
};

function linkEstheticianAndServices(appt) {
    var deferred = sails.q.defer();
    User.findOne({ id: appt.esthetician.user })
        .exec(function (err, user) {
            appt.esthetician.userInfo = user;
            appt.services = appt.services.map(function (svc) { return svc.name });
            return deferred.resolve(appt);
        })
    return deferred.promise;
}
