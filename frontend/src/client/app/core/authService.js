(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$window', '$location', '$q', 'exception', 'logger', 'envService', 'user_roles'];

    function authService($window, $location, $q, exception, logger, envService, user_roles) {
        var apiUrl = envService.read('apiUrl');
        var _storage = $window.localStorage;

        var service = {
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            saveToken: saveToken,
            getToken: getToken,
            getRefreshToken: getRefreshToken,
            getAccessToken: getAccessToken,
            logout: logout,
            username: function() { return isAuthenticated() ? parseJwt(getToken(), "username") : null},
            firstName: function() { return isAuthenticated() ? parseJwt(getToken(), "firstName") : null },
            estheticianId: function () { return isAuthenticated() ? parseInt(parseJwt(getToken(), "estheticianId")) : null },
        };
        return service;

        function logout() {
            _storage.removeItem('smidt');
            _storage.removeItem('smrt');
            _storage.removeItem('smat');
        }

        function saveToken(authObj) {
            _storage['smidt'] = authObj.id_token;
            _storage['smrt'] = authObj.refresh_token;
            _storage['smat'] = authObj.access_token;
        }

        function getAccessToken() {
            return _storage['smat'];
        }

        function getToken() {
            return _storage['smidt'];
        }

        function getRefreshToken() {
            return _storage['smrt'];
        }

        function isAuthenticated() {
            var token = getToken();
            
            if (!token) return false;

            var values = parseJwt(token);
            return Math.round(new Date().getTime() / 1000) <= values.exp;
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles))
                authorizedRoles = [authorizedRoles];
            if (!isAuthenticated())
                return false;
            var authorized = false;
            authorizedRoles.forEach(function(role) {
                if (isInRole(role))
                    authorized = true
            })

            return authorized;
        }

        function parseJwt(token, key) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            var json =  JSON.parse($window.atob(base64));
            
            if (!key)
                return json;

            return json[key];
        }

        function isInRole(role) {
            var roles = parseJwt(getToken(), 'role');
            if (!Array.isArray(roles)) {
                var arr = [];
                arr.push(roles);
                roles = arr;
            }
            roles.forEach(function(part, index, roles) {
                 roles[index] = roles[index].toLowerCase();
            });
            return roles.indexOf(role.toLowerCase()) != -1; 
        }

    };
})();
