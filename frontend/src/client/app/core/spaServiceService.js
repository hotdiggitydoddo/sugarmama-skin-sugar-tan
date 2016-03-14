(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('spaServiceService', spaServiceService);

    spaServiceService.$inject = ['$http', '$location', '$q', '$window', 'exception', 'logger'];

    function spaServiceService($http, $location, $q, $window, exception, logger) {

        var service = {
            getServices: getServices,
            createService: createService,
            updateService: updateService,
            getById: getById
        };

        return service;

        function getServices() {
            return $http.get('http://localhost:1337/service/get/')
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function getById(id) {
            return $http.get('http://localhost:1337/service/getById?id=' + id)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function createEsthetician(serviceData) {
            return $http.post('http://localhost:1337/service/create', serviceData)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    exception.catcher('XHR Failed for createService')(message);
                    //$location.url('/');
                })
        }
        
        function updateEsthetician(serviceData) {
           return $http.post('http://localhost:1337/service/update', serviceData)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    exception.catcher('XHR Failed for updateService')(message);
                    //$location.url('/');
                })
        }
    }
})();