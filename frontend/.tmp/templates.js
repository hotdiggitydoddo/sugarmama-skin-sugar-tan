angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/about/about.html","<section><style>\n    #right-side {\n        text-transform: lowercase;\n    }\n\n    .videoWrapper {\n        position: relative;\n        padding-bottom: 56.25%; /* 16:9 */\n        padding-top: 25px;\n        height: 0;\n    }\n\n        .videoWrapper iframe {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n        }\n\n    .videoWrapper {\n        position: relative;\n        padding-bottom: 56.25%; /* 16:9 */\n        padding-top: 25px;\n        height: 0;\n    }\n\n        .videoWrapper iframe {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n        }\n</style><div class=container><ol class=breadcrumb><li><a href=\"/\">home</a></li><li class=active>about</li></ol><div style=\"padding: 0px 15px;\"><div class=row><div class=col-md-6 style=\"background: rgba(0,0,0,.05)\"><div><h2>about the \"sugar\"...</h2><p>SugarMaMa is a skincare center that is fun, comfortable, and super affordable where you will find personalized solutions for all of your skin care needs. We specialize in custom facials, diamond tip microderm, custom airbrush spray tanning, sugaring and eyelash and eyebrow tinting.</p><div class=\"col-md-12 mb-medium\"><div class=videoWrapper><iframe style=\"box-shadow: 5px 5px 5px #888888;\" width=520 height=315 src=//www.youtube.com/embed/axiC4TqHoOQ frameborder=0 allowfullscreen></iframe></div></div><h2 class=pull-right>... about the \"mama\"</h2><div class=\"row mb-small\"><div class=col-md-12><img src=images/debbie.jpg class=\"img-rounded img-thumbnail img-fit\"></div></div><div class=\"row mb-small\"><div class=col-md-12><p>After over 11 years of working in some of the most prestigious spas in Southern California, Deborah decided to take her passion and knowledge for all things beauty and open her own skincare center. Previously, she could have been found practicing her craft at Glen Ivy Day Spa, Spa Luce at the Renaissance in Hollywood, and Aqua Star which is found inside the Beverly Hilton.</p><p>Deborah is passionate about helping her clients achieve their skincare goals by using the highest quality products and techniques. She understands the need for affordable service while never compromising quality. Deborah\'s main desire has always been to see her clients look and feel their best.</p></div></div></div></div><div class=col-md-6 id=right-side><div class=\"row col-md-12 mb-medium\"><h2 class=text-center>hours</h2><img src=images/fancy-lines-sm.png style=\"display:block; margin:auto;\"><div><h5 class=text-center>monday: 10:00am - 7:00pm</h5><h5 class=text-center>wednesday: 10:00am - 9:00pm</h5><h5 class=text-center>thursday: 10:00am - 9:00pm</h5><h5 class=text-center>friday: 10:00am - 7:00pm</h5><h5 class=text-center style=\"margin-bottom: 30px\">saturday: 10:00am - 5:00pm</h5><p class=text-center><em>closed on sundays and tuesdays</em></p><br></div></div></div></div></div></div></section>");
$templateCache.put("app/accounts/login.html","<div class=container><div class=row><div class=\"col-md-4 center-block\" style=\"float: none; padding: 25px; background: rgba(0,0,0,.05)\"><div class=\"row mb-medium\"><div class=col-md-12><form ng-submit=vm.submitLoginForm() id=loginForm name=loginForm novalidate><div class=row><div class=col-md-12><div class=form-group ng-class=\"{ \'has-error\': vm.loginForm.formSubmitted && loginForm.emailAddress.$invalid || loginForm.emailAddress.$touched && loginForm.emailAddress.$invalid }\"><label for=emailAddress>email</label> <input type=email class=form-control ng-model=vm.loginForm.emailAddress ng-minlength=6 ng-maxlength=40 required name=emailAddress title=\"Please enter a valid email address\"><div class=help-block ng-messages=loginForm.emailAddress.$error ng-if=\"loginForm.emailAddress.$touched || vm.loginForm.formSubmitted\"><div ng-messages-include=/error-messages.html></div></div></div><div class=form-group ng-class=\"{ \'has-error\': vm.loginForm.formSubmitted && loginForm.password.$invalid || loginForm.password.$touched && loginForm.password.$invalid }\"><label for=password>password</label> <input type=password class=form-control ng-model=vm.loginForm.password ng-minlength=6 ng-maxlength=40 required name=password title=\"Please enter your password\"><div class=help-block ng-messages=loginForm.password.$error ng-if=\"loginForm.password.$touched || vm.loginForm.formSubmitted\"><div ng-messages-include=/error-messages.html></div></div></div><button type=submit class=\"btn btn-lg btn-primary\" ng-disabled=vm.loginForm.loading><span ng-show=!vm.loginForm.loading>Submit</span> <span ng-show=vm.loginForm.loading>Please wait...</span></button></div></div></form></div></div></div></div></div>");
$templateCache.put("app/accounts/signup.html","<div class=container><div class=row><div class=\"col-md-4 center-block\" style=\"float: none; padding: 25px; background: rgba(0,0,0,.05)\"><div class=\"row mb-medium\"><div class=col-md-12><form ng-submit=vm.submitSignUpForm() id=signUpForm name=signUpForm novalidate><div class=row><div class=col-md-12><div class=form-group ng-class=\"{ \'has-error\': vm.signUpForm.formSubmitted && signUpForm.firstName.$invalid || signUpForm.firstName.$touched && signUpForm.firstName.$invalid }\"><label for=firstName>first name</label> <input type=text class=form-control ng-model=vm.signUpForm.firstName ng-minlength=2 ng-maxlength=25 required name=firstName title=\"Please enter your first name\"><div class=help-block ng-messages=signUpForm.firstName.$error ng-if=\"signUpForm.firstName.$touched || vm.signUpForm.formSubmitted\"><div ng-messages-include=/error-messages.html></div></div></div><div class=form-group ng-class=\"{ \'has-error\': vm.signUpForm.formSubmitted && signUpForm.lastName.$invalid || signUpForm.lastName.$touched && signUpForm.lastName.$invalid }\"><label for=lastName>first name</label> <input type=text class=form-control ng-model=vm.signUpForm.lastName ng-minlength=2 ng-maxlength=25 required name=lastName title=\"Please enter your last name\"><div class=help-block ng-messages=signUpForm.lastName.$error ng-if=\"signUpForm.lastName.$touched || vm.signUpForm.formSubmitted\"><div ng-messages-include=/error-messages.html></div></div></div><div class=form-group ng-class=\"{ \'has-error\': vm.signUpForm.formSubmitted && signUpForm.emailAddress.$invalid || signUpForm.emailAddress.$touched && signUpForm.emailAddress.$invalid }\"><label for=emailAddress>email</label> <input type=email class=form-control ng-model=vm.signUpForm.emailAddress ng-minlength=6 ng-maxlength=40 required name=emailAddress title=\"Please enter a valid email address\"><div class=help-block ng-messages=signUpForm.email.$error ng-if=\"signUpForm.emailAddress.$touched || vm.signUpForm.formSubmitted\"><div ng-messages-include=/error-messages.html></div></div></div><div class=form-group ng-class=\"{ \'has-error\': vm.signUpForm.formSubmitted && signUpForm.password.$invalid || signUpForm.password.$touched && signUpForm.password.$invalid }\"><label for=password>password</label> <input type=password class=form-control ng-model=vm.signUpForm.password ng-minlength=6 ng-maxlength=40 required name=password title=\"Please enter a password\"><div class=help-block ng-messages=signUpForm.password.$error ng-if=\"signUpForm.password.$touched || vm.signUpForm.formSubmitted\"><div ng-messages-include=/error-messages.html></div></div></div><div class=form-group ng-class=\"{ \'has-error\': vm.signUpForm.formSubmitted && signUpForm.passwordConfirmation.$invalid || signUpForm.passwordConfirmation.$touched && signUpForm.passwordConfirmation.$invalid }\"><label for=passwordConfirmation>confirm password</label> <input type=password class=form-control ng-model=vm.signUpForm.passwordConfirmation validate-equals=vm.signUpForm.password required name=passwordConfirmation title=\"Please confirm your password\"><div class=help-block ng-messages=signUpForm.passwordConfirmation.$error ng-if=\"signUpForm.passwordConfirmation.$touched || vm.signUpForm.formSubmitted\"><div ng-messages-include=/error-messages.html></div></div></div><button type=submit class=\"btn btn-lg btn-primary\" ng-disabled=vm.signUpForm.loading><span ng-show=!vm.signUpForm.loading>Submit</span> <span ng-show=vm.signUpForm.loading>Please wait...</span></button></div></div></form></div></div></div></div></div>");
$templateCache.put("app/home/home.html","<div kb-slider class=kb-slider><div><div class=item><img src=images/sugarMamaMain.png alt=img><div class=caption data-pos=none></div></div></div><div class=item><img src=images/home-page-0.jpg alt=img><div class=caption data-pos=bottom-left></div></div><div class=item><img src=images/home-page-1.jpg alt=img><div class=caption data-pos=bottom-left></div></div><div class=item><img src=images/home-page-2.jpg alt=img><div class=caption data-pos=bottom-left></div></div><div class=item><img src=images/home-page-3.jpg alt=img><div class=caption data-pos=bottom-right></div></div></div>");
$templateCache.put("app/layout/shell.html","<div ng-controller=\"Shell as vm\"><section id=content><a href=# id=menu-toggle-wrapper class><div id=menu-toggle></div></a><a href=# id=inner-bar><div class=logo-alt><img src=images/sugarMamaBanner.png alt=logo-mini></div></a><div ng-include=\"\'app/layout/sidebar.html\'\"></div><div id=main-content><div class=\"page-wrapper regular-page\"><div ui-view></div></div></div></section></div>");
$templateCache.put("app/layout/sidebar.html","<div id=side-bar sidebar ng-controller=\"Sidebar as vm\"><div class=inner-wrapper><div id=side-inner><div class=row><div id=logo-wrapper><a href=\"/\"><img src=images/logo.png alt=SugarMaMa></a></div></div><div class=row><div id=side-contents><ul ng-if=vm.isAuthenticated() id=navigation class=list-hover><li ng-class=vm.isCurrent(r) ng-repeat=\"r in vm.authRoutes\"><a nav-link ui-sref={{r.name}} ng-bind-html=r.settings.content></a></li></ul><ul ng-if=!vm.isAuthenticated() id=navigation class=list-hover><li ng-class=vm.isCurrent(r) ng-repeat=\"r in vm.navRoutes\"><a nav-link ui-sref={{r.name}} ng-bind-html=r.settings.content></a></li></ul></div></div><div class=row><span ng-show=vm.isAuthenticated()><a href=\"/\" ng-click=vm.logOut()>logout</a></span> <span ng-show=!vm.isAuthenticated()><a href=/login>login</a></span><ul class=social-icons><li><a href=https://www.facebook.com/sugarmamaskinsugartan target=_blank><i class=\"fa fa-facebook fa-lg\"></i></a></li><li><a href=http://instagram.com/sugarmamaskinsugartan target=_blank><i class=\"fa fa-instagram fa-lg\"></i></a></li><li><a href=http://www.yelp.com/biz/sugar-mama-stanton target=_blank><i class=\"fa fa-yelp fa-lg\"></i></a></li></ul></div><div class=row><span style=\"color: rgb(236, 209, 151)\">12362 beach blvd<br>suite 19<br>stanton, ca 90680<br>562.484.8653</span><div id=copyright style=\"margin-bottom: 25px !important;\"></div></div></div></div></div>");
$templateCache.put("app/services/facials.html","<div class=container><ol class=breadcrumb><li><a href=\"/\">home</a></li><li><a href=/services>services</a></li><li class=active>facials &amp; microderms</li></ol><div style=\"padding: 0px 15px;\"><div class=row><div class=col-md-6 style=\"background: rgba(0,0,0,.05)\"><div><h2>our take on facials...</h2><p>Everyone\'s skin is different, therefore every treatment that is performed is customized. We focus on skin health. Our products are simple, yet scientific.</p><div class=\"row mb-small\"><div class=col-md-12><img src=/Images/facial-towels.jpg class=\"img-rounded img-thumbnail img-fit\"></div></div><div class=\"row mb-small\"><div class=col-md-12><p>Skin stimulation + topical nourishment = healthy skin.</p><p>We feature active, biogenic, paraben-free, kosher and preservative-free ingredients that improve the health of your skin in one treatment.</p></div></div><div class=\"row mb-small\"><div class=col-md-12><img src=/Images/facial-brunette.jpg class=\"img-rounded img-thumbnail img-fit\"></div></div></div></div><div class=col-md-6 id=right-side><div class=\"row col-md-12 mb-medium\"><h2 class=text-center>services</h2><img src=/Images/fancy-lines-sm.png style=\"display:block; margin:auto;\"></div><div class=\"row col-md-12 mb-small\"><h6 class=text-center style=\"color: rgb(146, 58, 7)\">The Petìt - 40</h6><p class=text-center>A 30 minute facial that includes an ultrasonic cleanse, exfoliation, and mask. This treatment is perfect for a \"pick me up\" in between stronger treatments or before a big event.</p></div><div class=\"row col-md-12 mb-small\"><h6 class=text-center style=\"color: rgb(146, 58, 7)\">The Grand - 75</h6><p class=text-center>A 60 minute facial that includes an ultrasonic cleanse, exfoliation, extractions, hot stone massage, and mask. This treatment is designed to deliver maximum results for clean, glowing skin, as well as relaxation.</p></div><div class=\"row col-md-12 mb-small\"><h6 class=text-center style=\"color: rgb(146, 58, 7)\">The Luxe - 110</h6><p class=text-center>This 80 minute facial is our most luxurious. It is designed to induce relaxation, as well as treat all your skin care needs. This treatment begins face-down with a hot stone massage and includes an ultrasonic cleanse, exfoliation, extractions, eye treatment, and galvanic current.</p></div><div class=\"row col-md-12 mb-small\"><h6 class=text-center style=\"color: rgb(146, 58, 7)\">The Bold and the Beautiful - 99</h6><p class=text-center>This service includes a Brazilian sugaring and a 60 min. customized facial. Nobody looks forward to having their pubic hair removed, so why not couple it with some pleasure and walk out feeling beautiful and relaxed from head to toe!</p></div><div class=\"row col-md-12 mb-large\"><blockquote>* high-frequency included in <em>The Grand</em> and <em>The Luxe</em> treatments *</blockquote></div><div class=\"row col-md-12 mb-medium\"><h2 class=text-center>microderm</h2><img src=/Images/fancy-lines-sm.png style=\"display:block; margin:auto;\"></div><div class=\"row col-md-12 mb-small\"><h6 class=text-center style=\"color: rgb(146, 58, 7)\">Crystal-Free Diamond-Tip Microdermabrasion - 90</h6><p class=text-center>This treatment is designed to brighten the skin, leaving it glowing, radiant, and smooth. It can also help soften the look of fine lines. A diamond-tip exfoliation is performed. This is a great anti-aging treatment with no downtime. Not recommended for acne or severe rosacea.</p></div><div class=\"row col-md-12 mb-small\"><h6 class=text-center style=\"color: rgb(146, 58, 7)\">Micro Express - 45</h6><p class=text-center>This 30 minute treatment is desgined for anyone on the go looking for rapid results. Treatment includes double-cleanse, 2 passes with diamond tip, and mask.</p></div></div></div></div></div>");
$templateCache.put("app/services/hairremoval.html","<div class=container><ol class=breadcrumb><li><a href=\"/\">home</a></li><li><a href=/services>services</a></li><li class=active>hair removal</li></ol><div style=\"padding: 0px 15px;\"><div class=row><div class=col-md-6 style=\"background: rgba(0,0,0,.05)\"><div><h2>sugaring</h2><p>Sugaring is an ancient art of hair removal that dates back to 1900 BC. We are excited to offer this service and product, here, in a modern setting.</p><div class=\"row mb-small\"><div class=\"col-md-6 col-sm-6 col-xs-6\"><img src=images/sugar-spoon-long.jpeg class=\"img-rounded img-thumbnail img-fit\"></div><div class=\"col-md-6 col-sm-6 col-xs-6\"><img src=images/sugar-pile.jpg class=\"img-rounded img-thumbnail img-fit\"></div></div><div class=\"row mb-small\"><div class=col-md-12><p>Sugar is 100% natural. No chemicals. No preservatives. No irritants. Sugar is cooked into a paste-like consistency and applied to the skin by your certified esthetician. Sugar paste is a natural exfoliant that only adheres to dead skin cells and hair, so you can expect your skin to feel extremely smooth \"like a baby\'s bottom\".</p></div></div><div class=\"row mb-small\"><div class=col-md-12><img src=images/sugar-leg.png class=\"img-rounded img-thumbnail img-fit\"></div></div><div class=\"row mb-small\"><div class=col-md-12><p>You will never feel discomfort due to the temperature of the sugar paste as it is kept slightly warmed and is heated to body temperature during the service. The skin looks beautiful right after a sugaring session. Additionally, sugaring leads to less ingrown hairs. Many clients have switched to sugar simply for the benefit alone. Sugaring leads to noticeable \"hair loss\".</p></div></div></div></div><div class=col-md-6 id=right-side><div class=\"row col-md-12\"><h2 class=text-center>services</h2><img src=images/fancy-lines-sm.png style=\"display:block; margin:auto;\"></div><div class=\"row col-md-12 mb-small\" ng-repeat=\"service in vm.services.facial\"><span class=pull-left>{{service.name}}</span> <span class=pull-right>{{service.price}}</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Eyebrow Shaping</span> <span class=pull-right>15</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Lip</span> <span class=pull-right>10</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Chin</span> <span class=pull-right>10</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Nostrils</span> <span class=pull-right>10</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Full Face</span> <em>- Includes brows, nostrils, lip, chin, sideburns</em> <span class=pull-right>40</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Underarms</span> <span class=pull-right>15</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Arms</span> <span class=pull-right>35</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Half Leg</span> <span class=pull-right>50</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Full Leg</span> <span class=pull-right>70</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Bikini</span> <span class=pull-right>35</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Deep Bikini</span> <span class=pull-right>45</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Brazilian</span> <span class=pull-right>60</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Chest</span> <em>- Includes Stomach</em> <span class=pull-right>75</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Lower Back</span> <span class=pull-right>30</span></div><div class=\"row col-md-12 mb-small\"><span class=pull-left>Full Back</span> <em>- Includes Shoulders</em> <span class=pull-right>55</span></div><div class=\"row col-md-12 mb-small\" style=margin-top:15px><h6 class=text-center style=\"color: rgb(146, 58, 7)\">The Brazilian Dream - 75</h6></div><div class=\"row col-md-12\"><p>This is a no-rush, calm and relaxing brazilian. take the edge off knowing you will arrive and enjoy a blend of calming tea while your numbing gel takes effect. Lay back while your brazilian is performed in a calm environment designed to ease all your worries. Finish with a calming mask for your delicate lady parts while enjoying a 10 minute scalp massage and aroma therapy.</p></div><div class=\"row col-md-12 mb-small\" style=margin-top:15px><h6 class=text-center style=\"color: rgb(146, 58, 7)\">The Bold and the Beautiful - 99</h6></div><div class=\"row col-md-12\"><p>This service includes a Brazilian sugaring and a 60 min. customized facial. Nobody looks forward to having their pubic hair removed, so why not couple it with some pleasure and walk out feeling beautiful and relaxed from head to toe!</p></div></div></div></div></div>");
$templateCache.put("app/services/services.html","<section ui-view=content><style>\n    .tj-hover-3 .tj-overlay .title {\n        font-size: 28px;\n        text-transform: lowercase;\n        font-family: ralewayregular;\n    }\n    .regular-page {\n        padding-bottom: 0px;\n        padding-top: 0px;\n    }\n\n    .page-main {\n        padding: 0;\n        margin-left: 0;\n    }\n</style><div class=page-main><div class=vertical-folio><div set-bg class=\"vf-item tj-hover-3 inview-animate inview-fadeleft visible-view\"><img src=images/services/sugar.jpg alt=alt class=img-responsive><div class=\"tj-overlay vcenter-wrapper\"><div class=\"overlay-texts vcenter\"><h3 class=title>hair removal</h3><h4 class=subtitle>warm, lucious, organic sugar.</h4><br><a ng-click=\"vm.gotoService(\'hairremoval\')\" class=\"btn btn-transparent\">learn more</a></div></div></div><div set-bg class=\"vf-item tj-hover-3 inview-animate inview-fadeleft visible-view\"><img src=images/services/home-page-3.jpg alt=alt class=img-responsive><div class=\"tj-overlay vcenter-wrapper\"><div class=\"overlay-texts vcenter\"><h3 class=title>facials</h3><h4 class=subtitle>skin stimulation + topical nourishment = healthy skin.</h4><br><a ng-click=\"vm.gotoService(\'facials\')\" class=\"btn btn-transparent\">learn more</a></div></div></div><div set-bg class=\"vf-item tj-hover-3 inview-animate inview-fadeleft visible-view\"><img src=images/services/chem1.jpg alt=alt class=img-responsive><div class=\"tj-overlay vcenter-wrapper\"><div class=\"overlay-texts vcenter\"><h3 class=title>chemical peels</h3><h4 class=subtitle>renew the elegance of your skin.</h4><br><a href=/services/peels class=\"btn btn-transparent\">learn more</a></div></div></div><div set-bg class=\"vf-item tj-hover-3 inview-animate inview-fadeleft visible-view\"><img src=images/services/tan-legs.jpg alt=alt class=img-responsive><div class=\"tj-overlay vcenter-wrapper\"><div class=\"overlay-texts vcenter\"><h3 class=title>spray tans</h3><h4 class=subtitle>hand-sprayed with unmatched experience and care.</h4><br><a href=/services/tanning class=\"btn btn-transparent\">learn more</a></div></div></div><div set-bg class=\"vf-item tj-hover-3 inview-animate inview-fadeleft visible-view\"><img src=images/services/eyebrow-tint.jpg alt=alt class=img-responsive><div class=\"tj-overlay vcenter-wrapper\"><div class=\"overlay-texts vcenter\"><h3 class=title>tinting</h3><h4 class=subtitle>deepen the shade of your lashes and brows</h4><br><a href=/services/tanning class=\"btn btn-transparent\">learn more</a></div></div></div></div></div></section>");
$templateCache.put("app/admin/businessDays/businessDays.html","<div class=container><h2 class=\"section-title double-title\"><span>manage</span> business hours</h2><div class=\"row mb-medium\"><div class=col-md-4><div class=\"icon-box ib-center ib-boxed\"><h4 class=title>Sunday</h4><div class=contents><p class=business-hours>10:00AM - 6:00PM</p></div></div></div><div class=col-md-4><div class=\"icon-box ib-center ib-boxed\"><h4 class=title>Monday</h4><div class=contents><p class=business-hours>10:00AM - 6:00PM</p></div></div></div><div class=col-md-4><div class=\"icon-box ib-center ib-boxed\"><h4 class=title>Tuesday</h4><div class=contents><p class=business-hours>10:00AM - 6:00PM</p></div></div></div></div><div class=\"row mb-medium\"><div class=col-md-4><div class=\"icon-box ib-center ib-boxed\"><h4 class=title>Wednesday</h4><div class=contents><p class=business-hours>10:00AM - 6:00PM</p></div></div></div><div class=col-md-4><div class=\"icon-box ib-center ib-boxed\"><h4 class=title>Thursday</h4><div class=contents><p class=business-hours>10:00AM - 6:00PM</p></div></div></div><div class=col-md-4><div class=\"icon-box ib-center ib-boxed\"><h4 class=title>Friday</h4><div class=contents><p class=business-hours>10:00AM - 6:00PM</p></div></div></div></div><div class=row><div class=\"col-md-4 col-md-offset-4\"><div class=\"icon-box ib-center ib-boxed\"><h4 class=title>Saturday</h4><div class=contents><p class=business-hours>10:00AM - 6:00PM</p></div></div></div></div></div>");
$templateCache.put("app/admin/estheticians/esthetician.detail.html","<style>\n    .double-title {\n        font-family: ralewayregular;\n    }\n    \n    li {\n        list-style: none;\n    }\n    \n    .section-title {\n        margin-bottom: 55px;\n    }\n</style><div class=container><ol class=breadcrumb><li><a href=\"/\">home</a></li><li><a ui-sref=estheticians>estheticians</a></li><li class=active>{{vm.esthetician.firstName + \' \' + vm.esthetician.lastName}}</li></ol><h2 class=\"section-title double-title\"><div style=\"display: inline\"><i class=\"fa fa-user\" ng-style=\"{\'font-size\':\'60px\', \'color\':\'#\'+vm.esthetician.color}\"></i></div><div style=\"display: inline-block\"><span>{{vm.esthetician.firstName}}</span>{{vm.esthetician.lastName}}</div></h2><div class=\"row mb-xlarge\"><div class=col-md-6><div class=\"icon-box ib-center ib-boxed\"><i class=\"ib-icon fa fa-user\"></i><h4 class=title>info</h4><div class=contents><dl class=dl-horizontal><dt>email</dt><dd>{{vm.esthetician.email}}</dd><dt>phone</dt><dd>714.555.1212</dd></dl></div></div></div><div class=col-md-6><div class=\"icon-box ib-center ib-boxed\"><i class=\"ib-icon fa fa-calendar\"></i><h4 class=title>work schedule</h4><div class=contents><ui-view></ui-view></div></div></div></div><div class=\"row mb-small\"><div class=col-md-12></div></div></div>");
$templateCache.put("app/admin/estheticians/estheticians.add.html","<style>\n    .double-title {\n        font-family: ralewayregular;\n    }\n</style><div class=modal-header><h3 class=modal-title>add new esthetician</h3></div><div class=modal-body><form ng-submit=vm.submitAddForm() id=addEsthetcianForm name=addEstheticianForm novalidate><div class=\"row mb-small\"><div class=col-md-6><div class=form-group ng-class=\"{ \'has-error\': vm.addEstheticianForm.formSubmitted && addEstheticianForm.firstName.$invalid || addEstheticianForm.firstName.$touched && addEstheticianForm.firstName.$invalid }\"><label for=firstName>first name</label> <input type=text class=form-control ng-model=vm.addEstheticianForm.firstName ng-minlength=2 ng-maxlength=25 required name=firstName title=\"Please enter your first name\"><div class=help-block ng-messages=addEstheticianForm.firstName.$error ng-if=\"addEstheticianForm.firstName.$touched || vm.addEstheticianForm.formSubmitted\"><div ng-messages-include=/error-messages.html></div></div></div></div><div class=col-md-6><div class=form-group ng-class=\"{ \'has-error\': vm.addEstheticianForm.formSubmitted && addEstheticianForm.lastName.$invalid || addEstheticianForm.lastName.$touched && addEstheticianForm.lastName.$invalid }\"><label for=lastName>last name</label> <input type=text class=form-control ng-model=vm.addEstheticianForm.lastName ng-minlength=2 ng-maxlength=25 required name=lastName title=\"Please enter your last name\"><div class=help-block ng-messages=addEstheticianForm.lastName.$error ng-if=\"addEstheticianForm.lastName.$touched || vm.addEstheticianForm.formSubmitted\"><div ng-messages-include=/error-messages.html></div></div></div></div></div><div class=row><div class=col-md-6><div class=form-group ng-class=\"{ \'has-error\': vm.addEstheticianForm.formSubmitted && addEstheticianForm.emailAddress.$invalid || addEstheticianForm.emailAddress.$touched && addEstheticianForm.emailAddress.$invalid }\"><label for=emailAddress>email address</label> <input type=email class=form-control ng-model=vm.addEstheticianForm.emailAddress ng-minlength=6 ng-maxlength=40 required name=emailAddress title=\"Please enter a valid email address\"><div class=help-block ng-messages=addEstheticianForm.emailAddress.$error ng-if=\"addEstheticianForm.emailAddress.$touched || vm.addEstheticianForm.formSubmitted\"><div ng-messages-include=/error-messages.html></div></div></div></div></div><div class=modal-footer><button type=submit class=\"btn btn-success\" ng-disabled=vm.addEstheticianForm.loading><span ng-show=!vm.addEstheticianForm.loading>Submit</span> <span ng-show=vm.addEstheticianForm.loading>Please wait...</span></button> <button class=\"btn btn-warning\" type=button ng-click=vm.cancel()>Cancel</button></div></form></div>");
$templateCache.put("app/admin/estheticians/estheticians.html","<style>\n    .double-title {\n        font-family: ralewayregular;\n    }\n    \n    li {\n        list-style: none;\n    }\n</style><div class=container><ol class=breadcrumb><li><a href=\"/\">home</a></li><li class=active>estheticians</li></ol><h2 class=\"section-title double-title\"><span>manage</span> estheticians</h2><div class=\"row mb-small\"><div class=col-md-12><a ng-click=vm.openAddModal() class=\"btn btn-toranj pull-right\">Add New Esthetician...</a></div></div><div class=\"row mb-small\"><div class=col-md-12><ul><li ng-repeat=\"esthetician in vm.estheticians\"><a ui-sref=\"estheticians_detail({id : esthetician.id })\"><div class=supervisor><div class=sv-avatar><i class=\"fa fa-user\" ng-style=\"{\'font-size\':\'60px\', \'color\':\'#\'+esthetician.color}\"></i></div><div class=sv-detail><h3 class=sv-name>{{esthetician.firstName}} {{esthetician.lastName}}</h3><div>Esthetician</div></div></div></a></li></ul></div></div></div>");
$templateCache.put("app/admin/shifts/shift.detail.html","<style>\n    .uib-timepicker .btn {\n        border: none;\n        padding: 6px 12px;\n    }\n    \n    .uib-timepicker input {\n        font-size: 18px;\n    }\n    \n    .am-pm {\n        border: 1px solid #F2F2F2;\n    }\n    \n    .am-pm .btn {\n        font-size: 18px;\n    }\n</style><div class=modal-header><h4 class=bordered style=\"margin-bottom:0px; margin-top: 10px;\">add/edit shift</h4></div><div class=modal-body><div class=\"row mb-small\"><div class=col-xs-6><h5 class=lined>start</h5><uib-timepicker ng-model=vm.shift.startTime hour-step=1 minute-step=15 show-meridian=true></uib-timepicker></div><div class=col-xs-6><h5 class=lined>end</h5><uib-timepicker ng-model=vm.shift.endTime hour-step=1 minute-step=15 show-meridian=true></uib-timepicker></div></div><div class=row><div class=col-sm-6><h5 class=lined>day</h5><select ng-model=vm.shift.businessDay.id ng-options=\"day.id as day.value for day in vm.daysOfWeek\" class=form-control><option value disabled selected>select a day...</option></select></div><div class=col-sm-6><h5 class=lined>location</h5><select ng-model=vm.shift.businessDay.location.id ng-options=\"location.id as location.value for location in vm.locations\" class=form-control><option value disabled selected>select a location...</option></select></div></div></div><div class=modal-footer><button class=\"btn btn-success\" type=button ng-click=vm.save() ng-disabled=vm.savingShift><span ng-show=!vm.savingShift>Save</span> <span ng-show=vm.savingShift>Please wait...</span></button> <button class=\"btn btn-danger\" type=button ng-click=vm.deleteShift() ng-disabled=vm.savingShift><span ng-show=!vm.savingShift>Delete</span> <span ng-show=vm.savingShift>Please wait...</span></button> <button class=\"btn btn-default\" type=button ng-click=vm.cancel()>Cancel</button></div>");
$templateCache.put("app/admin/shifts/shifts.html","<div class=\"row mb-medium\"><div ng-show=\"vm.shifts.length === 0\" class=col-md-12><span>No shifts yet.</span></div><div ng-show=\"vm.shifts.length > 0\" class=col-md-12><table class=\"table table-hover\"><thead><tr><th>day</th><th>start</th><th>end</th><th>location</th></tr></thead><tbody><tr ng-repeat=\"shift in vm.shifts\" ng-click=\"vm.selectShift(shift, $index)\" style=\"cursor: pointer;\"><td>{{ shift.businessDay.dayOfWeek }}</td><td>{{ shift.startTime | amPmTime }}</td><td>{{ shift.endTime | amPmTime }}</td><td>{{ shift.businessDay.location.name }}</td></tr></tbody></table></div></div><div class=row><div class=col-md-12><a ng-click=vm.addNewShift() class=\"btn btn-toranj pull-right\">add new shift...</a></div></div>");}]);