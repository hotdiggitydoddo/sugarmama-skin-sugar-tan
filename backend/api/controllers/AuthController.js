module.exports = {
    login: function (req, res) {
        var userVm = req.body;
        var result = null;

        UserService.getByEmail(userVm.emailAddress)
            .then(function (user) {
                AuthService.loginUser(user, userVm.password, req.host)
                    .then(function (authInfo) {
                        authInfo.role = user.roles[0].name;
                        authInfo.firstName = user.firstName;
                        
                        //user.authInfo = authInfo;
                        //result = user;
                        if (authInfo.role == 'esthetician') {
                            return EstheticianService.getEstheticianByEmail(user.emailAddress)
                            .then(function(esth) {
                                authInfo.estheticianId = esth.id;
                                res.json(authInfo);
                            })
                        } else {
                          res.json(authInfo);
                        }
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
