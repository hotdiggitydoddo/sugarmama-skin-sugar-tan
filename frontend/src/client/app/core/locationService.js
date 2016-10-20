(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('locationService', locationService);

    locationService.$inject = ['$http', '$location', '$q', '$window', 'exception', 'logger', 'envService'];

    function locationService($http, $location, $q, $window, exception, logger, envService) {

        var apiUrl = envService.read('apiUrl');

        var service = {
            getAll: getAll,
            getById: getById,
            createLocation: createLocation,
            updateLocation: updateLocation,
            saveBusinessDay: saveBusinessDay,
            getBusinessDays: getBusinessDays
        };

        return service;

        function getAll() {
            return $http.get(apiUrl + '/locations')
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function createLocation(location) {
            return $http.post(apiUrl + '/location/create', location)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    exception.catcher('Unable to create a new location!')(message);
                })
        }

        function getById(id) {
            return $http.get(apiUrl + '/location/getById?id=' + id)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function updateLocation(locationData) {
            return $http.post(apiUrl + '/location/update', locationData)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    exception.catcher('Failed to update the location!')(message);
                    //$location.url('/');
                })
        }

        // function getShift(shiftId) {
        //     return $http.get('http://localhost:1337/shift/getShift?shiftId=' + shiftId)
        //         .then(function(data, status, headers, config) {
        //             var shift = data.data;
        //             shift.startTime = moment(shift.startTime);
        //             shift.endTime = moment(shift.endTime);
        //             shift.location = moment.weekdays()[shift.location];

        //             return shift;
        //         })
        //         .catch(function(message) {
        //             logger.error(message.data);
        //         })
        // }

        function getBusinessDays(id) {
            return $http.get(apiUrl + '/businessDay/getByLocation?id=' + id)
                .then(function(data, status, headers, config) {
                    return data.data;
                })
                .catch(function(message) {
                    logger.error(message.data);
                })
        }

        function saveBusinessDay(businessDayData) {
            return $http.post(apiUrl + '/businessday/save', businessDayData)
                .then(function(data, status, headers, config) {
                    var businessDay = data.data;
                    return businessDay;
                })
                .catch(function(message) {
                    if (message.data)
                        //    exception.catcher(message.data)(message);
                        throw (message);
                    //$location.url('/');
                })
        }
    }
})();