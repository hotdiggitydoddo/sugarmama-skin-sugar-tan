module.exports = {

    getAll: function() {
        var deferred = sails.q.defer();
        var results = [];
        BusinessDay.find().populate('location')
            .then(function(businessDays) {
                // estheticians.forEach(function(est) {
                //     results.push({
                //         id: est.id,
                //         firstName: est.user.firstName,
                //         lastName: est.user.lastName,
                //         email: est.user.emailAddress,
                //         color: est.color
                //     });
                // })
                deferred.resolve(businessDays);
            })
            .catch(function(err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }
}
