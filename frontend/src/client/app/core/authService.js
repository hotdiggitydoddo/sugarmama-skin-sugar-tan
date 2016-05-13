(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$http', '$window', '$location', '$q', 'exception', 'logger', 'authToken', 'envService', 'user_roles'];

    function authService($http, $window, $location, $q, exception, logger, authToken, envService, user_roles) {
        var apiUrl = envService.read('apiUrl');
        var username = '';
        var _isAuthenticated = false;
        var role = '';
        var estheticianId;
        var authToken;
        var LOCAL_TOKEN_KEY = '$4m2m';
        var _storage = $window.localStorage;

        var service = {
            login: login,
            logout: logout,
            isAuthenticated: function () { return _isAuthenticated },
            isAuthorized: isAuthorized,
            estheticianId: function () { return estheticianId }
        };

        loadUserCredentials();

        return service;

        function loadUserCredentials() {
            var token = _storage.getItem(LOCAL_TOKEN_KEY);
            if (token)
                useCredentials(token);
        }

        function storeUserCredentials(token) {
            _storage.setItem(LOCAL_TOKEN_KEY, token);
            useCredentials(token);
        }

        function useCredentials(token) {
            var tokenized = token.split('|');
            username = tokenized[0];
            var roleFromServer = tokenized[1];
            var esthId = tokenized[2];
            var enc = tokenized[3]
            _isAuthenticated = true;
            authToken = token;

            if (roleFromServer == 'admin')
                role = user_roles.admin;
            if (roleFromServer == 'esthetician')
                role = user_roles.esthetician;
            if (roleFromServer == 'owner')
                role = user_roles.owner;

            if (esthId != '*')
                estheticianId = esthId;

            $http.defaults.headers.common.Authorization = 'Bearer ' + enc;
        }

        function destroyUserCredentials() {
            authToken = undefined;
            username = '';
            _isAuthenticated = false;
            estheticianId = undefined;
            role = '';
            $http.defaults.headers.common.Authorization = undefined;
            _storage.removeItem(LOCAL_TOKEN_KEY);
        }

        function login(loginData) {
            return $http.post(apiUrl + '/auth/login', loginData)
                .then(function (data, status, headers, config) {
                    var authInfo = data.data;
                    if (authInfo.estheticianId) {
                        storeUserCredentials(authInfo.userName + '|' + authInfo.role + '|' +
                            authInfo.estheticianId + '|' + authInfo.token);
                    } else {
                        storeUserCredentials(authInfo.userName + '|' + authInfo.role + '|' + '*' + '|' + authInfo.token);
                    }

                    logger.success('Welcome back, ' + authInfo.firstName + '!');

                    if (authInfo.estheticianId)
                        return authInfo.estheticianId;
                })
                .catch(function (message) {
                    if (message.status === -1) {
                        logger.error("Unable to communicate with the server.  Please notify tech support.");
                        return -1;
                    } else {
                        logger.error(message.data);
                        return -1;
                    }
                });
        }

        function logout() {
            destroyUserCredentials();
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles))
                authorizedRoles = [authorizedRoles];

            return (_isAuthenticated && authorizedRoles.indexOf(role) != -1);
        }
    };
})();
