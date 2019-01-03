angular.module('userApp',['appRoutes','userControllers','ngAnimate','mainController','dashboardController','editcharController','managementController','persoController','marketController','cookingController','alchemyController','emailController','paymentController','settingController','xptolvlController','contactController','somethingController','comboController'])

.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('myInterceptor');
}]);