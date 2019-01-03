angular.module('userControllers',['userServices'])
.controller('regCtrl',function($location,$timeout,User,$http){
	var app = this;
	this.regUser = function(regData,valid){
		app.err_msg = false
		app.loading = true
		app.disabled=true
		if(valid){
			User.create(app.regData).then(function(data){
				console.log(data.data)
				if(data.data.success){
					app.success_msg = data.data.message
					$timeout(function(){
						app.loading = false
						$location.path('/login')
					},1500)
					
				}else{
					app.loading = false
					app.disabled=false
					app.err_msg = data.data.message
				}
			})
		}else{
			app.loading = false
			app.disabled=false
			app.err_msg = "Please ensure form is filled out properly"
		}		
	}

	this.checkUsername = function(regData){
		app.checkingUsername = true
		app.usernameMsg = false
		app.usernameInvalid = false
		User.checkUsername(app.regData).then(function(data){
			if(data.data.success){
				app.usernameInvalid=false
				app.checkingUsername = false
				app.usernameMsg =data.data.message
			}else{
				app.usernameInvalid = true
				app.checkingUsername = false
				app.usernameMsg =data.data.message
			}
		})
	}

	this.checkEmail = function(regData){
		app.checkingEmail = true
		app.emailMsg = false
		app.emailInvalid = false
		User.checkEmail(app.regData).then(function(data){
			if(data.data.success){
				app.emailInvalid=false
				app.checkingEmail = false
				app.emailMsg =data.data.message
			}else{
				app.emailInvalid = true
				app.checkingEmail = false
				app.emailMsg =data.data.message
			}
		})
	}
})
.directive('match', function(){
	return{
		restrict : "A",
		controller : function($scope){
			$scope.confirmed = false;
			$scope.doConfirm = function(values){
				values.forEach(function(ele){
					if($scope.confirm == ele){
						$scope.confirmed = true
					}else{
						$scope.confirmed = false
					}
				})
			}
		},
		link: function(scope,element,attrs){
			attrs.$observe('match',function(){
				scope.matches = JSON.parse(attrs.match)
				scope.doConfirm(scope.matches)
			})
			scope.$watch('confirm',function(){
				scope.matches = JSON.parse(attrs.match)
				scope.doConfirm(scope.matches)
			})
		}
	}
})