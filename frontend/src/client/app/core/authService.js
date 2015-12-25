(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$http', '$location', '$q', '$window', 'exception', 'logger'];

    function authService($http, $location, $q, $window, exception, logger) {

        var _isAuthenticated = false;
        var _cachedToken;
        var _userName;

        var service = {
            login: login,
            logout: logout,
            isAuthenticated : function() { return $window.sessionStorage.token != null; },
            token: _cachedToken,
            userName: _userName
        };

        return service;

        function login(loginData) {
            return $http.post('http://localhost:1337/auth/login', loginData)
            .then(function(data, status, headers, config) {
                $window.sessionStorage.token = data.data.token
                _isAuthenticated = true;
                _userName = data.userName;
                _cachedToken = data.token;
                logger.success('Logged in!');
            })
            .catch(function(message) {
                _isAuthenticated = false;
                delete $window.sessionStorage.token;
                logger.error(message.data);
            })
        }

        function logout() {
            _isAuthenticated = false;
            delete $window.sessionStorage.token;
        }
    };
})();
