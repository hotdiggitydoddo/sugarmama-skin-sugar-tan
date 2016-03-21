/**
 * ShiftsController
 *
 * @description :: Server-side logic for managing shifts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getByEsthetician: function (req, res) {
        EstheticianService.getEstheticianById(req.query.id)
            .then(function (esthetician) {
                console.log('here')
                return res.json(esthetician);
            })
            .catch(function (err) {
                res.send(500);
            });
    },
    
    save: function(req, res) {
        var shift = req.body;
        console.log(shift);
        //EstheticianService.saveShift(shift)
        res.send(200);
    }

};

