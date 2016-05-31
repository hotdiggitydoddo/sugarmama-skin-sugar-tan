/**
 * Created by jaumard on 27/02/2015.
 */
module.exports.schedule = {
    sailsInContext: true, //If sails is not as global and you want to have it in your task
    tasks: {
        firstTask: {
            cron: "* * * * *",
            task: function (context, sails) {
                var tomorrow = sails.moment(new Date()).add(1, 'days');

                // Appointment.find({ startTime: { '>': tomorrow.toDate(), '<': sails.moment(tomorrow).add(1, 'days').toDate() } })
                //     .then(function (appts) {
                //         var a = appts;
                //     })

            },
            context: {}
        }
    }
};
