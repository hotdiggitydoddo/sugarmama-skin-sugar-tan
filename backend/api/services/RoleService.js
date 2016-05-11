module.exports = {
    getRolesForUser: function(userId) {
        var results = [];
        var deferred = sails.q.defer();
        
       User.findOne({id: userId})
       .populate('Roles')
       .then(function(user) {
           return deferred.resolve(user.roles);
       })
       .catch(function(err) {
           return deferred.reject(err);
       });
       
       return deferred.promise;
    }
}