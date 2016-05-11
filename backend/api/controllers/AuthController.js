module.exports = {
    login: function (req, res) {
        var userVm = req.body;

        UserService.getByEmail(userVm.emailAddress)
            .then(function (user) {
                AuthService.loginUser(user, userVm.password, req.host)
                    .then(function (authInfo) {
                        user.authInfo = authInfo;
                        res.ok(user);
                    })
                    .catch(function (err) {
                        res.send(403, err);
                    })
            })
            .catch(function (err) {
                res.send(400, 'User not found.');
            });
    }
};
