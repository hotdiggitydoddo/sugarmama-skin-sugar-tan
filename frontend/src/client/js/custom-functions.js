function touchDevices() {
    if (isTouchSupported()) {
        $("body").addClass("touch-device")
    } else {
        $(".videobg-fallback").on("click", function (e) {
            e.preventDefault();
            return false
        })
    }
}

function setMinHeight() {
    var e = $(".page-wrapper");
    if (e.parents("#main-content.abs").length == 0) {
        e.css("min-height", $(window).height())
    }
}

function centerIt(e, t, n) {
    if (n == undefined) {
        n = 100
    }
    if (t == "parent") {
        t = e.parents().height()
    }
    var r = e.height(),
        i;
    if (t - r > 2 * n) {
        i = (t - r) / 2
    } else {
        i = n
    }
    e.css("margin-top", i)
}

function inviewAnimate(e) {
    e.each(function () {
        $(this).bind("inview", function (e, t, n, r) {
            var i = $(this);
            if (t) {
                i.addClass("visible-view");
                i.unbind("inview");
                if (r == "top") {
                    i.addClass("visible-view");
                    i.unbind("inview")
                }
            }
        })
    })
}

function setBg(e) {
    e.each(function () {
        var e = $(this);
        var t = e.find("img").first();
        e.css({
            background: "url(" + t.attr("src") + ") no-repeat 50% 50%",
            "background-size": "cover"
        });
        t.hide()
    })
}

function syncWidth(e, t) {
    e.css("width", t.width());
    $(window).on("debouncedresize", function () {
        syncWidth(e, t)
    })
}

function isTouchSupported() {
    var e = window.navigator.msMaxTouchPoints;
    var t = "ontouchstart" in document.createElement("div");
    if (e || t) {
        return true
    }
    return false
}
