(function () {
    'use strict';

    angular.module('app.about').controller('About', About);

    About.$inject = ['$state', 'logger'];

    function About($state, logger) {
        var vm = this;


        activate();

        function activate() {
            angular.element(document).ready(function () {
                $("#menu-toggle-wrapper").trigger('click');
            });
            logger.info('Activated About View');
        }

        // function gotoService(s) {
        // 	$state.go('service.detail', {id: s.id});
        // }
    }
})();