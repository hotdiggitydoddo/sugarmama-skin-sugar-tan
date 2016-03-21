(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('estheticianService', estheticianService);

    estheticianService.$inject = ['$http', '$location', '$q', '$window', 'exception', 'logger'];

    function estheticianService($http, $location, $q, $window, exception, logger) {

        var service = {
            getEstheticians: getEstheticians,
            createEsthetician: createEsthetician,
            updateEsthetician: updateEsthetician,
            getById: getById,
            getShifts: getShifts,
            saveShift: saveShift
        };

        return service;

        function getEstheticians() {
            return $http.get('http://localhost:1337/esthetician/get/')
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function getById(id) {
            return $http.get('http://localhost:1337/esthetician/getById?id=' + id)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function createEsthetician(estheticianData) {
            return $http.post('http://localhost:1337/esthetician/create', estheticianData)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    exception.catcher('XHR Failed for createEsthetician')(message);
                    //$location.url('/');
                })
        }
        
        function updateEsthetician(estheticianData) {
           return $http.post('http://localhost:1337/esthetician/update', estheticianData)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    exception.catcher('XHR Failed for createEsthetician')(message);
                    //$location.url('/');
                })
        }
        
        function getShifts(id) {
             return $http.get('http://localhost:1337/shift/getByEsthetician?id=' + id)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }
        
        function saveShift(shiftData) {
            debugger;
            return $http.post('http://localhost:1337/shift/save', shiftData)
                .then(function(data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    exception.catcher('XHR Failed for saveShift')(message);
                    //$location.url('/');
                })
        }
    }
})();