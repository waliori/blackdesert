angular.module('settingController',[])
.controller("settingCtrl",function(User,Pay,Auth,$scope,$timeout,$window,$route){
	var app = this;
	app.passHide=true
	app.emailHide=true
	app.subHide=true
	app.can = false
	app.sus = false
	var id=""
	Auth.getUser().then(function(data){
		NProgress.done();
		$scope.username = data.data.username
	})
	
	var showModal = function(){
		app.choiceMade=false
		app.hideButton=true
		app.modalHeader = "Logging Out";
		$("#myModal").modal({backdrop: "static"});
		$timeout(function(){
			Auth.logout()
			$window.location.href ='/login'
			hideModal()
			$route.reload()
		},2000)
	}
	var hideModal = function(){
		$("#myModal").modal('hide')
	}
	app.changePassword = function(regData, valid, confirmed) {
            app.err_msg = false; // Clear err_msg when user submits
            app.disabled = true; // Disable form while processing
            app.loading = true; // Enable loading icon
            // Check if form is valid and passwords match
            if (valid && confirmed) {
            	if(app.regData.previousPassword != app.regData.password){
            		app.regData.username = $scope.username; // Grab username from $scope
	                // Run function to save user's new password to database
	                User.modifyPassword(app.regData).then(function(data) {
	                    app.loading = false; // Stop loading icon
	                    // Check if password was saved to database
	                    if (data.data.success) {
	                        app.success_msg = data.data.message; // Grab success message from JSON object and redirect	                       
	                       	showModal()
	                        //$window.location.href ='/settings'
	                    } else {
	                        app.disabled = false; // Enable form to allow user to resubmit
	                        app.err_msg = data.data.message; // Grab error message from JSON object
	                    }
	                });
            	}else{
            		app.loading = false; // Stop loading icon
                	app.disabled = false; // Enable form to allow user to resubmit
                	app.err_msg = 'The new password must me be different than the old one';  // Let user know form is not valid
            	}                
            } else {
                app.loading = false; // Stop loading icon
                app.disabled = false; // Enable form to allow user to resubmit
                app.err_msg = 'Please ensure form is filled out properly';  // Let user know form is not valid
            }
    }

    app.changeEmail = function(regData, valid, confirmed) {
            app.err_msg = false; // Clear err_msg when user submits
            app.disabled = true; // Disable form while processing
            app.loading = true; // Enable loading icon
            // Check if form is valid and passwords match
            if (valid && confirmed) {
            		app.regData.username = $scope.username; // Grab username from $scope
	                // Run function to save user's new password to database
	                User.modifyEmail(app.regData).then(function(data) {
	                    app.loading = false; // Stop loading icon
	                    // Check if password was saved to database
	                    if (data.data.success) {
	                        app.success_msg = data.data.message; // Grab success message from JSON object and redirect	                       
	                       	$timeout(function(){
								$window.location.href ='/settings'
							},2000)
	                    } else {
	                        app.disabled = false; // Enable form to allow user to resubmit
	                        app.err_msg = data.data.message; // Grab error message from JSON object
	                    }
	                });
            	                
            } else {
                app.loading = false; // Stop loading icon
                app.disabled = false; // Enable form to allow user to resubmit
                app.err_msg = 'Please ensure form is filled out properly';  // Let user know form is not valid
            }
    }
    var date = function(d) {
    	var pattern = /^(\d\d\d\d)-(\d\d)-(\d\d)[T](\d\d):(\d\d):(\d\d)([+-Z])$/;
	    var matches = pattern.exec(d);
	    if (!matches) {
	        throw new Error("Invalid string: " + d);
	    }
	    var year = matches[1];
	    var month = matches[2] - 1;   // month counts from zero
	    var day = matches[3];
	    var hour = matches[4];
	    var minute = matches[5];
	    var second = matches[6];
	    var zoneType = matches[7];
	    var zoneHour = matches[8] || 0;
	    var zoneMinute = matches[9] || 0;

	    // Date.UTC() returns milliseconds since the unix epoch.
	    var absoluteMs = Date.UTC(year, month, day);
	    datee = new Date(absoluteMs);
	    var monthNames = [
		    "January", "February", "March",
		    "April", "May", "June", "July",
		    "August", "September", "October",
		    "November", "December"
		];

		var day = datee.getDate();
		var monthIndex = datee.getMonth();
		var year = datee.getFullYear();

  		return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
    var manageSub = function() {
    	app.loading = true;
            Pay.getAgreementId($scope.username).then(function(data){
            	//console.log(data.data.user.billingAgreementId)
            	if(data.data.user.billingAgreementId && data.data.user.billingAgreementId != ''){
            		app.notSub =false
            		id = data.data.user.billingAgreementId
            		Pay.getAgreement(id).then(function(data2){ 
            			//console.log(data2.data)  
            			app.state = data2.data.billingAgreement.state         			
            			if(data2.data.billingAgreement.state == "Active"){
            				app.suspended=false
            				app.canceled = false
            				app.actif = true
	            			app.next = date(data2.data.billingAgreement.agreement_details.next_billing_date)       				
		            		app.price = data2.data.billingAgreement.agreement_details.last_payment_amount.value
		            		app.currency = data2.data.billingAgreement.agreement_details.last_payment_amount.currency
		            		app.start =date(data2.data.billingAgreement.start_date)
		           			app.last = date(data2.data.billingAgreement.agreement_details.last_payment_date)
		           			app.cycles =data2.data.billingAgreement.agreement_details.cycles_completed
            			}else if(data2.data.billingAgreement.state == "Cancelled"){
           					app.canceled = true
           					app.suspended=false
           					app.actif = false
           				}else if(data2.data.billingAgreement.state == "Suspended"){
           					app.canceled = false
           					app.suspended=true
           					app.actif = false
		            		app.price = data2.data.billingAgreement.agreement_details.last_payment_amount.value
		            		app.currency = data2.data.billingAgreement.agreement_details.last_payment_amount.currency
		           			app.start =date(data2.data.billingAgreement.start_date)
		           			app.last = date(data2.data.billingAgreement.agreement_details.last_payment_date)
		           			app.cycles =data2.data.billingAgreement.agreement_details.cycles_completed
            			}            				
           				app.loading = false;
            		})
            	}else{
            		app.notSub =true
            		
            	}
            })
    }


    Date.prototype.addDays = function(days) {
	  	var dat = new Date(this.valueOf());
	  	dat.setDate(dat.getDate() + days);
	  	return dat;
	}

    var showModal = function(x){
		app.choiceMade=false
		app.modalHeader =undefined
		app.modalBody =undefined
		app.hideButton = false
		if(x === 1){
			app.can = true
			app.sus = false
			a = new Date(app.last)
			w=a.addDays(31)
			b = new Date()
			c =Math.floor((w-a)/1000/60/60/24)
			app.modalHeader = "Canceling Subscription";
			app.modalBody = "You still have "+c+" days before next payment, if you cancel your  subscription you will be IMMEDIATELY a FREE user, Continue?";
			$("#myModal").modal({backdrop: "static"});			
		}else if(x ===3){
			app.hideButton = true
			app.modalHeader = "Operation almost complete..."
			$("#myModal").modal({backdrop: "static"});
		}
		$timeout(function(){
			if(!app.choiceMade){
				hideModal();
			}
		},6000)//5000		
	}
    app.sure = (x) => {
    	showModal(x)
    }
    app.yes = ()=>{
    	if(app.can){
    		app.cancelSub()
    	}
    }
    app.cancelSub =function(){
    	app.loading = true;
    	app.disabled = true;    	
    	showModal(3)
    	Pay.cancelAgreement(id).then(function(data){
    		if(data.data.success){
    			app.success_msg=data.data.message+" Redirecting..."
    			User.resetCredit().then(function(data2){
    				$timeout(function(){
						$window.location.href ='/settings'
					},2000)
    			})
    		}else{
				app.err_msg = data.data.message;
				app.loading = false;
    			app.disabled = false;
    		}
    		
    	})
    }
	app.pass = function(){
		app.err_msg = false
		app.loading = false;
		app.passHide=false
		app.emailHide=true
		app.subHide=true
	}
	app.email = function(){
		app.err_msg = false
		app.loading = false;
		app.emailHide=false
		app.passHide=true
		app.subHide=true
	}
	app.sub = function(){
		app.err_msg = false
		app.loading = false;
		app.subHide=false
		app.passHide=true
		app.emailHide=true
		manageSub()
	}

	
	

})


