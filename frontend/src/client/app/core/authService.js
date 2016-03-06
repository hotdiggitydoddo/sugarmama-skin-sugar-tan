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
            return $http.post('http://localhost:1337/auth/login', loginData)
            .then(function(data, status, headers, config) {
                authToken.setToken(data.data.token);
                _userName = data.userName;
                logger.success('Logged in!');
            })
            .catch(function(message) {
                logger.error(message.data);
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
