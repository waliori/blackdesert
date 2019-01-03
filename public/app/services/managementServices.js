angular.module('managementServices',[])

.factory('Management', function($http){
	managementFactory = {}   
    	
	managementFactory.getAllCalc = function(){
        return $http.get('/api/gatAllCalc/')
	}
	
	return managementFactory
})