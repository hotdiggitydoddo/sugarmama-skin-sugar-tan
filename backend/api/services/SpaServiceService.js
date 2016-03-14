module.exports = {
    createService: function(newService) {
        var q = require('q');
        var deferred = q.defer();
        
        Service.create({
            name: newService.name,
            description: newService.description,
            quickService: newService.quickService,
            duration: newService.duration,
            cost: newService.cost,
            serviceType: newService.serviceType
        })
        .then(function(service) {
            deferred.resolve(service);
        })
        .catch(function(err) {
            deferred.reject(err);
        })
        
        return deferred.promise;
    },
    
    getServices: function() {
        var q = require('q');
        var deferred = q.defer();
        
        Service.find()
            .then(function(services) {
                deferred.resolve(services);                
            })
            .catch(function(err) {
               deferred.reject(err); 
            });
            
        return deferred.promise;
    }
}