if (typeof Object.create !== "function") {
    Object.create = function (e) {
        function t() { }
        t.prototype = e;
        return new t
    }
} (function (e, t, n, r) {
    var i = {
        init: function (t, n) {
            var i = this;
            i.elem = n;
            i.$elem = e(n);
            i.options = e.extend({}, e.fn.kenburnIt.options, t);
            if (i.options.mode == "markup") {
                i.$elem.find(i.options.itemClass).each(function (t) {
                    var n = e(this).find("img").first().attr("src");
                    i.options.images[t] = n;
                    var s = e(this).find(i.options.captionClass);
                    if (s.attr("data-pos") !== r) {
                        var o = s.attr("data-pos")
                    } else {
                        var o = 0
                    }
                    i.options.capPositions[t] = o;
                    i.options.captions[t] = s;
                    e(this).remove()
                })
            }
            i.list = {};
            for (var s = 0; s <= i.options.images.length; s++) {
                i.list[s] = {
                    imgSrc: i.options.images[s],
                    caption: i.options.captions[s],
                    capPositions: i.options.capPositions[s],
                    loaded: false
                }
            }
            i.maxImg = i.options.images.length;
            i.currentSlide = i.options.beginWith ? i.options.beginWith : 0;
            i.zoomPrefix = 1;
            i.calcTime();
            i.run();
            i.checkSizeFlag = 0;
            i.checkSizeChange();
            i.windowResize()
        },
        run: function () {
            var e = this;
            for (var t = 0; t <= e.options.preloadNum; t++) {
                e.fetchImg(t)
            }
            var n = function () {
                var t = (e.currentSlide + e.options.preloadNum) % e.options.images.length;
                if (!e.list[t].loaded) {
                    e.fetchImg(t)
                }
                e.setNerOrigin(e.currentSlide);
                e.kbIt();
                e.currentSlide++;
                e.currentSlide = e.currentSlide % e.maxImg;
                e.zoomPrefix = !e.zoomPrefix
            };
            e.loaderCore(function () {
                n();
                var t = e.timing.iterate * 1e3;
                setInterval(function () {
                    n()
                }, t)
            })
        },
        kbIt: function () {
            var e = this,
                t = e.currentSlide,
                n = e.options.zoom,
                r = e.timing,
                i = e.list[t].wrapper,
                s = e.list[t].img,
                o = e.list[t].caption;
            var u = new TimelineLite({
                onComplete: function () {
                    e.reset(t)
                }
            });
            u.to(i, r.fadeTime, {
                autoAlpha: 1
            }, "start");
            if (e.zoomPrefix) {
                u.to(s, r.zoomTime, {
                    scaleX: n,
                    scaleY: n,
                    ease: Linear.easeNone
                }, "start")
            } else {
                u.from(s, r.zoomTime, {
                    scaleX: n,
                    scaleY: n,
                    ease: Linear.easeNone
                }, "start")
            }
            u.to(o, r.captionTime, {
                autoAlpha: 1,
                ease: Linear.easeNone
            }, "start");
            var a = e.animateCaption(t);
            if (a != "none") u.fromTo(o, r.zoomTime, a.from, a.to, "start");
            u.to(i, r.fadeTime, {
                autoAlpha: 0
            }, "-=" + r.fadeTime, "point");
            u.to(o, r.captionTime, {
                autoAlpha: 0,
                ease: Linear.easeNone
            }, "point-=" + r.captionTime * 3)
        },
        animateCaption: function (e) {
            var t = this,
                n = {};
            var r = t.$elem.width() * .05;
            var i = t.list[e].capPosition;
            if (i == 0) {
                i = t.getRand(1, 4, 1, 4)
            }
            if (i == "top-left" || i == 1) {
                n = {
                    from: {
                        top: "10%",
                        left: "10%",
                        right: "auto",
                        bottom: "auto",
                        x: 0,
                        z: 0
                    },
                    to: {
                        x: r,
                        z: .01
                    }
                }
            } else if (i == "top-right" || i == 2) {
                n = {
                    from: {
                        top: "10%",
                        left: "auto",
                        right: "10%",
                        bottom: "auto",
                        x: 0,
                        z: 0
                    },
                    to: {
                        x: -r,
                        z: .01
                    }
                }
            } else if (i == "bottom-left" || i == 3) {
                n = {
                    from: {
                        top: "auto",
                        left: "10%",
                        right: "auto",
                        bottom: "10%",
                        x: 0,
                        z: 0
                    },
                    to: {
                        x: r,
                        z: .01
                    }
                }
            } else if (i == "none") {
                n = i
            } else {
                n = {
                    from: {
                        top: "auto",
                        left: "auto",
                        right: "10%",
                        bottom: "10%",
                        x: 0,
                        z: 0
                    },
                    to: {
                        x: -r,
                        z: .01
                    }
                }
            }
            return n
        },
        fetchImg: function (t) {
            var n = this,
                r = n.list[t].imgSrc,
                i = n.list[t].caption,
                s = n.list[t].capPositions;
            var o = e("<div/>");
            o.attr("class", "owl-slide");
            var u = e("<img />");
            u.attr("src", r);
            u.attr("alt", "img");
            var a = e("<div/>").attr("class", "owl-img").html(u);
            a.css({
                opacity: 0,
                visibility: "hidden"
            }).appendTo(o);
            var f = e("<div/>");
            f.attr("class", "owl-caption");
            f.html(i);
            f.appendTo(o);
            n.$elem.append(o);
            n.list[t] = {
                wrapper: a,
                img: u,
                caption: f,
                capPosition: s,
                loaded: true
            };
            u.on("load", function () {
                n.imageFill(t)
            })
        },
        imageFill: function (e, t) {
            var n = this,
                i = n.list[e].img,
                s = n.$elem.width(),
                o = n.$elem.height(),
                u = s / o,
                a;
            if (t != r) {
                i = t
            }
            a = i.width() / i.height();
            if (u < a) {
                i.css({
                    width: "auto",
                    height: o,
                    top: 0,
                    left: -(o * a - s) / 2
                })
            } else {
                i.css({
                    width: s,
                    height: "auto",
                    top: -(s / a - o) / 2,
                    left: 0
                })
            }
        },
        checkSizeChange: function () {
            var t = this;
            if (t.checkSizeFlag) {
                t.checkSizeFlag = 0;
                t.$elem.find("img").each(function () {
                    t.imageFill(0, e(this))
                })
            }
            setTimeout(function () {
                t.checkSizeChange()
            }, 200)
        },
        windowResize: function () {
            var n = this;
            e(t).resize(function () {
                n.checkSizeFlag = 1
            })
        },
        reset: function (e) {
            TweenMax.to(this.list[e].img, 0, {
                scaleY: 1,
                scaleX: 1
            })
        },
        calcTime: function () {
            var e = this.options.duration;
            this.timing = {
                fadeTime: e / 5,
                zoomTime: e,
                captionTime: e / 10,
                iterate: e - e / 5
            }
        },
        prepare: function () { },
        setNerOrigin: function (e) {
            var t = 0,
                n = 0;
            t = this.getRand(0, 25, 75, 100);
            n = this.getRand(0, 25, 75, 100);
            var r = {
                "-moz-transform-origin": t + "% " + n + "%",
                "-webkit-transform-origin": t + "% " + n + "%",
                "-o-transform-origin": t + "% " + n + "%",
                "-ms-transform-origin": t + "% " + n + "%",
                "transform-origin": t + "% " + n + "%"
            };
            this.list[e].img.css(r)
        },
        getRand: function (e, t, n, r) {
            var i = 0;
            var s = Math.random() < .5 ? 0 : 1;
            if (s == 1) {
                i = parseInt(Math.random() * (t - e + 1), 10) + e
            } else {
                i = parseInt(Math.random() * (r - n + 1), 10) + n
            }
            return i
        },
        loaderCore: function (t) {
            var n = this;
            var r = e('<div id="kb-loader"><div id="followingBallsG"><div id="followingBallsG_1" class="followingBallsG"></div><div id="followingBallsG_2" class="followingBallsG"></div><div id="followingBallsG_3" class="followingBallsG"></div><div id="followingBallsG_4" class="followingBallsG"></div></div></div>').appendTo(n.$elem);
            n.$elem.imagesLoaded(function () {
                r.fadeOut();
                t()
            })
        }
    };
    e.fn.kenburnIt = function (e) {
        return this.each(function () {
            var t = Object.create(i);
            t.init(e, this)
        })
    };
    e.fn.kenburnIt.options = {
        images: [],
        captions: [],
        capPositions: [],
        zoom: 1.1,
        duration: 8,
        mode: "markup",
        itemClass: ".item",
        captionClass: ".caption",
        preloadNum: 2,
        onLoadingComplete: function () { },
        onSlideComplete: function () { },
        onListComplete: function () { },
        getSlideIndex: function () {
            return currentSlide
        }
    }
})(jQuery, window, document)