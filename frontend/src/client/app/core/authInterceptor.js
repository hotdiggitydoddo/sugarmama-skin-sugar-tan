(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['authService'];

    function authInterceptor(authService) {
        var service = {
            request: request,
            response: response
        };
        
        return service;
        
        function request(config) {
            if (!authService.isAuthenticated())
            {
                var token = authService.getToken();
            }
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        }
        
        function response(response) {
            angular.element(document).ready(function () {
                if ($("#menu-toggle-wrapper").hasClass('anim-out'))
                    $("#menu-toggle-wrapper").trigger('click');
            });

            if (response.data.id_token) {
                authService.saveToken(response.data);
            }

            return response;
        }
    }
})();