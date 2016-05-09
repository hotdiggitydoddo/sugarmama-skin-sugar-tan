/**
 * BusinessDayController
 *
 * @description :: Server-side logic for managing Businessdays
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//   get: function (req, res) {
    //     console.log('getting businessDays')

    //     BusinessDayService.getAll()
    //         .then(function (businessDays) {
    //             return res.json(businessDays);
    //         })
    //         .catch(function (err) {
    //             res.send(500);
    //         });
    // },
     getByLocation: function(req, res) {
          LocationService.getBusinessDaysByLocation(req.query.id)
            .then(function(businessDays) {
                return res.json(businessDays);
            })
            .catch(function(err) {
                return res.send(500);
            });
     },
     
     save: function(req, res) {
        var moment = sails.moment;
        var businessDay = req.body;
        console.log(businessDay);
        businessDay.openingTime = moment(businessDay.openingTime);
        businessDay.closingTime = moment(businessDay.closingTime);

        if (!businessDay.openingTime.isBefore(businessDay.closingTime))
            return res.status(403).send('Closing time can\'t be before opening time.');

        LocationService.saveBusinessDay(businessDay)
            .then(function(businessDay) {
                return res.json(businessDay);
            })
            .catch(function(err) {
                // if (err.name == "RangeError")
                //     return res.status(403).send('Another businessDay exists that would intersect with this one.');
                return res.negotiate(err);
            });
    },
};
