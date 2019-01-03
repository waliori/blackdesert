angular.module('contactController',[])
.controller("contactCtrl",function(User,$timeout,$window,$http){
	var app = this
	NProgress.done();
	app.disabled=false
	app.loading=false
	app.sendMail=function(data){
		app.disabled=true
		app.loading=true
		app.err_msg=false
		if(data){
			User.sendMail(data).then(function(d){
				if(d.data.success){
					app.loading=false					
					app.success_msg=d.data.message+"\nRedirecting"
					$timeout(()=>{
						$window.location.href="/home"
					},2000)
					
				}else{
					app.err_msg="An error occured, try again later"
				}
			})
		}else{
			app.disabled=false
			app.loading=false
			app.err_msg="You can not send an empty message"
		}
	}
})