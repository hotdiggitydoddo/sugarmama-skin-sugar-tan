(function () {
    'use strict';

    angular.module('app.about').controller('About', About);

    About.$inject = ['$state', 'logger'];

    function About($state, logger) {
        var vm = this;


        activate();

        function activate() {
           
        }

        // function gotoService(s) {
        // 	$state.go('service.detail', {id: s.id});
        // }
    }
})();