/**
 * BusinessDayController
 *
 * @description :: Server-side logic for managing Businessdays
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	  get: function (req, res) {
        console.log('getting businessDays')

        BusinessDayService.getAll()
            .then(function (businessDays) {
                return res.json(businessDays);
            })
            .catch(function (err) {
                res.send(500);
            });
    },
};
