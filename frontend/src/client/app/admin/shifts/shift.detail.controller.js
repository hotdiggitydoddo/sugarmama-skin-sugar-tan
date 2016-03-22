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
            id: 'sunday',
            value: 'sunday'
        }, {
            id: 'monday',
            value: 'monday'
        }, {
            id: 'tuesday',
            value: 'tuesday'
        }, {
            id: 'wednesday',
            value: 'wednesday'
        }, {
            id: 'thursday',
            value: 'thursday'
        }, {
            id: 'friday',
            value: 'friday'
        }, {
            id: 'saturday',
            value: 'saturday'
        }];
        
        vm.locations = [{
            id: 'stanton',
            value: 'stanton'
        }, {
            id: 'brea',    
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
                    debugger;
                    console.log(data);
                    //vm.addEstheticianForm.loading = false;
                    $uibModalInstance.close(data);
                })
                .catch(function(err) {
                    
                });
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