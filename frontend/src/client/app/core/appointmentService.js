(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('appointmentService', appointmentService);

    appointmentService.$inject = ['$http', '$location', '$q', '$window', 'exception', 'logger', 'envService'];

    function appointmentService($http, $location, $q, $window, exception, logger, envService) {
       
        var apiUrl = envService.read('apiUrl');
        var service = {
            submitApptRequest: submitApptRequest,
            submitBlockout: submitBlockout
        };

        return service;

        function submitApptRequest(apptRequest) {
            return $http.post(apiUrl + '/appointment/submitrequest/', apptRequest)
                .then(function(data, status, headers, config) {
                    return data.data;
                })
                .catch(function(message) {
                    logger.error(message.data);
                })
        }
        
        function submitBlockout(blockout) {
            return $http.post(apiUrl + '/appointment/submitblockout/', blockout)
                .then(function(data, status, headers, config) {
                    return data.data;
                })
                .catch(function(message) {
                    logger.error(message.data);
                })
        }

        // function getById(id) {
        //     return $http.get('http://localhost:1337/esthetician/getById?id=' + id)
        //         .then(function(data, status, headers, config) {
        //             return data.data;
        //         })
        //         .catch(function(message) {
        //             logger.error(message.data);
        //         })
        // }

        // function createEsthetician(estheticianData) {
        //     return $http.post('http://localhost:1337/esthetician/create', estheticianData)
        //         .then(function(data, status, headers, config) {
        //             return data.data;
        //         })
        //         .catch(function(message) {
        //             exception.catcher('XHR Failed for createEsthetician')(message);
        //             //$location.url('/');
        //         })
        // }

        // function updateEsthetician(estheticianData) {
        //     return $http.post('http://localhost:1337/esthetician/update', estheticianData)
        //         .then(function(data, status, headers, config) {
        //             return data.data;
        //         })
        //         .catch(function(message) {
        //             exception.catcher('XHR Failed for createEsthetician')(message);
        //             //$location.url('/');
        //         })
        // }

        // function getShift(shiftId) {
        //     return $http.get('http://localhost:1337/shift/getShift?shiftId=' + shiftId)
        //         .then(function(data, status, headers, config) {
        //             var shift = data.data;
        //             shift.startTime = moment(shift.startTime);
        //             shift.endTime = moment(shift.endTime);
        //             shift.businessDay = moment.weekdays()[shift.businessDay];
                    
        //             return shift;
        //         })
        //         .catch(function(message) {
        //             logger.error(message.data);
        //         })
        // }

        // function getShifts(id) {
        //     return $http.get('http://localhost:1337/shift/getByEsthetician?id=' + id)
        //         .then(function(data, status, headers, config) {
        //             data.data.forEach(function(shift) {
        //                 // shift.startTime = moment(shift.startTime).format('h:mm a');
        //                 // shift.endTime = moment(shift.endTime).format('h:mm a');
        //                 // shift.businessDay = moment.weekdays()[shift.businessDay];
        //             });
        //             return data.data;
        //         })
        //         .catch(function(message) {
        //             logger.error(message.data);
        //         })
        // }

        // function saveShift(shiftData) {
        //     return $http.post('http://localhost:1337/shift/save', shiftData)
        //         .then(function(data, status, headers, config) {
        //             var shift = data.data;
        //             shift.startTime = moment(shift.startTime).format('h:mm a');
        //             shift.endTime = moment(shift.endTime).format('h:mm a');
        //             shift.businessDay = moment.weekdays()[shift.businessDay];
        //             return shift;
        //         })
        //         .catch(function(message) {
        //             if (message.data)
        //                 //    exception.catcher(message.data)(message);
        //                 throw (message);
        //             //$location.url('/');
        //         })
        // }
    }
})();