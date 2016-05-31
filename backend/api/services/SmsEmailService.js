module.exports = {
    sendNewAppointmentCorrespondence: function (apptId) {
        Appointment.findOne({ id: apptId })
            .populate('esthetician')
            .populate('services')
            .populate('location')
            .then(function (appt) {
                return User.findOne({ id: appt.esthetician.user })
                    .then(function (user) {
                        appt.esthetician.userInfo = user;
                        appt.services = appt.services.map(function (svc) { return svc.name });
                        return appt;
                    })
            })
            .then(function (appt) {
                //sendClientConfirmationEmail(appt);
                //sendEstheticianAppointmentNotification(appt);
            })

    }
}

/************* utility functions *****************/

function sendClientConfirmationEmail(appt) {
    sails.hooks.email.send(
        "appointmentConfirmation",
        {
            recipientName: appt.name,
            apptDate: sails.moment(appt.startTime).format('dddd, MMMM Do YYYY'),
            startTime: sails.moment(appt.startTime).format('h:mm a'),
            endTime: sails.moment(appt.endTime).format('h:mm a'),
            esthetician: appt.esthetician.userInfo.firstName,
            services: appt.services.toString(),
            location1: appt.location.streetAddress,
            location2: appt.location.city + ', ' + appt.location.state + ' ' + appt.location.zipCode
        },
        {
            to: appt.emailAddress,
            subject: "Appointment Confirmation - " + sails.moment(appt.startTime).format('ddd, MMMM Do YYYY @ h:mm a'),
            from: 'SugarMaMa Appointments <no-reply@sugarmamaskinsugartan.com>',
            attachments: [
                {
                    filename: 'sugarmama-symbol.png',
                    //path: '/home/ryan/sites/sugarmama-skin-sugar-tan/images/sugarmama-symbol.png',
                    path: '/home/ryan/code/sugarmama-skin-sugar-tan/frontend/src/client/images/sugarmama-symbol.png',
                    cid: 'symbol@sugarmamaskinsugartan.com'
                },
                {
                    filename: 'sugarmama-text.png',
                    //path: '/home/ryan/sites/sugarmama-skin-sugar-tan/images/sugarmama-text.png',
                    path: '/home/ryan/code/sugarmama-skin-sugar-tan/frontend/src/client/images/sugarmama-text.png',
                    cid: 'text@sugarmamaskinsugartan.com'
                }
            ]
        },
        function (err) {
            console.log(err || "It worked!");
        }
    );
}

function sendEstheticianAppointmentNotification(appt) {
    var accountSid = 'AC0bcf731c286612682b7f3936554688d8'; // Your Account SID from www.twilio.com/console
    var authToken = 'aee789df233150b74cac5441634bb8dd';   // Your Auth Token from www.twilio.com/console

    var client = new sails.twilio.RestClient(accountSid, authToken);

    client.messages.create({
        body: '----SugarMaMa New Appointment----\nDate: ' + sails.moment(appt.startTime).format('l') +'\n' + 'Time: ' + sails.moment(appt.startTime).format('h:mm a') + ' - ' + sails.moment(appt.endTime).format('h:mm a') + '\nLocation: ' + appt.location.city + '\nClient Name: ' + appt.name + '\nClient Phone: ' + appt.phoneNumber + '\nServices: ' + appt.services.toString(),
        
        to: '+16262785385',  // Text this number
        from: '+17143160399' // From a valid Twilio number
    }, function (err, message) {
        if (err) {
            console.error(err.message);
        }
    });
}

function toBase64(file) {
    var bmp = sails.fs.readFileSync(file);
    return new Buffer(bmp).toString('base64');
}