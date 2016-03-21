(function () {
    'use strict';

    angular.module('app.admin.shifts').controller('ShiftDetail', ShiftDetail);

    ShiftDetail.$inject = ['$state', '$uibModalInstance', 'logger', 'estheticianService'];

    function ShiftDetail($state, $uibModalInstance, logger, estheticianService) {
        var vm = this;
    
        vm.shift = {
            startTime: moment('0900', 'hmm'),
            endTime: moment('1800', 'hmm'),
            day: {},
            location: {},
            estheticianId: parseInt($state.params.id),
        };
        
        vm.cancel = cancel;
        vm.save = save;
        vm.daysOfWeek = [{
            id: 0,
            value: 'sunday'
        }, {
            id: 1,
            value: 'monday'
        }, {
            id: 2,
            value: 'tuesday'
        }, {
            id: 3,
            value: 'wednesday'
        }, {
            id: 4,
            value: 'thursday'
        }, {
            id: 5,
            value: 'friday'
        }, {
            id: 6,
            value: 'saturday'
        }];
        
        vm.locations = [{
            id: 0,
            value: 'stanton'
        }, {
            id: 1,    
            value: 'brea'
        }];
        
      //  vm.openAddModal = openAddModal;
        activate();

        function activate() {
            logger.info('Activated Shift Detail View');
          //  getEstheticians();
        }

        function getEstheticians() {
            return estheticianService.getEstheticians()
                .then(function (data) {
                    vm.estheticians = data;
                    return vm.estheticians;
                });
        }
        
        function save() {
            return estheticianService.saveShift(vm.shift)
                .then(function (data) {
                    console.log(data);
                    //vm.addEstheticianForm.loading = false;
                    $uibModalInstance.close(data);
                })
        }
        
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
        
        // function openAddModal() {
        //     var modalInstance = $uibModal.open({
        //         animation: true,
        //         templateUrl: 'app/admin/estheticians/estheticians.add.html',
        //         controller: 'AddEsthetician',
        //         controllerAs: 'vm',
        //     });

        //     modalInstance.result.then(function (esthetician) {
        //         console.log(esthetician);
        //         vm.estheticians.push(esthetician);
        //     }, function () {
        //        // $log.info('Modal dismissed at: ' + new Date());
        //     });
        // };
    }
})();