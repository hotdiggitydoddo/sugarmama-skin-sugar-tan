(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$http', '$location', '$q', 'exception', 'logger', 'authToken', 'envService', 'user_roles'];

    function authService($http, $location, $q, exception, logger, authToken, envService, user_roles) {
        var apiUrl = envService.read('apiUrl');
        var _user;
        
        var service = {
            login: login,
            logout: logout,
            getUserName: getUserName,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
        };

        return service;

        function login(loginData) {
            return $http.post(apiUrl + '/auth/login', loginData)
            .then(function(data, status, headers, config) {
                _user = data.data;
                authToken.setToken(_user.authInfo);
                authToken.setRoles(_user.roles);
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
            authToken.clearRoles();
        }
        
        function isAuthenticated() {
            return authToken.isAuthenticated();
        }
        
        function isAuthorized(roles) {
            return authToken.isAuthorized(roles);
        }
        
        function getUserName() {
            return authToken.getUserName();
        }
    };
})();
