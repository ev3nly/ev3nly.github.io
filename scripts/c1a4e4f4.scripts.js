"use strict";var Evenly=angular.module("evenlyApp",["restangular","ngCookies","ui.bootstrap","ui.validate","Payment"]);Evenly.config(["$routeProvider",function(a){a.when("/main",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/splash",{templateUrl:"views/splash.html",controller:"SplashCtrl"}).when("/home",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/wallet",{templateUrl:"views/wallet.html",controller:"WalletCtrl"}).when("/profile",{templateUrl:"views/profile.html",controller:"ProfileCtrl"}).when("/story",{templateUrl:"views/story.html",controller:"StoryCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/jobs",{templateUrl:"views/jobs.html",controller:"JobsCtrl"}).when("/faq",{templateUrl:"views/faq.html",controller:"FaqCtrl"}).when("/signup",{templateUrl:"views/signup.html",controller:"SignupCtrl"}).otherwise({redirectTo:"/splash"})}]),Evenly.config(["$httpProvider",function(a){a.defaults.useXDomain=!0,delete a.defaults.headers.common["X-Requested-With"];var b=["$rootScope","$q","$cookieStore",function(a,b,c){var d=function(a){return console.log(a.config.method+" "+a.config.url+" Successful"),a},e=function(d){var e=d.status;return 401===e&&(c.remove("__evvt"),a.$broadcast("event:loginRequired")),b.reject(d)};return function(a){return a.then(d,e)}}];a.responseInterceptors.push(b)}]),Evenly.config(["RestangularProvider",function(a){a.setBaseUrl("https://germ.herokuapp.com/api/v1")}]),Evenly.run(["$location","$cookieStore","$rootScope","Me",function(a,b,c,d){switch(!b.get("__evvt"),c.$on("event:loginRequired",function(){console.warn("Login Required!"),a.path("/splash")}),c.$on("$routeChangeStart",function(){switch(console.log("route has changed!"),a.path()){case"/story":case"/contact":case"/faq":case"/jobs":case"/login":case"/signup":$(".container").css("width","100%");break;default:$(".container").css("width","940px")}}),c.refreshMe=function(){d.get().then(function(a){c.me=a,c.me.firstName=function(){return c.me.name.split(" ")[0]}})},a.path()){case"/story":case"/contact":case"/faq":case"/jobs":case"/login":case"/splash":case"/signup":break;default:c.refreshMe()}}]),window.Evenly=Evenly,angular.module("evenlyApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma","Sean Yu"]}]),angular.module("evenlyApp").controller("SplashCtrl",["$scope","$FB","$location",function(a,b,c){a.carouselInterval=7500,a.slides=[{image:"/images/splash-carousel-1.gif",text:"Kitten."},{image:"/images/splash-carousel-2.gif",text:"Kitty!"},{image:"/images/splash-carousel-3.gif",text:"Cat."},{},{}],a.taglines=[{},{},{}],a.brochures=[{title:"Pay anyone, safely",description:"Cash is a pain. Add a card to your Evenly wallet and pay anyone, anywhere, anytime.",image:"/images/dawwww.jpg"},{title:"Collect money, effortlessly",description:"Stop hassling friends. Send a request and we'll remind your friends until they pay you back.",image:"/images/dawwww.jpg"},{title:"Deposit, instantly",description:"With one tap, securely deposit the cash in your Evenly wallet into any bank account.",image:"/images/dawwww.jpg"}],a.facebookContinue=function(){b.isAuthenticated()?(console.log("Facebook is Authenticated"),c.path("/signup")):b.login(function(b){b.authResponse?(console.log("logged into Facebook!"),c.path("/signup"),a.$apply()):console.log("failed to login to Facebook")},{scope:"email"})}}]),angular.module("evenlyApp").controller("HomeCtrl",["$scope","Me",function(a,b){b.newsfeed().then(function(b){a.newsfeed=b,_.each(b,function(a){a.publishedString=moment(a.published_at).fromNow()})})}]),angular.module("evenlyApp").controller("LoginCtrl",["$scope","Session",function(a,b){a.login=function(a,c){b.create(a,c).then(function(a){console.log(a);var b=window.location.href.split("/");b=_.initial(b,2),window.location.href=b.join("/")})}}]),angular.module("evenlyApp").controller("WalletCtrl",["$scope",function(a){a.showAddCardModal=function(){a.addCardShouldBeOpen=!0},a.hideAddCardModal=function(){a.addCardShouldBeOpen=!1},a.showAddBankAccountModal=function(){a.addBankAccountShouldBeOpen=!0},a.hideAddBankAccountModal=function(){a.addBankAccountShouldBeOpen=!1},a.showDepositModal=function(){a.depositShouldBeOpen=!0},a.hideDepositModal=function(){a.depositShouldBeOpen=!1},a.opts={backdropFade:!0,dialogFade:!0,dialogClass:"modal cc-modal"},a.selectHistory=function(){console.log("show history"),a.showHistory=!0,a.showCards=!1,a.showBankAccounts=!1},a.selectCards=function(){console.log("show cards"),a.showHistory=!1,a.showCards=!0,a.showBankAccounts=!1},a.selectBankAccounts=function(){console.log("show bank accounts"),a.showHistory=!1,a.showCards=!1,a.showBankAccounts=!0},a.showHistory=!0}]),angular.module("evenlyApp").controller("ProfileCtrl",["$scope",function(){}]),angular.module("evenlyApp").controller("NavCtrl",["$scope","$location",function(a,b){a.name="Jabroni",a.stateForItem=function(a){var c=b.path().substring(1);return a===c?"active":""}}]),angular.module("evenlyApp").controller("ActionBarCtrl",["$scope",function(a){a.showPaymentModal=function(){a.paymentShouldBeOpen=!0},a.hidePaymentModal=function(){a.paymentShouldBeOpen=!1},a.showRequestModal=function(){a.requestShouldBeOpen=!0},a.hideRequestModal=function(){a.requestShouldBeOpen=!1},a.opts={backdropFade:!0,dialogFade:!0}}]),angular.module("evenlyApp").controller("PaymentCtrl",["$scope","Payment",function(a,b){a.makePayment=function(){console.log("You owe "+a.recipient+" $"+a.amount+" for "+a.description);var c=null;c=a.recipientId?{id:a.recipientId}:{email:a.recipient},b.create({amount:a.amount,description:a.description,to:c}).then(function(){a.hidePaymentModal(),toastr.success("$"+a.amount+" sent to "+a.recipient+" for "+a.description),a.reset()},function(b){a.serverError=b.data,a.submitting=!1,a.showPaymentModal()})}}]),angular.module("evenlyApp").controller("RequestCtrl",["$scope","Request",function(a,b){a.makeRequest=function(){console.log(a.recipient+" owes you $"+a.amount+" for "+a.description),b.create({amount:a.amount,description:a.description,to:{email:a.recipient}}).then(function(){a.hideRequestModal(),toastr.success("$"+a.amount+" requested from "+a.recipient+" for "+a.description),a.reset()},function(b){a.serverError=b.data,a.submitting=!1,a.showRequestModal()})}}]),angular.module("evenlyApp").controller("AddCardCtrl",["$scope","CreditCard","balanced",function(a,b,c){a.addCard=function(){a.validForm()?(console.log("adding card"),c.tokenizeCard(a.card,function(a){201===a.status&&b.create({uri:a.data.uri}).then(function(a){console.log("Added credit card!"),console.log(a)},function(a){console.log("Failed to add credit card to Vine"),console.log(a)})})):a.showErrors=!0},a.cardType=function(a){return $.payment.cardType(a)},a.validForm=function(){return void 0===a.form.number||void 0===a.form.cvc||void 0===a.form.expiry?!1:!(a.form.number.$error.cardNumber||a.form.number.$error.required||a.form.cvc.$error.cardCVC||a.form.cvc.$error.required||a.form.expiry.$error.cardExpiry||a.form.expiry.$error.required)},a.classForButton=function(){return a.validForm()?"btn btn-primary":"btn btn-primary disabled"}}]),angular.module("evenlyApp").controller("AddBankAccountCtrl",["$scope","BankAccount","balanced",function(a,b,c){a.addBankAccount=function(){a.validForm()?(console.log("adding bank account"),c.tokenizeBankAccount(a.bankAccount,function(a){201===a.status&&b.create({uri:a.data.uri}).then(function(a){console.log("Added bank account!"),console.log(a)},function(a){console.log("Failed to add bank account to Vine"),console.log(a)})})):a.showErrors=!0},a.validForm=function(){return void 0===a.form.name||void 0===a.form.routingNumber||void 0===a.form.accountNumber?!1:!a.form.name.$error.required&&!a.form.routingNumber.$error.required&&!a.form.accountNumber.$error.required},a.classForButton=function(){return a.validForm()?"btn btn-primary":"btn btn-primary disabled"}}]),Evenly.factory("Session",["Restangular","$rootScope","$cookieStore",function(a,b,c){return{create:function(d,e){return a.all("sessions").post({email:d,password:e}).then(function(a){return console.debug("Session retrieved: "+a.authentication_token),c.put("__evvt",a.authentication_token),b.authenticationToken=a.authentication_token,a})},destroy:function(){return a.one("sessions","").remove()}}}]),Evenly.factory("User",["Restangular",function(a){return{create:function(b){return a.all("users").post(b)},all:function(b){return a.all("users").getList({query:b})}}}]),Evenly.factory("Me",["Restangular","$rootScope","$http","$cookieStore",function(a,b,c,d){var e=a.one("me",""),f=null;return f=null!==d.get("__evvt")?d.get("__evvt"):b.authenticationToken,c.defaults.headers.common.Authorization=f,{get:function(){return e.get()},put:function(a){return e.put(a)},getNotificationSettings:function(){return e.getList("notifications")},putNotificationSettings:function(a){return e.customPUT("notifications",a)},timeline:function(){return e.getList("timeline")},newsfeed:function(){return e.getList("newsfeed")},history:function(){return e.getList("history")},pending:function(){return e.getList("pending")}}}]),Evenly.factory("Payment",["Restangular",function(a){return{create:function(b){return a.all("payments").post(b)}}}]),Evenly.factory("Request",["Restangular",function(a){return{create:function(b){return a.all("charges").post(b)},remind:function(b){return a.one("charges",b).customPOST("remind")},cancel:function(b){return a.one("charges",b).customPUT("cancel")},complete:function(b){return a.one("charges",b).customPUT("complete")},deny:function(b){return a.one("charges",b).customPUT("deny")}}}]),Evenly.factory("Deposit",["Restangular",function(a){return{create:function(b){return a.all("withdrawals").post(b)}}}]),Evenly.factory("CreditCard",["Restangular",function(a){return{all:function(){return a.all("creditcards").getList()},create:function(b){return a.all("creditcards").post(b)},destroy:function(b){return a.one("creditcards",b).remove()},activate:function(b){return a.one("creditcards",b).customPUT("activate")}}}]),Evenly.factory("BankAccount",["Restangular",function(a){return{all:function(){return a.all("bankaccounts").getList()},create:function(b){return a.all("bankaccounts").post(b)},destroy:function(b){return a.one("bankaccounts",b).remove()},activate:function(b){return a.one("bankaccounts",b).customPUT("activate")}}}]),angular.module("evenlyApp").directive("eveRecipient",["User",function(a){return{templateUrl:"views/recipient.html",restrict:"E",replace:!0,link:function(b){b.getUsers=function(b){return console.debug("querying "+b),a.all(b).then(function(a){return _.map(a,function(a){return{name:a.name,id:a.id}})})},b.onSelect=function(a,c,d){console.log(a),console.log(c),console.log(d),b.recipientId=a.id}}}}]),angular.module("evenlyApp").directive("eveAmount",function(){return{templateUrl:"views/amount.html",restrict:"E",replace:!0,link:function(a){a.isCurrency=function(a){return console.log("validating currency"),/^\$?[0-9][0-9\,]*(\.\d{1,2})?$|^\$?[\.]([\d][\d]?)$/.test(a)},a.isGte=function(a,b){return console.log("validating gte"),b=b||.5,void 0===a?!1:a.replace(/[^0-9\.]/g,"")>=b}}}}),angular.module("evenlyApp").directive("eveExchangeForm",function(){return{templateUrl:"views/exchange-form.html",restrict:"E",replace:!0,link:function(a){a.invalidRecipient=function(){return void 0!==a.form.recipient?!!a.form.recipient.$error.required:void 0},a.invalidAmount=function(){if(void 0!==a.form.amount){var b=!!a.form.amount.$error.gte,c=!!a.form.amount.$error.currency;return b||c}},a.invalidDescription=function(){return void 0!==a.form.description?!!a.form.description.$error.required:void 0},a.invalidForm=function(){var b=a.invalidAmount(),c=a.invalidDescription();return b||c},a.showAmountCurrencyError=function(){return void 0!==a.form.amount?!!a.form.amount.$error.currency&&a.submitAttempted:void 0},a.showAmountGteError=function(){return void 0!==a.form.amount?!!a.form.amount.$error.gte&&a.submitAttempted:void 0},a.showDescriptionRequiredError=function(){return void 0!==a.form.description?!!a.form.description.$error.required&&a.submitAttempted:void 0},a.showErrors=function(){var b=a.showAmountCurrencyError()||a.showAmountGteError()||a.showDescriptionRequiredError()||a.serverError;return a.submitAttempted&&b},a.classForRecipient=function(){return void 0!==a.form.recipient&&void 0!==a.form.recipient.$viewValue?a.invalidRecipient()?"error":"success":void 0},a.classForAmount=function(){return void 0!==a.form.amount&&void 0!==a.form.amount.$viewValue?a.invalidAmount()?"error":"success":void 0},a.classForDescription=function(){return void 0!==a.form.description&&void 0!==a.form.description.$viewValue?a.invalidDescription()?"error":"success":void 0},a.classForButton=function(){return a.submitting?"btn-primary disabled":a.invalidForm()?"btn-primary disabled":"btn-primary"}}}}),angular.module("evenlyApp").directive("eveExchangeModal",function(){return{templateUrl:"views/exchange-modal.html",restrict:"E",link:function(a,b,c){a.type=c.type,a.hide=function(){a.$eval(c.hide)},a.submit=function(){return a.submitAttempted=!0,a.invalidForm()?(console.log("form is invalid!"),void 0):(a.submitting=!0,a.$eval(c.submit),void 0)},a.reset=function(){a.submitAttempted=!1,a.submitting=!1,a.serverError=void 0,a.amount=null,a.recipient=null,a.description=null},a.$watch("submitting",function(){a.submitting?(a.oldSubmitMessage=a.submitMessage,a.submitMessage="Sending "+a.type+"..."):void 0!==a.oldSubmitMessage&&(a.submitMessage=a.oldSubmitMessage)}),"request"===a.type?(a.title="Request",a.submitMessage="Complete Request",a.help1="",a.help2="owes me"):"payment"===a.type&&(a.title="New Payment",a.submitMessage="Complete Payment",a.help1="Pay",a.help2=""),a.help3="for"}}}),angular.module("evenlyApp").directive("eveExchangeButtons",function(){return{templateUrl:"views/exchange-buttons.html",restrict:"E",link:function(a,b,c){console.log("linking eveExchangeButtons "+a+" "+b+" "+c)}}});var defaultCallback=function(a){switch(a.status){case 201:console.log("got em!");break;case 400:console.error("missing fields");break;case 402:console.error("couldn't authorize the buyer's credit card");break;case 404:console.error("incorrect marketplace URI");break;case 500:console.error("retry")}};angular.module("evenlyApp").factory("balanced",[function(){var a="/v1/marketplaces/TEST-MP6oLyrmIAAsRrnzFWmWAQxo";return balanced.init(a),{tokenizeCard:function(a,b){var c={card_number:a.number,expiration_month:a.expiry.split("/")[0],expiration_year:"20"+a.expiry.split("/")[1].trim(),security_code:a.cvc};balanced.card.create(c,function(a){defaultCallback(a),b&&b(a)})},tokenizeBankAccount:function(a,b){var c={name:a.name,account_number:a.accountNumber,routing_number:a.routingNumber};balanced.bankAccount.create(c,function(a){defaultCallback(a),b&&b(a)})}}}]),angular.module("evenlyApp").controller("HistoryCtrl",["$scope","Me",function(a,b){b.history().then(function(b){a.history=_.map(b,function(a){"Withdrawal"===a.class?(a.verb="deposited into",a.subject="You",a.object=a.bank_name,a.topic="Deposit into "+a.bank_name):(a.verb="paid",a.subject="me"!==a.from?a.from.name:"You",a.object="me"!==a.to?a.to.name:"You",a.topic=("me"===a.from?a.to.name:a.from.name)+" · "+a.description),a.formattedDate=Date.parse(a.created_at),a.amountClass="You"===a.subject?"history-item-amount-sent":"history-item-amount-received";var b="You"===a.subject?"+$":"-$";return a.amountString=b+a.amount,a})})}]),angular.module("evenlyApp").controller("CardsCtrl",["$scope","CreditCard",function(a,b){a.loadCards=function(){b.all().then(function(b){_.each(b,function(a){console.log(a)}),a.cards=b},function(a){console.error(a)})},a.deleteCard=function(a){b.destroy(a).then(function(a){console.log("destroyed!"),console.log(a)},function(a){console.log("fucked up"),console.log(a)})},a.activateCard=function(c){b.activate(c).then(function(b){console.log("activated!"),console.log(b),a.loadCards()},function(a){console.log("fucked up"),console.log(a)})},a.loadCards()}]),angular.module("evenlyApp").controller("BankAccountsCtrl",["$scope","BankAccount",function(a,b){a.loadBankAccounts=function(){b.all().then(function(b){_.each(b,function(a){console.log(a)}),a.bankAccounts=b},function(a){console.error(a)})},a.deleteBankAccount=function(a){b.destroy(a).then(function(a){console.log("destroyed!"),console.log(a)},function(a){console.log("fucked up"),console.log(a)})},a.activateBankAccount=function(c){b.activate(c).then(function(b){console.log("activated!"),console.log(b),a.loadBankAccounts()},function(a){console.log("fucked up"),console.log(a)})},a.loadBankAccounts()}]),angular.module("evenlyApp").controller("DepositCtrl",["$scope","Deposit",function(a,b){a.makeDeposit=function(){b.create({amount:a.amount}).then(function(a){console.log("Deposit succeeded!"),console.log(a)},function(a){console.error("failure"),console.error(a)})}}]),angular.module("evenlyApp").controller("SettingsCtrl",["$scope","$rootScope","Me",function(a,b,c){b.$watch("me",function(){b.me&&(a.name=b.me.name,a.email=b.me.email,a.phoneNumber=b.me.phone_number)}),c.getNotificationSettings().then(function(b){a.emailNotifications=b[0].email,a.smsNotifications=b[0].sms,a.$watch("emailNotifications",function(){c.putNotificationSettings({event:"all",email:a.emailNotifications})}),a.$watch("smsNotifications",function(){c.putNotificationSettings({event:"all",sms:a.smsNotifications})})}),a.profileHasChanged=function(){return b.me?b.me.name!==a.name||b.me.email!==a.email||b.me.phone_number!==a.phoneNumber:!1},a.validPassword=function(){return a.password&&a.passwordConfirmation&&a.password===a.passwordConfirmation},a.saveProfileButtonEnabled=function(){return(a.profileHasChanged()||a.validPassword())&&!a.submitting},a.saveProfileButtonTitle=function(){return a.submitting?"Submitting...":"Save Profile"},a.submitting=!1,a.saveProfile=function(){if(a.password!==a.passwordConfirmation)return toastr.error("Passwords do not match"),void 0;if(a.saveProfileButtonEnabled()){a.submitting=!0;var d={name:a.name,email:a.email,phone_number:a.phoneNumber};a.validPassword()&&(d.password=a.password),c.put(d).then(function(c){a.submitting=!1,a.password=null,a.passwordConfirmation=null,b.me=c,toastr.success("Profile Updated!")},function(b){a.submitting=!1,_.map(b.data.errors,function(a){toastr.error(a)})})}}}]),angular.module("evenlyApp").controller("StoryCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("evenlyApp").controller("ContactCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("evenlyApp").controller("StaticNavCtrl",["$scope","$location",function(a,b){a.stateForItem=function(a){var c=b.path().substring(1);return a===c?"active":""},$("nav.static-nav").affix()}]),angular.module("evenlyApp").controller("JobsCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("evenlyApp").controller("FaqCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("evenlyApp").controller("PendingCtrl",["$scope","Me","Request",function(a,b,c){a.getPending=function(){b.pending().then(function(b){a.pending=_.map(b,function(a){return"GroupCharge"===a.class?(a.subject="me"===a.to?"You":a.to,a.directObject=a.title):"Charge"===a.class&&(a.subject=a.to.name||"You",a.directObject=a.description),a.target=a.from.name||a.from,a.verb=a.to.name?"owes":"owe",a})})},a.removeRequestFromPending=function(b){var c=a.pending.indexOf(b);a.pending.splice(c,1)},a.toastGenericFailure=function(a){toastr.error(a.data,"Error, please try again")},a.cancel=function(b){c.cancel(b.id).then(function(){toastr.success("Canceled your $"+b.amount+" Request to "+b.to.name+" for "+b.description),a.removeRequestFromPending(b)},function(c){a.presentRequest(b),a.toastGenericFailure(c)}),a.close()},a.remind=function(b){c.remind(b.id).then(function(){toastr.success("Reminded "+b.to.name+" to pay you $"+b.amount+" for "+b.description)},function(c){a.presentRequest(b),a.toastGenericFailure(c)}),a.close()},a.reject=function(b){c.deny(b.id).then(function(){toastr.success("Rejected "+b.from.name+"'s $"+b.amount+" Request for "+b.description),a.removeRequestFromPending(b)},function(c){a.presentRequest(b),a.toastGenericFailure(c)}),a.close()},a.pay=function(b){c.complete(b.id).then(function(){toastr.success("Paid "+b.from.name+"'s $"+b.amount+" Request for "+b.description),a.removeRequestFromPending(b)},function(c){a.presentRequest(b),a.toastGenericFailure(c)}),a.close()},a.presentRequest=function(b){a.currentRequest=b,"GroupCharge"===b.class?a.pendingGroupRequestModalShouldBeOpen=!0:"Charge"===b.class&&("me"===b.to?a.pendingReceivedRequestModalShouldBeOpen=!0:"me"===b.from&&(a.pendingSentRequestModalShouldBeOpen=!0))},a.close=function(){a.pendingReceivedRequestModalShouldBeOpen=!1,a.pendingSentRequestModalShouldBeOpen=!1,a.pendingGroupRequestModalShouldBeOpen=!1},a.opts={backdropFade:!0,dialogFade:!0},a.getPending()}]),angular.module("evenlyApp").directive("bsPopover",["$compile","$http","$timeout",function(a,b,c){return{restrict:"A",link:function(d,e,f){b.get(f.bsPopover).success(function(b){e.popover({html:!0,content:function(){return c(function(){a(e.data("popover").tip())(d)}),b}})})}}}]),angular.module("evenlyApp").controller("SignupCtrl",["$scope","$location","User","$FB","$timeout",function(a,b,c,d,e){a.signup=function(){c.create({name:a.name,email:a.email,phone_number:a.phoneNumber,password:a.password,password_confirmation:a.password}).then(function(a){console.log("created user "+a.name)},function(b){console.log(b),a.serverErrors=b.data.error?[b.data.error]:b.data.errors})},a.serverErrors=[],console.log("in SignupCtrl"),e(function(){console.log("loading /me"),d.api("/me",function(b){a.name=b.name,a.email=b.email,a.$apply(),console.log("loaded /me"),console.log(b)})},1e3)}]),angular.module("evenlyApp").directive("fb",["$FB",function(a){return{restrict:"E",replace:!0,template:"<div id='fb-root'></div>",compile:function(){return{post:function(b,c,d){var e=d.appId||"",f={appId:d.appId||"",cookie:d.cookie||!0,status:d.status||!0,xfbml:d.xfbml||!0};window.fbAsyncInit=function(){a._init(f),"fbInit"in d&&d.fbInit()},function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.async=!0,d.src="//connect.facebook.net/en_US/all.js",e.parentNode.insertBefore(d,e))}(document,"script","facebook-jssdk",e)}}}}}]).factory("$FB",["$rootScope",function(a){var b=!1,c={loaded:b,isLoaded:function(){return this.loaded},authenticated:!1,isAuthenticated:function(){return this.authenticated},_init:function(b){self=this,window.FB&&(angular.extend(window.FB,this),angular.extend(this,window.FB),this.loaded=!0,window.FB.init(b),window.FB.Event.subscribe("auth.authResponseChange",function(a){"connected"===a.status&&(self.authenticated=!0,console.log("connected from fb directive"),console.log(a.authResponse.accessToken))}),a.$$phase||a.$apply())}};return c}]);