angular.module('dashboardServices',[])

.factory('Dashboard', function($http){
	dashboardFactory = {}   
    dashboardFactory.expuser=function(regData){
    	return $http({
            url: "/api/expuser",
            method: "POST",
            data: regData,
            headers: {'Content-Type': 'application/json'}})
    }
    dashboardFactory.getexp=function(){
    	return $http.get('/api/getexp')
    }
    dashboardFactory.getMUser = function(){
        return $http.get('/api/getmuser/')
    }
    dashboardFactory.withdraw=function(x){
        return $http.get('/api/withdraw/' + x)
    }
    /*dashboardFactory.reset=function(regData){
        return $http({
            url: "/api/reset",
            method: "POST",
            data: regData,
            headers: {'Content-Type': 'application/json'}})
    }*/
	return dashboardFactory
})