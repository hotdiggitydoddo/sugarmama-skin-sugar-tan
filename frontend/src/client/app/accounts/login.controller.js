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
             angular.element(document).ready(function () {
                $("#menu-toggle-wrapper").trigger('click');
            });
            //var users = dataservice.getUsers().then(function(data) {
            //vm.email = data[0].emailAddress;
            //vm.email = data
            //});

            logger.info('Activated Login View');
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
                //    logger.success('Logged in!');

                    // }).finally(function() {
                    // 	vm.signUpForm.loading = false;
                })
                .finally(function () {
                    vm.loginForm.loading = false;
                })

            console.log('hello');
            console.log(vm.loginForm);
        }

        // 		function getServices() {
        // 			vm.services.hairRemoval = dataservice.getServices("hairRemoval");
        // 			vm.services.facial = dataservice.getServices("facials");
        // 			// return dataservice.getServices().then(function(data) {
        // 			// 	vm.services = data;
        // 			// 	return vm.services;
        // 			// });
        // 		}

        // 		function gotoService(s) {
        // 			$state.go('services.' + s);
        // 		}
    }
})();
