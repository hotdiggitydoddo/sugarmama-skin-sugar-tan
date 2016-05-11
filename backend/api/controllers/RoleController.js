/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getRolesForUser: function(req, res) {
       
       RoleService.getRolesForUser(req.query.id)
       .then(function(roles) {
           return res.json(roles);
       })
       .catch(function(err) {
           return res.negotiate(err);
       });
    }
};

