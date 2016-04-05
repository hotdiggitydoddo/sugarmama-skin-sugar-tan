(function() {

    'use strict';

    angular.module('app.core', [
        /* Angular modules */
        'ngAnimate',
        'ngSanitize',
        'ngMessages',

        /* 3rd party modules */
        'ui.router',
        'ui.bootstrap',
        'ui.mask',

        /* Reusable cross-app modules */
        'blocks.logger',
        'blocks.router',
        'blocks.exception'
    ])
        .directive("kbSlider", function() {
            return {
                restrict: 'A',
                link: function(scope, elem, attrs) {
                    $(elem).kenburnIt();

                    var e = $(".page-wrapper");
                    if (e.parents("#main-content.abs").length == 0) {
                        e.css("min-height", $(window).height())
                    }
                }
            }
        })
        .directive('showErrors', function() {
            return {
                restrict: 'A',
                require: '^form',
                link: function(scope, el, attrs, formCtrl) {
                    // find the text box element, which has the 'name' attribute
                    var inputEl = el[0].querySelector("[name]");
                    // convert the native text box element to an angular element
                    var inputNgEl = angular.element(inputEl);
                    // get the name on the text box so we know the property to check
                    // on the form controller
                    var inputName = inputNgEl.attr('name');

                    // only apply the has-error class after the user leaves the text box
                    // inputNgEl.bind('blur', function() {
                    //     el.toggleClass('has-error', formCtrl[inputName].$invalid);
                    // })

                    scope.$on('show-errors-check-validity', function() {
                        el.toggleClass('has-error', formCtrl[inputName].$invalid);
                    });

                    scope.$on('show-errors-reset', function() {
                        $timeout(function() {
                            el.removeClass('has-error');
                        }, 0, false);
                    });
                }
            }
        })
        .directive("validateEquals", function() {
            return {
                require: 'ngModel',
                link: function(scope, elem, attrs, ngModelCtrl) {
                    function validateEqual(value) {
                        var valid = (value === scope.$eval(attrs.validateEquals));
                        ngModelCtrl.$setValidity('equal', valid);
                        return valid ? value : undefined;
                    }
                    ngModelCtrl.$parsers.push(validateEqual);
                    ngModelCtrl.$formatters.push(validateEqual);

                    scope.$watch(attrs.validateEquals, function() {
                        ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
                    })
                }
            }
        })
        .filter('amPmTime', function() {
            return function(input) {
                return moment(input).format('h:mm a')
            }
        })
        .filter('dayOfWeek', function() {
            return function(input) {
                return moment.weekdays()[input]
            }
        })
        .filter('phoneNumber', function() {
            return function(input) {
                if (!input) return;
                var ac = input.substring(0, 3);
                var prefix = input.substring(3, 6);
                var suffix = input.substring(6, 10);
                return ac + '.' + prefix + '.' + suffix;
            }
        });
})();
