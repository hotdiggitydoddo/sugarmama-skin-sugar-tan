(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$http', '$location', '$q', 'exception', 'logger', 'authToken', 'envService'];

    function authService($http, $location, $q, exception, logger, authToken, envService) {
        var apiUrl = envService.read('apiUrl');
        var _user;
        
        var service = {
            login: login,
            logout: logout,
            user: _user,
            isAuthenticated: isAuthenticated,
            isInRole: isInRole
        };

        return service;

        function login(loginData) {
            return $http.post(apiUrl + '/auth/login', loginData)
            .then(function(data, status, headers, config) {
                debugger;
                authToken.setToken(data.data.authInfo.token);
               _user = data.data;
                logger.success('Welcome back, ' + _user.firstName + '!');
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
        
        function isInRole(roleName) {
            return _user.roles.filter(function(role) {
                return r.name == roleName;
            });
        }
        
    };
})();
