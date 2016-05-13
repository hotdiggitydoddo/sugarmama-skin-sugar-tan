(function () {
    'use strict';

    angular.module('app.accounts').controller('Login', Login);

    Login.$inject = ['$scope', '$state', 'logger', 'authService'];

    function Login($scope, $state, logger, authService) {
        var vm = this;

        vm.loginForm = {
            emailAddress: "",
            password: "",
            formSubmitted: false,
            loading: false
        };
        vm.title = 'login';
        vm.submitLoginForm = submitLoginForm;
        activate();

        function activate() {

        }

        function submitLoginForm() {
            vm.loginForm.formSubmitted = true;
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.loginForm.$invalid)
                return;

            vm.loginForm.loading = true;

            authService.login(vm.loginForm)
                .then(function (data) {
                    console.log(data);
                    if (data && data != -1)
                        $state.go('estheticians_profile', { id: data });
                    else if (data && data == -1)
                        return;
                    else
                        $state.go('appointments');
                })
                .catch(function (error) {
                    if (error.status === -1) {
                        logger.error("Unable to communicate with the server.  Please notify tech support.")
                    } else {
                        logger.error(error.message);
                    }
                })
                .finally(function () {
                    vm.loginForm.loading = false;
                })

            console.log('hello');
            console.log(vm.loginForm);
        }
    }
})();
