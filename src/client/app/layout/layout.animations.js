(function() {
    angular.module('app.layout')
        .animation('.mini-sidebar', function($window) {
            return {
                addClass: function(el, className, done) {
                    if (className == 'ng-hide') {
                        TweenMax.to(el, 0.2, {
                            opacity: 0,
                            left: -el.width(),
                            onComplete: done
                        });
                    }
                    else {
                        done();
                    }
                },

                removeClass: function(el, className, done) {
                    if (className == 'ng-hide') {
                        el.removeClass('ng-hide');
                        TweenMax.fromTo(el, 0.5, {
                            opacity: 0,
                            left: -el.width()
                        }, {
                            opacity: 1,
                            left: 0,
                            onComplete: done
                        });
                    }
                    else {
                        done();
                    }
                }
            }
        })
})();