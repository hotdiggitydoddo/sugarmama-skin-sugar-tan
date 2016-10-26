(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('estheticianService', estheticianService);

    estheticianService.$inject = ['$http', '$location', '$q', '$window', 'exception', 'logger', 'envService'];

    function estheticianService($http, $location, $q, $window, exception, logger, envService) {
        var apiUrl = envService.read('apiUrl');
        var service = {
            getEstheticians: getEstheticians,
            createEsthetician: createEsthetician,
            updateEsthetician: updateEsthetician,
            deleteEsthetician: deleteEsthetician,
            getProfile: getProfile,
            getById: getById,
            getByEmail: getByEmail,
            getShift: getShift,
            getShifts: getShifts,
            saveShift: saveShift,
            deleteShift: deleteShift,
            getAppointments: getAppointments,
            getServiceRepertoire: getServiceRepertoire,
            saveRepertoire: saveRepertoire,
            changePassword: changePassword
        };

        return service;

        function getEstheticians() {
            return $http.get(apiUrl + '/estheticians')
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function getProfile() {
             return $http.get(apiUrl + '/estheticians/profile')
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function getById(id) {
            return $http.get(apiUrl + '/estheticians/' + id)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function getByEmail(email) {
            return $http.get(apiUrl + '/estheticians/' + email)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }



        function createEsthetician(estheticianData) {
            return $http.post(apiUrl + '/esthetician/create', estheticianData)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    exception.catcher('XHR Failed for createEsthetician')(message);
                    //$location.url('/');
                })
        }

        function updateEsthetician(estheticianData) {
            return $http.post(apiUrl + '/esthetician/update', estheticianData)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    exception.catcher('XHR Failed for createEsthetician')(message);
                    //$location.url('/');
                })
        }

        function deleteEsthetician(estheticianInfo) {
            return $http.post(apiUrl + '/esthetician/delete', { estheticianInfo: estheticianInfo })
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    if (message.data)
                        //    exception.catcher(message.data)(message);
                        throw (message);
                    //$location.url('/');
                })
        }

        function getShift(shiftId) {
            return $http.get(apiUrl + '/shifts/' + shiftId)
                .then(function (data, status, headers, config) {
                    var shift = data.data;
                    return shift;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function getShifts(id) {
            return $http.get(apiUrl + '/shifts/esthetician/' + id)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function saveShift(shiftData) {
            return $http.post(apiUrl + '/shift/save', shiftData)
                .then(function (data, status, headers, config) {
                    var shift = data.data;
                    shift.startTime = moment(shift.startTime);
                    shift.endTime = moment(shift.endTime);
                    return shift;
                })
                .catch(function (message) {
                    if (message.data)
                        //    exception.catcher(message.data)(message);
                        throw (message);
                    //$location.url('/');
                })
        }

        function deleteShift(shiftId) {
            return $http.post(apiUrl + '/shift/delete?id=' + shiftId)
                .then(function (data, status, headers, config) {
                    var shift = {
                        id: shiftId,
                        isDeleted: true
                    }
                    return shift;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function getAppointments(id) {
            return $http.get(apiUrl + '/estheticians/appointments?id=' + id)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function getServiceRepertoire(id) {
            return $http.get(apiUrl + '/service/getByEsthetician?id=' + id)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function saveRepertoire(repertoire) {
             return $http.post(apiUrl + '/service/saveRepertoire', repertoire)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function changePassword(changePasswordVm) {
            return $http.post(apiUrl + '/user/changepassword', changePasswordVm)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }
    }
})();