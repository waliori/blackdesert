angular.module('managementController',['managementServices'])
.controller("managementCtrl",function(User,Cook,Management,$interval,$location){
	var app = this
	NProgress.done();
	app.cookingHide=true
	app.alchemyHide=true
	app.xyzHide=true
	app.usersOk = false
	app.total=0


	

	app.xyz = function(){
		app.loading = false;
		app.xyzHide=false
		app.cookingHide=true
		app.alchemyHide=true
	}


	User.getpermission().then(function(data){
		app.permission = data.data.permission
		 if(data.data.permission === 'molchi' && $location.path() == "/management"){
		 	Management.getAllCalc().then(function(data){
		 		if(data.data.success){
		 			app.calcs=data.data.calcs
		 		}		 		
		 	})
		}
	})
})