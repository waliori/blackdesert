angular.module('paymentServices',[])

.factory('Pay', function($http){
	payFactory = {}

	//Pay.getToken(token)
	payFactory.getToken = function(){
        return $http.get('/api/payment/');
	}
	payFactory.setSuccess = function(token) {
        return $http.get('/api/success/' + token);
    }
    payFactory.getAgreement = function(id){
    	return $http.get('/api/getagreement/' + id)
    }
    payFactory.getAgreementId = function(username){
    	return $http.get('/api/getagreementid/',username)
    }
    payFactory.cancelAgreement=function(id){
    	return $http.get('/api/cancelagreement/' + id)
    }
    payFactory.suspendAgreement=function(id){
    	return $http.get('/api/suspendagreement/' + id)
    }
    payFactory.reactivateAgreement=function(id){
        return $http.get('/api/reactivateagreement/' + id)
    }
	return payFactory
})