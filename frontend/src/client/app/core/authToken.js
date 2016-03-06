(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authToken', authToken);

    authToken.$inject = ['$window'];

    function authToken($window) {
        var _cachedToken = null;

        var _storage = $window.localStorage;

        var service = {
            setToken: setToken,
            getToken: getToken,
            clearToken: clearToken,
            isAuthenticated: isAuthenticated
        };

        return service;

        function setToken(token) {
            _cachedToken = token;
            _storage.setItem('authToken', token);
        }

        function getToken() {
            if (!_cachedToken)
                _cachedToken = _storage.getItem('authToken');
            return _cachedToken;
        }

        function clearToken() {
            _cachedToken = null;
            _storage.removeItem('authToken');
        }

        function isAuthenticated() {
            return !!getToken();
        }
    }
})();