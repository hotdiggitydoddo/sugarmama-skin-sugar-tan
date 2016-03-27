(function() {
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
            getShift: getShift,
            getShifts: getShifts,
            saveShift: saveShift,
            deleteShift: deleteShift
        };

        return service;

        function getEstheticians() {
            return $http.get('http://localhost:1337/esthetician/get/')
                .then(function(data, status, headers, config) {
                    return data.data;
                })
                .catch(function(message) {
                    logger.error(message.data);
                })
        }

        function getById(id) {
            return $http.get('http://localhost:1337/esthetician/getById?id=' + id)
                .then(function(data, status, headers, config) {
                    return data.data;
                })
                .catch(function(message) {
                    logger.error(message.data);
                })
        }

        function createEsthetician(estheticianData) {
            return $http.post('http://localhost:1337/esthetician/create', estheticianData)
                .then(function(data, status, headers, config) {
                    return data.data;
                })
                .catch(function(message) {
                    exception.catcher('XHR Failed for createEsthetician')(message);
                    //$location.url('/');
                })
        }

        function updateEsthetician(estheticianData) {
            return $http.post('http://localhost:1337/esthetician/update', estheticianData)
                .then(function(data, status, headers, config) {
                    return data.data;
                })
                .catch(function(message) {
                    exception.catcher('XHR Failed for createEsthetician')(message);
                    //$location.url('/');
                })
        }

        function getShift(shiftId) {
            return $http.get('http://localhost:1337/shift/getShift?shiftId=' + shiftId)
                .then(function(data, status, headers, config) {
                    var shift = data.data;
                    return shift;
                })
                .catch(function(message) {
                    logger.error(message.data);
                })
        }

        function getShifts(id) {
            return $http.get('http://localhost:1337/shift/getByEsthetician?id=' + id)
                .then(function(data, status, headers, config) {
                    return data.data;
                })
                .catch(function(message) {
                    logger.error(message.data);
                })
        }

        function saveShift(shiftData) {
            return $http.post('http://localhost:1337/shift/save', shiftData)
                .then(function(data, status, headers, config) {
                    var shift = data.data;
                    shift.startTime = moment(shift.startTime);
                    shift.endTime = moment(shift.endTime);
                    return shift;
                })
                .catch(function(message) {
                    if (message.data)
                        //    exception.catcher(message.data)(message);
                        throw (message);
                    //$location.url('/');
                })
        }

        function deleteShift(shiftId) {
            return $http.post('http://localhost:1337/shift/delete?id=' + shiftId)
                .then(function(data, status, headers, config) {
                    var shift = {
                        id: shiftId,
                        isDeleted: true
                    }
                    return shift;
                })
                .catch(function(message) {
                    logger.error(message.data);
                })
        }
    }
})();