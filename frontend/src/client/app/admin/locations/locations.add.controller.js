(function () {
    'use strict';

    angular.module('app.admin.locations').controller('AddLocation', AddLocation);

    AddLocation.$inject = ['$state', 'logger', 'locationService', '$uibModalInstance'];

    function AddLocation($state, logger, locationService, $uibModalInstance) {
        var vm = this;
        vm.addLocationForm = {
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
        }

        vm.stateOptions = [
            'AL',
            'AK',
            'AZ',
            'AR',
            'CA',
            'CO',
            'CT',
            'DE',
            'FL',
            'GA',
            'HI',
            'ID',
            'IL',
            'IN',
            'IA',
            'KS',
            'KY',
            'LA',
            'ME',
            'MD',
            'MA',
            'MI',
            'MN',
            'MS',
            'MO',
            'MT',
            'NE',
            'NV',
            'NH',
            'NJ',
            'NM',
            'NY',
            'NC',
            'ND',
            'OH',
            'OK',
            'OR',
            'PA',
            'RI',
            'SC',
            'SD',
            'TN',
            'TX',
            'UT',
            'VT',
            'VA',
            'WA',
            'WV',
            'WI',
            'WY',
        ];

        vm.formSubmitted = false;
        vm.loading = false;
        vm.submitAddForm = submitAddForm;
        vm.cancel = cancel;
        vm.title = 'add location';

        activate();

        function activate() {
            // logger.info('Activated Add Esthetician View');
        }

        function submitAddForm(valid) {
            vm.formSubmitted = true;
            if (!valid)
                return;

            vm.loading = true;
            locationService.createLocation(vm.addLocationForm)
                .then(function (data) {
                    $uibModalInstance.close(data);
                })
                .finally(function() {
                     vm.addLocationForm.loading = false;
                })

        }

        function cancel() {
            console.log('cancel');
            $uibModalInstance.dismiss('cancel');
        }
    }
})();