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

    getByEsthetician: function (id) {
        var deferred = sails.q.defer();
        var results = [];

        Service.find()
            .populate('availableEstheticians')
            .then(function (allServices) {
                var repertoire = allServices.map(service => {
                    return {
                        id: service.id,
                        name: service.name,
                        selected: service.availableEstheticians.some(esth => { esth.id == id })
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

        Service.find()
            .populate('availableEstheticians')
            .then(function (allServices) {
                allServices.forEach(service => {
                    var repertoireService = repertoire.services.filter(repSvc => { return repSvc.id == service.id })[0];
                    if (repertoireService.selected)
                        service.availableEstheticians.push(parseInt(repertoire.estheticianId));
                    else
                        service.availableEstheticians.slice(allServices.indexOf(service), 1);
                });
                var ids = allServices.map(svc => { return svc.id });
                Service.update({}, { availableEstheticians: allServices.map(svc => { return svc.availableEstheticians }) })
                    .then(function (updated) {
                        deferred.resolve();
                    })
                    .catch(function (err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            })
            .catch(function (err) {
                deferred.reject(err);
            });
        return deferred.promise;
    }
}

