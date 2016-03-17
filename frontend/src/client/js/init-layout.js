function initLayout() {
    var e = false;
    
    $.ajaxSetup({
        cache: false
    });

    $("body").on("click", ".back-to-top", function() {
        TweenMax.to($("html, body"), .5, {
            scrollTop: 0,
            ease: Power2.easeOut
        });
        return false
    });

    /* init layout widgets */

    var n, r = {
        settings: {
            $sidebar: $("div#side-bar"),
            $sideContents: $("#side-contents"),
            $menuToggle: $("#menu-toggle-wrapper"),
            $sideFooter: $("div#side-footer"),
            $innerBar: $("#inner-bar"),
            $main: $("div#main-content, .page-side"),
            $navigation: $("#navigation"),
            $exteras: $(".move-with-js"),
            sideFlag: false,
            menuFlag: false,
            mobileFlag: false,
            showSide: $("body").hasClass("show-sidebar")
        },
        init: function() {
            n = this.settings;
            this.prepare();
            this.bindUiActions();
            // if (!isTouchSupported()) {
            //     n.$sidebar.find(".inner-wrapper").niceScroll({
            //         horizrailenabled: false
            //     })
            // }
            this.setMobileFlag()
        },
        bindUiActions: function() {
            var t = this;
            var r = 0;
            $("#menu-toggle-wrapper , #inner-bar").on("click", function(e) {
                e.preventDefault();
                if (r) {
                    t.toggleMenu("out");
                    r = 0
                }
                else {
                    t.toggleMenu("in");
                    r = 1
                }
            });
            
            $(window).on("debouncedresize", function() {
                t.setMobileFlag();
                t.prepare();
                if (n.sideFlag && !n.mobileFlag) {
                    n.$menuToggle.trigger("click")
                }
            });
            
           $("#side-contents a").on("click", function(){
                t.setMobileFlag();
                t.prepare();
                if (n.sideFlag && !n.mobileFlag) {
                    n.$menuToggle.trigger("click")
                }
            });
            
            n.$sideContents.find("li a").on("click", function(t) {
                if (!n.menuFlag) {
                    n.menuFlag = true;
                    var r = $(this),
                        i = r.parent("li"),
                        s = r.siblings("ul");
                    if (s.length == 1) {
                        t.preventDefault();
                        s.css("display", "block");
                        if (!e) {
                            TweenMax.to(s, .7, {
                                left: 0,
                                ease: Power4.easeOut
                            })
                        }
                        else {
                            TweenMax.to(s, .7, {
                                right: 0,
                                ease: Power4.easeOut
                            })
                        }
                        s.addClass("menu-in")
                    }
                }
            });
            n.$sideContents.find("li.nav-prev").on("click", function() {
                var t = n.$sideContents.find(".sub-menu");
                if (!e) {
                    TweenMax.to(t, .7, {
                        left: "-100%",
                        ease: Power4.easeOut,
                        onComplete: function() {
                            t.css("display", "none");
                            n.menuFlag = false
                        }
                    })
                }
                else {
                    TweenMax.to(t, .7, {
                        right: "-100%",
                        ease: Power4.easeOut,
                        onComplete: function() {
                            t.css("display", "none");
                            n.menuFlag = false
                        }
                    })
                }
                t.removeClass("menu-in")
            })
        },
        toggleMenu: function(t) {
            var r = this,
                i = n.$sidebar.outerWidth(),
                s = n.$innerBar.outerWidth(),
                o = i - s,
                u = .4;
            if ($(window).width() < 992) {
                o = i
            }
            t || console.log("message: input argument missing");
            var a = new TimelineLite({
                paused: true
            });
            var f = new TimelineLite({
                paused: true
            });
            if (!e) {
                a.to(n.$innerBar, u, {
                    left: 0,
                    ease: Power4.easeOut,
                    onStart: function() {
                        n.$menuToggle.removeClass("anim-out");
                        n.$sidebar.css("z-index", 0);
                        n.$main.css("display", "block")
                    },
                    onComplete: function() {
                        n.$sidebar.css("display", "none")
                    }
                }, "start").to(n.$exteras, u, {
                    marginRight: 0,
                    ease: Power4.easeOut
                }, "start");
                if (!n.mobileFlag) {
                    a.to(n.$main, u, {
                        left: 0,
                        right: 0,
                        ease: Power4.ease
                    }, "start")
                }
                f.to(n.$innerBar, u, {
                    left: -s,
                    ease: Power4.easeOut,
                    onStart: function() {
                        n.$menuToggle.addClass("anim-out");
                        n.$sidebar.css("display", "block")
                    },
                    onComplete: function() {
                        n.$sidebar.css("z-index", 10);
                        if (n.mobileFlag) {
                            n.$main.css("display", "none")
                        }
                    }
                }, "start").to(n.$exteras, u, {
                    marginRight: -o,
                    ease: Power4.easeOut
                }, "start");
                if (!n.mobileFlag) {
                    f.to(n.$main, u, {
                        left: o,
                        right: -o,
                        ease: Power4.ease
                    }, "start")
                }
            }
            else {
                a.to(n.$innerBar, u, {
                    right: 0,
                    ease: Power4.easeOut,
                    onStart: function() {
                        n.$menuToggle.removeClass("anim-out");
                        n.$sidebar.css("z-index", 0);
                        n.$main.css("display", "block")
                    },
                    onComplete: function() {
                        n.$sidebar.css("display", "none")
                    }
                }, "start").to(n.$exteras, u, {
                    marginReft: 0,
                    ease: Power4.easeOut
                }, "start");
                if (!n.mobileFlag) {
                    a.to(n.$main, u, {
                        right: 0,
                        left: 0,
                        ease: Power4.ease
                    }, "start")
                }
                f.to(n.$innerBar, u, {
                    right: -s,
                    ease: Power4.easeOut,
                    onStart: function() {
                        n.$menuToggle.addClass("anim-out");
                        n.$sidebar.css("display", "block")
                    },
                    onComplete: function() {
                        n.$sidebar.css("z-index", 10);
                        if (n.mobileFlag) {
                            n.$main.css("display", "none")
                        }
                    }
                }, "start").to(n.$exteras, u, {
                    marginRight: -o,
                    ease: Power4.easeOut
                }, "start");
                if (!n.mobileFlag) {
                    console.log(n.mobileFlag);
                    f.to(n.$main, u, {
                        right: o,
                        left: -o,
                        ease: Power4.ease
                    }, "start")
                }
            }
            if (t == "out") {
                a.play();
                n.sideFlag = false
            }
            else {
                f.play();
                n.sideFlag = true
            }
        },
        prepare: function() {
            var e = this;
            var t = $(window).height() - $("#logo-wrapper").outerHeight();
            e.madineHeight = t;
            e.navHeight = n.$navigation.height();
            $(".sub-menu").css("height", t)
        },
        setMobileFlag: function() {
            var e = this;
            var t = $(window).width();
            if (t < 600) {
                n.$sidebar.width(t);
                n.mobileFlag = true
            }
            else {
                n.$sidebar.width("");
                n.mobileFlag = false;
                if (n.showSide) {
                    n.$sidebar.css("display", "")
                }
            }
        }
    };

    // init
 var b = {
        init: function () {
            $(window).load(function () {
                //  o.init();
                //u.init()
            });
            //g.init();
            //a.init();
            //l.init();
            $(".sync-width").each(function () {
                syncWidth($(this), $(this).parent(".sync-width-parent").first())
            });
            setBg($(".set-bg"));
            r.init();
           // y.init();
           // t.init();
            //videobg();
            //submitContact();
            setMinHeight();
            inviewAnimate($(".inview-animate"));
            touchDevices();
            this.bindUIActions()
        },
        bindUIActions: function () {
            $(window).on("debouncedresize", function () {
                setMinHeight()
            })
        }
    };
    b.init()
};
