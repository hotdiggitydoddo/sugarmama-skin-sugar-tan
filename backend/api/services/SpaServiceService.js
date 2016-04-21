module.exports = {
    createService: function(newService) {
        var deferred = sails.q.defer();

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
        var deferred = sails.q.defer();

        Service.find()
            .then(function(services) {
                deferred.resolve(services);
            })
            .catch(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getById: function(id) {
        var deferred = sails.q.defer();

        Service.findOne()
            .where({ id: id })
            .then(function(svc) {
                deferred.resolve(svc);
            })
            .catch(function(err) {
                deferred.reject(err);
            })

        return deferred.promise;
    },

    getWithIds: function(ids) {
        var deferred = sails.q.defer();
        var results = [];

        ids.forEach(function(id) {
            Service.findOne()
                .where({ id: id })
                .exec(function(err, svc) {
                    results.push(svc);
                })
        });
        deferred.resolve(results);
        
        return deferred.promise;
    }
}