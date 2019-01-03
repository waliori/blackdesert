angular.module('emailController', ['userServices'])

    // Controller: emailCtrl is used to activate the user's account    
    .controller('emailCtrl', function($routeParams, User, $timeout, $location,$window) {
        app = this;

        // Check function that grabs token from URL and checks database runs on page load
        User.activateAccount($routeParams.token).then(function(data) {
        	app.err_msg = false
        	app.success_msg =false
        	if (data.data.success) {
                app.success_msg = data.data.message + '...Redirecting'; // If successful, grab message from JSON object and redirect to login page
            } else {
                app.err_msg = data.data.message + '...Redirecting'; // If not successful, grab message from JSON object and redirect to login page
            }
            $timeout(function() {
            	$window.location.href='/login'
            }, 2000);
        });
    })

    // Controller: emailCtrl is used to activate the user's account    
    .controller('resendCtrl', function(User) {
        app = this;

        // Custom function that check's the user's credentials against the database
        app.checkCredentials = function(loginData) {
            app.disabled = true; // Disable the form when user submits to prevent multiple requests to server
            app.err_msg = false; // Clear err_msg each time user submits
            app.success_msg =false
            // Runs custom function that check's the user's credentials against the database
            User.checkCredentials(app.loginData).then(function(data) {
                // Check if credentials match
                if (data.data.success) {
                    // Custom function that sends activation link
                    User.resendLink(app.loginData).then(function(data) {
                        // Check if sending of link is successful
                        if (data.data.success) {
                            app.success_msg = data.data.message; // If successful, grab message from JSON object
                        } else {
                            app.err_msg = data.data.message; // If not successful, grab message from JSON object
                        }
                    });
                } else {
                    app.disabled = false; // If error occurs, remove disable lock from form
                    app.err_msg = data.data.message; // If credentials do not match, display error from JSON object
                }
            });
        };
    })

     // Controller: usernameCtrl is used to send the user's username    
    .controller('usernameCtrl', function(User) {
        app = this;

        app.sendUsername =function(userData,valid,$timeout, $location,$window){
            app.err_msg = false
            app.loading = true
            app.disabled = true
            if(valid){
                User.sendUsername(app.userData.email).then(function(data){
                    app.loading = false
                    if(data.data.success){
                        app.success_msg = data.data.message
                        $timeout(function() {
                            $window.location.href='/login'
                        }, 2000);
                    }else{
                        app.disabled = false
                        app.err_msg = data.data.message
                    }
                })
            }else{
                app.loading = false
                app.disabled = false
                app.err_msg = "please enter a valid email"
            }
        }

    })

    .controller('passwordCtrl', function(User) {
        app = this;

        app.sendPassword =function(resetData,valid){
            app.err_msg = false
            app.loading = true
            app.disabled = true

            if(valid){
                User.sendPassword(app.resetData).then(function(data){
                    //console.log(data)
                    app.loading = false
                    if(data.data.success){
                        app.success_msg = data.data.message
                    }else{
                        app.disabled = false
                        app.err_msg = data.data.message
                    }
                })
            }else{
                app.loading = false
                app.disabled = false
                app.err_msg = "please enter a valid username"
            }
        }

    })

     .controller('resetCtrl', function(User,$routeParams,$scope,$timeout,$location,$window) {
        
        app = this;
        app.hide = true; // Hide form until token can be verified to be valid

        // Function to check if token is valid and get the user's info from database (runs on page load)
        User.resetUser($routeParams.token).then(function(data) {
            // Check if user was retrieved
            if (data.data.success) {
                app.hide = false; // Show form
                app.success_msg = 'Please enter a new password'; // Let user know they can enter new password
                $scope.username = data.data.user.username; // Save username in scope for use in savePassword() function
            } else {
                app.err_msg = data.data.message; // Grab error message from JSON object
            }
        });

        // Function to save user's new password to database
        app.savePassword = function(regData, valid, confirmed) {
            app.err_msg = false; // Clear err_msg when user submits
            app.disabled = true; // Disable form while processing
            app.loading = true; // Enable loading icon

            // Check if form is valid and passwords match
            if (valid && confirmed) {
                app.regData.username = $scope.username; // Grab username from $scope

                // Run function to save user's new password to database
                User.savePassword(app.regData).then(function(data) {
                    app.loading = false; // Stop loading icon
                    // Check if password was saved to database
                    if (data.data.success) {
                        app.success_msg = data.data.message + '...Redirecting'; // Grab success message from JSON object and redirect
                        // Redirect to login page after 2000 milliseconds (2 seconds)
                        $timeout(function() {
                            $window.location.href='/login'
                        }, 2000);
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
    })