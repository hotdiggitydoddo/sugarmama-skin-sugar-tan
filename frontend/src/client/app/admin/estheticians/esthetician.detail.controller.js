(function () {
    'use strict';

    angular.module('app.admin.estheticians').controller('EstheticianDetail', EstheticianDetail);

    EstheticianDetail.$inject = ['$state', 'logger', 'estheticianService'];

    function EstheticianDetail($state, logger, estheticianService) {
        var vm = this;
        vm.esthetician = {}
        vm.passwordForm = {
            formSubmitted: false
        }

        vm.editMode = false;
        vm.passwordMode = false;
        vm.isDirty = false;
        vm.toggleEditMode = toggleEditMode;
        vm.togglePasswordMode = togglePasswordMode;
        vm.updating = false;
        vm.save = save;
        vm.changePassword = changePassword;
        vm.destroy = destroy;
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

        function togglePasswordMode() {
            vm.passwordMode = !vm.passwordMode;
            vm.passwordForm = {
                userId: vm.esthetician.userId,
                formSubmitted: false
            };
        }

        function toggleEditMode() {
            vm.editMode = !vm.editMode;
            if (vm.editMode)
                vm.editableEsth = angular.copy(vm.esthetician);
            else
                vm.editableEsth = null;
        }

        function changePassword(valid) {
            vm.passwordForm.formSubmitted = true;
            if (!valid)
                return;
            vm.updating = true;
            estheticianService.changePassword(vm.passwordForm)
                .then(function (data) {
                    if (data) {
                        vm.togglePasswordMode();
                        logger.success("Password successfully updated.")
                    }
                })
                .catch(function (err) {
                    logger.error(err);
                })
                .finally(function () {
                    vm.updating = false;
                })
        }

        function save() {
            vm.updating = true;
            estheticianService.updateEsthetician(vm.editableEsth)
                .then(function (data) {
                    vm.esthetician = data;
                    logger.success("Info successfully updated!")
                })
                .finally(function () {
                    vm.toggleEditMode();
                    vm.updating = false;
                })
        }

        function destroy() {
            if (!confirm("Are you sure you wish to delete this esthetician?")) {
                return;
            }
            estheticianService.deleteEsthetician({ id: vm.esthetician.id, userId: vm.esthetician.userId })
                .then(function (data) {
                    $state.go('estheticians', { deletedId: vm.esthetician.id });
                })
                .catch(function (err) {
                    //         logger.error(err);
                });
        }
    }
})();