(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$http', '$location', '$q', 'exception', 'logger', 'authToken'];

    function authService($http, $location, $q, exception, logger, authToken) {
        var _userName;

        var service = {
            login: login,
            logout: logout,
            userName: _userName,
            isAuthenticated: isAuthenticated
        };

        return service;

        function login(loginData) {
            return $http.post('http://192.168.1.11:1337/auth/login', loginData)
            .then(function(data, status, headers, config) {
                authToken.setToken(data.data.token);
                _userName = data.userName;
                logger.success('Logged in!');
                
            })
            .catch(function(message) {
                if (message.status === -1) {
                        logger.error("Unable to communicate with the server.  Please notify tech support.")
                    } else {
                        logger.error(message.data);
                    }
                //throw({});
            })
        }

        function logout() {
            authToken.clearToken();
        }
        
        function isAuthenticated() {
            return authToken.isAuthenticated();
        }
        
    };
})();
