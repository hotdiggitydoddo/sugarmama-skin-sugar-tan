(function () {
    'use strict';

    angular
        .module('app.accounts')
        .factory('accountService', accountService);

    accountService.$inject = ['$http', '$window', '$location', '$q', 'exception', 'logger', 'envService', 'authService', 'user_roles'];

    function accountService($http, $window, $location, $q, exception, logger, envService, authService, user_roles) {
        var apiUrl = envService.read('apiUrl');
        //var username = '';
        //var firstName = '';
        //var estheticianId;

        var service = {
            login: login,
            logout: logout,
            register: register,
            username: function() { return isAuthenticated() ? parseJwt(getToken(), "username") : null},
            firstName: function() { return isAuthenticated() ? parseJwt(getToken(), "firstName") : null }
        };

        //loadUserCredentials();

        return service;

        function login(loginData) {
             return $http({
                method: 'POST',
                url: apiUrl + '/token',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    grant_type: 'password', 
                    username: loginData.emailAddress, 
                    password: loginData.password,
                    scope: 'openid offline_access'
                }
            }).then(function (data, status, headers, config) {
                
                logger.success('Welcome back, ' + authService.firstName() + '!');
                
                // if (authInfo.estheticianId) {
                //     storeUserCredentials(authInfo.firstName + '|' + authInfo.userName + '|' + authInfo.role + '|' +
                //         authInfo.estheticianId + '|' + authInfo.token);
                // } else {
                //     storeUserCredentials(authInfo.firstName + '|' + authInfo.userName + '|' + authInfo.role + '|' + '*' + '|' + authInfo.token);
                // }
                var estheticianId = authService.estheticianId();
                if (estheticianId)
                    return estheticianId;
                })
            .catch(function (message) {
                if (message.status === -1) {
                    logger.error("Unable to communicate with the server.  Please notify tech support.");
                    return -1;
                } else {
                    logger.error(message.data.error_description);
                    return -1;
                }
            });
        }

        function logout() {
            destroyUserCredentials();
        }

        function register() {
            
        }

        

        // function loadUserCredentials() {
        //     var token = _storage.getItem(LOCAL_TOKEN_KEY);
        //     if (token)
        //         useCredentials(token);
        // }

        function destroyUserCredentials() {
            // authToken = undefined;
            // username = '';
            // _isAuthenticated = false;
            // estheticianId = undefined;
            // role = '';
            //$http.defaults.headers.common.Authorization = undefined;
            _storage.removeItem(LOCAL_TOKEN_KEY);
        }

        

        // function isAuthenticated() {
        //     var token = getToken();
            
        //     if (!token) return false;

        //     var values = parseJwt(token);
        //     return Math.round(new Date().getTime() / 1000) <= values.exp;
        // }

        // function isAuthorized(authorizedRoles) {
        //     if (!angular.isArray(authorizedRoles))
        //         authorizedRoles = [authorizedRoles];

        //     return (isAuthenticated() && parseJwt(getToken()).roles.indexOf(role) != -1);
        // }
    }
})();
