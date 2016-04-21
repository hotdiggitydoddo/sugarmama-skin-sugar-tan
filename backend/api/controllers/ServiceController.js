/**
 * ServiceController
 *
 * @description :: Server-side logic for managing Services
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    get: function(req, res) {
        var results = [];
        
        SpaServiceService.getServices()
            .then(function(services) {
                services.forEach(function(svc){
                   results.push({ text: svc.name, value: svc.id }) 
                });        
                
                return res.json(200, results);
                
                // return res.json(200, [
                //     { text: "Upper Lip", value: 1 },
                //     { text: "Back", value: 2 },
                //     { text: "Leg", value: 3 },
                //     { text: "Lashes", value: 4 },
                //     { text: "Facial", value: 5 },
                //     { text: "Braz", value: 6 },
                // ]);
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

