angular.module('alchemyServices',[])

.factory('Alchemy', function($http){
	alchemyFactory = {}   
	alchemyFactory.getRecipe = function(recipe){
        return $http.get('/api/getalchemyrecipe/' + recipe)
    }
    alchemyFactory.getLifeInfos = function(rank){
        return $http.get('/api/getlifeinfos/' + rank)
    }
    alchemyFactory.getAllLifeInfos = function(){
        return $http.get('/api/getalllifeinfos/')
    }
    alchemyFactory.getAll = function(){
        return $http.get('/api/getallalchemy')
    }
    alchemyFactory.getRankFromLvl = function(rank){//life
        return $http.get('/api/getrankfromlvl/' + rank)
    }
    alchemyFactory.getRecipesFromIngredient = function(ingredient){
        return $http.get('/api/getrecipesfromingredient2/' + ingredient)
    }
	return alchemyFactory
})