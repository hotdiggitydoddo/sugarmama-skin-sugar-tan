(function () {
    'use strict';

    angular.module('app.admin.estheticians').controller('EstheticianDetail', EstheticianDetail);

    EstheticianDetail.$inject = ['$state', 'logger', 'estheticianService'];

    function EstheticianDetail($state, logger, estheticianService) {
        var vm = this;
        vm.esthetician = {}
        vm.title = 'add esthetician';
        activate();

        function activate() {
            return getEsthetician($state.params.id);
        }

        function getEsthetician(id) {
            estheticianService.getById(id)
                .then(function (data) {
                    vm.esthetician = data;
                    return vm.esthetician;
                })
        }
    }
})();