angular.module('persoServices',[])

.factory('Perso', function($http){
	persoFactory = {}   

    persoFactory.addChar = function(regData){
        //return $http.post('/api/addchar', regData)
        return $http({
            url: "/api/addchar",
            method: "POST",
            data: regData,
            headers: {'Content-Type': 'application/json'}})
    }
    persoFactory.getChars = function(username){
        return $http.get('/api/getchars/' + username)
    }
    persoFactory.editChar = function(char){
        return $http({
            url: "/api/editchar",
            method: "POST",
            data: char,
            headers: {'Content-Type': 'application/json'}})
    }
    persoFactory.delete = function(char){
        return $http({
            url: "/api/deletechar",
            method: "POST",
            data: char,
            headers: {'Content-Type': 'application/json'}})
    }
    persoFactory.getChar = function(name){
        return $http.get('/api/getchar/' + name)
    }
	return persoFactory
})