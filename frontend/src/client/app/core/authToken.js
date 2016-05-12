(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authToken', authToken);

    authToken.$inject = ['$window'];

    function authToken($window) {
        var _cachedToken = null;
        var _cachedUserName = null;
        var _cachedRoles = null;
        var _storage = $window.localStorage;

        var service = {
            setToken: setToken,
            getToken: getToken,
            clearToken: clearToken,
            isAuthenticated: isAuthenticated,
            
            getUserName: getUserName,

            setRoles: setRoles,
            getRoles: getRoles,
            clearRoles: clearRoles,
            isAuthorized: isAuthorized
        };

        return service;

        function setToken(auth) {
            _cachedToken = auth.token;
            _cachedUserName = auth.userName;
            _storage.setItem('authToken', auth.token);
            _storage.setItem('userName', auth.userName);
        }

        function getToken() {
            if (!_cachedToken)
                _cachedToken = _storage.getItem('authToken');
            return _cachedToken;
        }
        
        function getUserName() {
            if (!_cachedUserName)
                _cachedUserName = _storage.getItem('userName');
            return _cachedUserName;
        }
        
        function clearToken() {
            _cachedToken = null;
            _storage.removeItem('authToken');
            _cachedUserName = null
            _storage.removeItem('userName');
        }

        function isAuthenticated() {
            return !!getToken();
        }

        /* ROLES */

        function setRoles(roles) {
            var roleNames = [];
            roles.forEach(function(role) {
                roleNames.push(role.name);
            });
            _cachedRoles = roleNames;
            _storage.setItem('roles', roleNames);
        }

        function getRoles() {
            if (!_cachedRoles)
                _cachedRoles = _storage.getItem('roles');
            return _cachedRoles;
        }

        function clearRoles() {
            _cachedRoles = null;
            _storage.removeItem('roles');
        }

        function isAuthorized(roles) {
            var userRoles = getRoles();
            if (!angular.isArray(userRoles))
                userRoles = [userRoles];
                
            var found = false;
            for (var i = 0; i < userRoles.length; i++) {
                if (roles.indexOf(userRoles[i]) > -1) {
                    found = true;
                    break;
                }
            }
            return found;
        }
    }
})();