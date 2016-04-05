(function () {
    'use strict';

    angular.module('app.admin.estheticians').controller('AddEsthetician', AddEsthetician);

    AddEsthetician.$inject = ['$state', 'logger', 'estheticianService', '$uibModalInstance'];

    function AddEsthetician($state, logger, estheticianService, $uibModalInstance) {
        var vm = this;
        vm.addEstheticianForm = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            phoneNumber: "",
            formSubmitted: false,
            loading: false,
        }
        vm.submitAddForm = submitAddForm;
        vm.cancel = cancel;
        vm.title = 'add esthetician';

        activate();

        function activate() {
            logger.info('Activated Add Esthetician View');
        }

        function submitAddForm() {
            vm.addEstheticianForm.formSubmitted = true;
            //$scope.$broadcast('show-errors-check-validity');
            //if ($scope.addEstheticianForm.$invalid)
            //return;

            vm.addEstheticianForm.loading = true;
            estheticianService.createEsthetician(vm.addEstheticianForm)
                .then(function (data) {
                    console.log(data);
                    vm.addEstheticianForm.loading = false;
                    $uibModalInstance.close(data);
                })

        }

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        }
    }
})();