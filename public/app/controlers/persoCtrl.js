angular.module('persoController',['persoServices'])
.controller("persoCtrl",function(Perso,Auth,$timeout,$window){
	var app = this
	app.secc=0
	app.alc=0
	app.prc=5
	app.gt=0

	app.ckclothesF = function(val){
		app.secc=val
	}
	app.alcclothesF = function(val){
		app.alc=val
	}
	app.prcclothesF = function(val){
		app.prc=val
	}
	app.gtclothesF = function(val){
		app.gt=val
	}

	app.regChar=function(regData){
		app.err_msg=false
		app.success_msg=false
		app.disabled=true
		app.loading=true
		if(regData){
			if(!regData.gatheringclothes || !regData.cookingclothes || !regData.processingclothes || !regData.alchemyclothes || !regData.name || !regData.class || !regData.level || !regData.ap || !regData.ar || !regData.cp || !regData.cr || !regData.gp || !regData.gr || !regData.pp || !regData.pr){
				app.disabled=false
				app.loading=false
				app.err_msg = "Please ensure form is filled out properly"
			}else{
				Auth.getUser().then(function(data){
					regData.username = data.data.username
					Perso.addChar(app.regData).then(function(data2){
						if(data2.data.success){
							app.success_msg = data2.data.message; // Grab success message from JSON object and redirect	                       
	                    	$timeout(function(){
								$window.location.href ='/profile'
							},2000)
						}else{
							app.disabled =false
							app.loading = false
							app.err_msg=data2.data.message
						}
						
					})
				})
			}
		}else{
			app.disabled=false
			app.loading=false
			app.err_msg = "Please ensure form is filled out properly"
		}
		
	}
	app.cancel = function(){
		app.err_msg =false
		app.loading2=true
		app.success_msg="Redirecting to your dashboard"
		$timeout(function(){
			$window.location.href ='/profile'
		},2000)
	}
	NProgress.done();
})