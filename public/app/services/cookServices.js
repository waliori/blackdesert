angular.module('cookServices',[])

.factory('Cook', function($http){
	cookFactory = {}   
	cookFactory.getRecipe = function(recipe){
        return $http.get('/api/getcookingrecipe/' + recipe)
    }
    cookFactory.getLifeInfos = function(rank){
        return $http.get('/api/getlifeinfos/' + rank)
    }
    cookFactory.getAllLifeInfos = function(){
        return $http.get('/api/getalllifeinfos/')
    }
    cookFactory.getAll = function(){
        return $http.get('/api/getallcooking')
    }
    cookFactory.getRankFromLvl = function(rank){
        return $http.get('/api/getrankfromlvl/' + rank)
    }
    cookFactory.getRecipesFromIngredient = function(ingredient){
        return $http.get('/api/getrecipesfromingredient/' + ingredient)
    }
	return cookFactory
})