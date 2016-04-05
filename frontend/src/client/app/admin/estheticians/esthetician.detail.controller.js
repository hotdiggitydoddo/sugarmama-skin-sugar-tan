(function() {
    'use strict';

    angular.module('app.admin.estheticians').controller('EstheticianDetail', EstheticianDetail);

    EstheticianDetail.$inject = ['$state', 'logger', 'estheticianService'];

    function EstheticianDetail($state, logger, estheticianService) {
        var vm = this;
        vm.esthetician = {}
        vm.editMode = false;
        vm.isDirty = false;
        vm.toggleEditMode = toggleEditMode;
        vm.updating = false;
        vm.save = save;
        vm.destroy = destroy;
        activate();

        function activate() {
            return getEsthetician($state.params.id);
        }

        function getEsthetician(id) {
            estheticianService.getById(id)
                .then(function(data) {
                    vm.esthetician = data;
                    return vm.esthetician;
                })
        }

        function toggleEditMode() {
            vm.editMode = !vm.editMode;
            if (vm.editMode)
                vm.editableEsth = angular.copy(vm.esthetician);
            else
                vm.editableEsth = null;
        }

        function save() {
            vm.updating = true;
            estheticianService.updateEsthetician(vm.editableEsth)
                .then(function(data) {
                    vm.esthetician = data;
                    logger.success("Info successfully updated!")
                })
                .finally(function() {
                    vm.toggleEditMode();
                    vm.updating = false;
                })
        }

        function destroy() {
            if (!confirm("Are you sure you wish to delete this esthetician?")) {
                return;
            }
            estheticianService.deleteEsthetician({ id: vm.esthetician.id, userId: vm.esthetician.userId })
                .then(function(data) {
                    $state.go('estheticians', { deletedId: vm.esthetician.id });
                })
                .catch(function(err) {
           //         logger.error(err);
                });
        }
    }
})();