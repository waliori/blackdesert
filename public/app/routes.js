var app = angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider,$locationProvider){
	$routeProvider
	.when('/',{
		templateUrl:'app/views/pages/home.html',
		controller: 'homeCtrl',
		controllerAs: 'home'
	})
	.when("/about", {
		templateUrl : 'app/views/pages/about.html'
	})
	.when("/register", {
		templateUrl : 'app/views/pages/users/register.html',
		controller : 'regCtrl',
		controllerAs : 'register',
		authenticated :false
	})
	.when("/login", {
		templateUrl : 'app/views/pages/users/login.html',
		authenticated :false
	})
	.when("/profile", {
		templateUrl : 'app/views/pages/users/profile.html',
		controller: 'dashboardCtrl',
        controllerAs: 'dashboard',
		authenticated :true
	})
	.when('/activate/:token', {
        templateUrl: 'app/views/pages/users/activation/activate.html',
        controller: 'emailCtrl',
        controllerAs: 'email',
        authenticated:false
    })
    .when('/resend', {
		templateUrl: 'app/views/pages/users/activation/resend.html',
		controller: 'resendCtrl',
		controllerAs: 'resend',
		authenticated: false
    })
	.when("/resetusername", {
		templateUrl : 'app/views/pages/users/reset/username.html',
		controller: 'usernameCtrl',
        controllerAs: 'username',
		authenticated :false
	})
    .when("/resetpassword", {
		templateUrl : 'app/views/pages/users/reset/password.html',
		controller: 'passwordCtrl',
        controllerAs: 'password',
        authenticated: false
	})
	.when("/reset/:token",{
		templateUrl : 'app/views/pages/users/reset/newpassword.html',
		controller : 'resetCtrl',
		controllerAs : "reset",
		authenticated : false
	})
	.when('/payment',{
		templateUrl : 'app/views/pages/payments/payment.html',
		controller : 'paymentCtrl',
		controllerAs : "payment",
		authenticated : true,
		permission : ['free','']
	})
	.when('/management',{
		templateUrl : 'app/views/pages/management/management.html',
		controller : 'managementCtrl',
		controllerAs : "management",
		authenticated : true,
		permission : ['molchi','']
	})
	.when('/success',{
		templateUrl : 'app/views/pages/payments/success.html',
		controller : 'successCtrl',
		controllerAs : "success",
		authenticated : true
	})
	.when('/cancel',{
		templateUrl : 'app/views/pages/payments/cancel.html',
		controller : 'cancelCtrl',
		controllerAs : "cancel",
		authenticated : true
	})
	.when('/settings',{
		templateUrl : 'app/views/pages/users/setting.html',
		controller : 'settingCtrl',
		controllerAs : "setting",
		authenticated : true
	})
	.when('/cooking',{
		templateUrl : 'app/views/pages/professions/cooking.html',
		controller : 'cookingCtrl',
		controllerAs : "cooking",
		authenticated : true
	})
	.when('/alchemy',{
		templateUrl : 'app/views/pages/professions/alchemy.html',
		controller : 'alchemyCtrl',
		controllerAs : "alchemy",
		authenticated : true
	})
	.when('/perso',{
		templateUrl : 'app/views/pages/persos/perso.html',
		controller : 'persoCtrl',
		controllerAs : "perso",
		authenticated : true
	})
	.when('/editchar',{
		templateUrl : 'app/views/pages/persos/edit.html',
		controller : 'editcharCtrl',
		controllerAs : "editchar",
		authenticated : true
	})
	.when('/converter',{
		templateUrl : 'app/views/pages/diff/expconverter.html',
		controller : 'xptolvlCtrl',
		controllerAs : "converter",
		authenticated : true
	})
	.when('/marketplace',{
		templateUrl : 'app/views/pages/diff/marketplace.html',
		controller : 'marketCtrl',
		controllerAs : "market",
		authenticated : true,
		permission: ['premium','trial']
	})
	.when('/contact',{
		templateUrl : 'app/views/pages/website/contact.html',
		controller : 'contactCtrl',
		controllerAs : "contact",
		authenticated : true
	})
	.when('/privacy',{
		templateUrl : 'app/views/pages/website/privacy.html',
		controller : 'privacyCtrl',
		controllerAs : "privacy"
	})
	.when('/gcu',{
		templateUrl : 'app/views/pages/website/gcu.html',
		controller : 'gcuCtrl',
		controllerAs : "gcu"
	})
	.when('/qa',{
		templateUrl : 'app/views/pages/website/qa.html',
		controller : 'qaCtrl',
		controllerAs : "qa"
	})
	.when('/combocalculator',{
		templateUrl : 'app/views/pages/diff/combocalculator.html',
		controller : 'comboCtrl',
		controllerAs : "combo"
	})
	
	.otherwise({redirectTo : '/'})

	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
})

app.run(['$rootScope','Auth','$location','User',function($rootScope,Auth,$location,User){
	$rootScope.$on('$routeChangeStart',  function(event, next, current){
		if (next.$$route !== undefined) {
			if(next.$$route.authenticated == true){
				if(!Auth.isLoggedIn()){
					event.preventDefault()
					$location.path('/')
				}else if(next.$$route.permission){
					User.getpermission().then(function(data){
						//if(next.$$route.permission !== data.data.permission){
						
                        if (next.$$route.permission[0] !== data.data.permission) {
                            if (next.$$route.permission[1] !== data.data.permission) {	
								event.preventDefault()
								$location.path('/')
							}
						}
							
						//}
					})
				}
			}else if(next.$$route.authenticated == false){
				if(Auth.isLoggedIn()){
					event.preventDefault()
					$location.path('/profile')
				}
			}
		}
		

			
	})
}])


