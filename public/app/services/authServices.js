angular.module('authServices',[])


.factory('Auth', function($http,AuthToken,$q){
	authFactory = {}
	//Auth.login(logData)
	authFactory.login = function(logData){
		return $http.post('/api/authenticate', logData)
		.then(function(data){
			AuthToken.setToken(data.data.token)
			return data
		})
	}
	//Auth.isLoggedIn()
	authFactory.isLoggedIn = function(){
		return AuthToken.getToken()
	}

	//Auth.getUser()
	authFactory.getUser = function(){
		if(AuthToken.getToken()){
			return  $http.post('/api/me')
		}else{
			$q.reject({message : 'User has no token'})
		}
	}

	//Auth.logout()
	authFactory.logout = function(){
		AuthToken.setToken()		
	}

	return authFactory
})


.factory('AuthToken', function($window){
	authTokenFactory = {}
	//AuthToken.setToken(token)
	authTokenFactory.setToken = function(token){
		if(token){
			$window.localStorage.setItem('token',token)
		}else{
			$window.localStorage.removeItem('token')
		}
		
	}
	//AuthToken.getToken()
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token')
	}

	return authTokenFactory
})

.factory('myInterceptor', function(AuthToken){
	myInterceptor = {}
	myInterceptor.request = function(config){
		var token = AuthToken.getToken()
		if(token) config.headers['x-access-token'] = token
		return config
	}
	return myInterceptor
})