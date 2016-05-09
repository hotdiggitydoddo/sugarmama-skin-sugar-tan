/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get: function (req, res) {
        console.log('getting locations')

        LocationService.getAll()
            .then(function (locations) {
                res.json(locations);
            })
            .catch(function (err) {
                res.negotiate(err);
            });
    },
    
    getById: function(req, res) {
         LocationService.getById(req.query.id)
            .then(function(location) {
                return res.json(location);
            })
            .catch(function(err) {
                 res.negotiate(err);
            });
    },
    
    create: function (req, res) {
        var locationVm = req.body;

        LocationService.create(locationVm)
            .then(function (location) {
                res.ok(location);
            })
            .catch(function (err) {
                res.negotiate(err);
            })
    },
    
     update: function(req, res) {
        var locationVm = req.body;
        LocationService.update(locationVm)
            .then(function(updatedLoc) {
                console.log('updated location: ' + updatedLoc)
                res.ok(updatedLoc);
            })
            .catch(function(err) {
                res.negotiate(err);
            })
    },
};

