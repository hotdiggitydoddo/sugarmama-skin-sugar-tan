(function () {
    'use strict';

    angular.module('app.layout', ['app.core'])
        .directive("sidebar", function () {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    initLayout();
                }
            }
        });
   
        // .directive("nav-link", function () {
        //     return {
        //         restrict: 'A',
        //         link: function (scope, elem, attrs) {
        //             elem.on('click', function(e) {
        //                 $("menu-toggle-wrapper").trigger('click'); 
        //             });
        //         }
        //     }
        // });
})();