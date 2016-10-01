(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('spaServiceService', spaServiceService);

    spaServiceService.$inject = ['$http', '$location', '$q', '$window', 'exception', 'logger', 'envService'];

    function spaServiceService($http, $location, $q, $window, exception, logger, envService) {
        var apiUrl = envService.read('apiUrl');
        var service = {
            getServices: getServices,
         //   createService: createService,
         //   updateService: updateService,
            getById: getById
        };

        return service;

        function getServices(byType) {
            return $http.get(apiUrl + '/spaservices?byType=' + byType)
                .then(function (data, status, headers, config) {
                    if (!byType)
                        return data.data;
                    
                    var services = data.data;
                    
                    var hairRemoval = services.hairRemoval;
                    var chemicalPeel = services.peels;
                    var sprayTan = services.tanning;
                    var microderm = services.microderm;
                    var tinting = services.tinting;
                    var facial = services.facials;

                    return {
                        hairRemoval: hairRemoval,
                        facial: facial,
                        sprayTan: sprayTan,
                        chemicalPeel: chemicalPeel,
                        microderm: microderm,
                        tinting: tinting
                    }
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        function getById(id) {
            return $http.get(apiUrl + '/service/getById?id=' + id)
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (message) {
                    logger.error(message.data);
                })
        }

        // function createEsthetician(serviceData) {
        //     return $http.post(apiUrl + '/service/create', serviceData)
        //         .then(function (data, status, headers, config) {
        //             return data.data;
        //         })
        //         .catch(function (message) {
        //             exception.catcher('XHR Failed for createService')(message);
        //             //$location.url('/');
        //         })
        // }
        
        // function updateEsthetician(serviceData) {
        //    return $http.post(apiUrl + '/service/update', serviceData)
        //         .then(function (data, status, headers, config) {
        //             return data.data;
        //         })
        //         .catch(function (message) {
        //             exception.catcher('XHR Failed for updateService')(message);
        //             //$location.url('/');
        //         })
        // }
    }
})();