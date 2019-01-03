angular.module('paymentController',['paymentServices','authServices'])

.controller("paymentCtrl",function(Auth,Pay,$routeParams, $window){

	var app = this;
	app.hideButton=true
	NProgress.done();
	app.getToken = function(){
		app.disabled=true
		app.modalHeader = "Redirecting to Paypal ..."
		$("#myModal").modal({backdrop: "static"});
		Pay.getToken().then(function(data){
			$window.location.href = data.data.url;
		})
	}
	
})

.controller("successCtrl",function($scope,Pay,$routeParams,$timeout,$window){
	var app = this;
	app.disabled=true
	app.modalHeader = "Operation almost complete..."
	$("#myModal").modal({backdrop: "static"});
	Pay.setSuccess($routeParams.token).then(function(data1){
		//console.log(data1.data.bA)
		if(data1.data.success){
			app.success_msg = data1.data.message
			NProgress.done();
		}else{
			app.err_msg = data1.data.message
		}
		$timeout(function(){
			$window.location.href ='/profile'
		},2000)

	})	
})


.controller("cancelCtrl",function($timeout,$window){
	$timeout(function(){
		app.loading = false
		NProgress.done();
		$window.location.href ='/profile'
	},1000)
})


