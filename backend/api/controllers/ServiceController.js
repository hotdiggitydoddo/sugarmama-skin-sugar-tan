/**
 * ServiceController
 *
 * @description :: Server-side logic for managing Services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function (req, res) {
        SpaServiceService.getServices()
            .then(function(services) {
                return res.json(services);
            })
            .catch(function(err) {
                res.send(500);
            })
    },
    
    create: function(req, res) {
        var serviceVm = req.body;
        SpaServiceService.createService(serviceVm)
            .then(function(newService) {
                res.ok(newService);
            })
            .catch(function(err) {
                res.negotiate(err);
            })
    }
};

