module.exports = {
    createService: function (newService) {
        var deferred = sails.q.defer();

        Service.create({
            name: newService.name,
            description: newService.description,
            quickService: newService.quickService,
            duration: newService.duration,
            cost: newService.cost,
            serviceType: newService.serviceType
        })
            .then(function (service) {
                deferred.resolve(service);
            })
            .catch(function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    },

    getServices: function () {
        var deferred = sails.q.defer();

        Service.find()
            .populate('estheticians')
            .then(function (services) {
                deferred.resolve(services);
            })
            .catch(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },

    getById: function (id) {
        var deferred = sails.q.defer();

        Service.findOne()
            .where({ id: id })
            .then(function (svc) {
                deferred.resolve(svc);
            })
            .catch(function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    },

    getWithIds: function (ids) {
        var deferred = sails.q.defer();
        var results = [];

        ids.forEach(function (id) {
            Service.findOne()
                .where({ id: id })
                .exec(function (err, svc) {
                    results.push(svc);
                })
        });
        deferred.resolve(results);

        return deferred.promise;
    },
    
    getByEsthetician: function (esthId) {
        var deferred = sails.q.defer();
        var results = [];

        Service.find()
            .populate('estheticians')
            .then(function (allServices) {
                var repertoire = allServices.map(service => {
                    return {
                        id: service.id,
                        name: service.name,
                        selected: service.estheticians.some(esth => { return esth.id == esthId })
                    }
                });
                deferred.resolve(repertoire);
            })
            .catch(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    },
    
    saveRepertoire: function (repertoire) {
        var deferred = sails.q.defer();

        Esthetician.findOne({ id: repertoire.estheticianId })
            .populate('services')
            .then(esth => {
                var selectedServices = repertoire.services.filter(repSvc => { return repSvc.selected }).map(svc => { return svc.id });
                return Esthetician.update({ id: esth.id }, { services: selectedServices })
                    .then(function (updated) {
                        deferred.resolve(updated[0]);
                    })
            })
            .catch(function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }
}

