angular.module('userServices',[])
.factory('User', function($http){
	var userFactory = {}
	//User.create(regData)
	userFactory.create = function(regData){
		return $http.post('/api/users', regData)
	}
    userFactory.setCalc = function(data){
        return $http.put('/api/setCalc/', data)
    }

	//User.checkUsername(regData)
	userFactory.checkUsername = function(regData){
		return $http.post('/api/checkusername', regData)
	}
	userFactory.getDbUser = function(){
        return $http.get('/api/getdbuser')
    }
	//User.checkEmail(regData)
	userFactory.checkEmail = function(regData){
		return $http.post('/api/checkemail', regData)
	}

	//User.activeAccount(token)
	// Activate user account with e-mail link
    userFactory.activateAccount = function(token) {
        return $http.put('/api/activate/' + token);
    }
    //User.checkCredentials(loginData)
    userFactory.checkCredentials = function(loginData){
    	return $http.post('/api/resend', loginData)
    }
    //User.resendLink(username)
    userFactory.resendLink = function(username){
    	return $http.put('/api/resend/' , username);
    }
    //User.sendUsername(userData)
    userFactory.sendUsername=function(userData){
    	return $http.get('/api/resetusername/' + userData);
    }

    //User.sendPassword(resetData)
    userFactory.sendPassword=function(resetData){
    	return $http.put('/api/resetpassword/' , resetData);
    }

    // Grab user's information from e-mail reset link
    userFactory.resetUser = function(token) {
        return $http.get('/api/resetpassword/' + token);
    };

    // Save user's new password
    userFactory.savePassword = function(regData) {
        return $http.put('/api/savepassword', regData)
    }
    // Save user's new password
    userFactory.modifyPassword = function(regData) {
        return $http.put('/api/modifypassword', regData)
    }
    
    userFactory.modifyEmail = function(regData) {
        return $http.put('/api/modifyemail', regData)
    }
    //User.renewSession(username)
    userFactory.renewSession = function(username){
        return $http.get('/api/renewToken/' + username);
    }

    userFactory.getpermission = function(){
        return $http.get('/api/permission')
    }
    userFactory.getIp = function(){
        return $http.get('/api/getip')
    }
    userFactory.getInfos = function() {
        return $http.post('/api/payinfos');
    }
    userFactory.removeSubs = function(state){
        return $http.get('/api/removesubs/'+state);
    }
    userFactory.deco = function(){
        return $http.get('/api/deco')
    }
    userFactory.updateCredits = function(data){
         return $http.get('/api/updatecredit/'+data);
    }
    userFactory.resetCredit=function(){
        return $http.get('/api/reset/')
    }
    userFactory.analy=function(data){
        return $http.put("/api/analy",data)
    }
    userFactory.sendNotification = function(regData){
        return $http.put("/api/sendnotif",regData)
    }
    userFactory.cancelNotification = function(regData){
        return $http.put("/api/cancelnotif",regData)
    }
    userFactory.saveImg = function(file){
        return $http.post("/api/postCanvas", file, {
            headers: { 'Content-Type': 'application/json' }
        });       
    }
    userFactory.trialEnd=function(){
        return $http.get('/api/trialend/')
    }
    userFactory.sendMail = function(email){
        return $http.post("/api/sendmail", email, {
            headers: { 'Content-Type': 'application/json' }
        });       
    }
	return userFactory
})

