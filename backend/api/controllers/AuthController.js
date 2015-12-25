module.exports = {
    login: function(req, res) {
        var userVm = req.body;

        AuthService.loginUser(userVm, req.host)
        .then(function(success) {
            console.log(success);
            res.ok(success);
        })
        .catch(function(err) {
            res.negotiate(err);
        })
    }
};
