var jwt = require('machinepack-jwt');

module.exports = function (req, res, next) {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({
            message: 'Authentication failed'
        });
    }
    
    var token = req.headers.authorization.split(' ')[1];

    jwt.decode({
        secret: 'abc123jdhs3h4js',
        token: token,
        schema: '*',
        algorithm: 'HS256',
    }).exec({
        // An unexpected error occurred.
        error: function (err) {
            return res.status(500).send({
                message: 'An unexpected error has occurred'
            })
        },
        // OK.
        success: function () {
            next();
        },
    });
};