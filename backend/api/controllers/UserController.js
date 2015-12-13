/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	hello: function(req, res) {
	    
	    Appointment.findOneById(1).populateAll().populate('esthetician.user').exec(function(err, appt) {
	        console.log(appt);
	         res.send(appt);
	    })
	   
	   
	}
};

