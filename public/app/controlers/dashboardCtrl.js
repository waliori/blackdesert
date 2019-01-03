angular.module('dashboardController',['dashboardServices'])
.controller("dashboardCtrl",function(Dashboard,Perso,Auth,Cook,$timeout,$window,$scope,$http,$route,$location){
	var app = this
	$scope.location=$location
	mobile=(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent||navigator.vendor||window.opera.substr(0,4)))
        if (mobile) { 
            app.mobile=true
            $('.options').css('text-align','left')
        } 
        else 
        { 
           app.mobile=false
           $(".btn1").css('width','50%')
        }
	app.lifeHide=true
	app.charsHide=true
	app.valuepack=false

	app.villa=false
	app.guild=false

	app.enabled=false
	app.persos={}
	app.currexp=false
	app.currexperr =false
	
	$scope.chars= {}
	var getPersos = function(){
		
		Auth.getUser().then(function(data){
			username = data.data.username
			Perso.getChars(username).then(function(data2){
				NProgress.done();
				app.persos = data2.data.chars
			})

		})		
	}
	getPersos()

	
	$(".pets").select2({
			placeholder: "Select life Exp bonus given by your pets",
			templateResult: formatpets,
			templateSelection: formatpets,
			allowClear: true
	});
	var formatpets = function(pets) {
	  if (!pets.id) {
	    return pets.text;
	  }
	  var $pets = $(
	    "<span>" + pets.text + "%</span>"
	  );
	  return $pets;
	};


	app.chars = function(){
		app.err_msg = false
		app.loading = false;
		app.charsHide=false
		app.lifeHide=true
	}
	app.life = function(){
		app.err_msg = false
		app.loading = false;
		app.charsHide=true
		app.lifeHide=false
	}
	app.vp = function(val)	{
		if(val == 'yes'){
			app.valuepack=true
		}else{
			app.valuepack=false
		}
	}
	app.villaF = function(val)	{
		if(val == 'yes'){
			app.villa=true
		}else{
			app.villa=false
		}
	}
	app.guildF = function(val)	{
		if(val == 'yes'){
			app.guild=true
		}else{
			app.guild=false
		}
	}
	
	
	app.edit =function(x){
		$window.location.href ='/editchar/?name='+x.name
	}

	app.delete =function(x){
		app.disabled = true
		app.loading=true
		Perso.delete(x).then(function(data){
			if(data.data.success){
				app.success_msg=data.data.message
				$timeout(function(){
					$route.reload()
				},2000)
			}else{
				app.err_msg = data.data.message
			}
			
		})
	}
	Dashboard.getexp().then(function(data){
		if(data.data.success){
			app.currexp = data.data.exp.exp
		}
		else{
			app.currexperr = data.data.message
		}
	})
	app.lifeexp = function(regData){
		app.loading=true
		app.disabled=true
		app.err_msg=""
		
		if(regData){
			if(!regData.valuepack){
				app.disabled=false
				app.loading=false
				app.err_msg+='Select if you have the value pack activated or not\n'
			}
			if(!regData.guild){
				app.disabled=false
				app.loading=false
				app.err_msg+='Select if you have guild bonus activated or not\n'
			}
			if(($(".pets").select2('data')[0].text=='' || !$(".pets").select2('data')[0].text)){
				app.disabled=false
				app.loading=false
				app.err_msg += "Select how much life exp your pets give you\n"
			}else{
				regData.pets=$(".pets").select2('data')[0].text
			}


			if(regData.valuepack && regData.guild && $(".pets").select2('data')[0].text!='' && $(".pets").select2('data')[0].text){			
				app.disabled=false
				app.loading=false
				console.log(regData)
				Dashboard.expuser(regData).then(function(data){
					if(data.data.success){
						app.success_msg=data.data.message
						$timeout(function(){
							$window.location.href ='/profile'
						},2000)
					}else{
						app.err_msg=data.data.message
					}
				})
			}else{
				app.disabled=false
				app.loading=false
				app.err_msg = "Ensure the form is completed before submitting it"
			}
		}else{
			app.disabled=false
			app.loading=false
			app.err_msg = "Ensure the form is completed before submitting it"
		}		
	}

})