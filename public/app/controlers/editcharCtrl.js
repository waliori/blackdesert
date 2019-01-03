angular.module('editcharController',[])
.controller("editcharCtrl",function(Perso,Auth,Cook,$timeout,$window,$scope,$routeParams,$route){
	var app = this
	app.disabled=true
	app.disabled1=true
	app.disabled2=true
	app.disabled3=true
	app.disabled4=true
	app.disabled5=true

	app.ckclothesF = function(val){
		app.ck=val
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

	Perso.getChar($routeParams.name).then(function(data){
		app.char = data.data.char
		app.gt= app.char.gatheringCloth
		app.ck=app.char.cookingCloth
		app.alc=app.char.alchemyCloth
		app.prc=app.char.processingCloth
		$(".level").select2({
			placeholder: app.char.level,
			templateResult: formatlevel,
			templateSelection: formatlevel,
			allowClear: true
		});
		$(".gatheringRank").select2({
			placeholder: app.char.gatheringRank,
			templateResult: formatgatheringRank,
			templateSelection: formatgatheringRank,
			allowClear: true
		});
		$(".gatheringLevel").select2({
			placeholder: app.char.gatheringLevel,
			templateResult: formatgatheringLevel,
			templateSelection: formatgatheringLevel,
			allowClear: true
		});
		$(".processingRank").select2({
			placeholder: app.char.processingRank,
			templateResult: formatprocessingRank,
			templateSelection: formatprocessingRank,
			allowClear: true
		});
		$(".processingLevel").select2({
			placeholder: app.char.processingLevel,
			templateResult: formatprocessingLevel,
			templateSelection: formatprocessingLevel,
			allowClear: true
		});
		$(".cookingRank").select2({
			placeholder: app.char.cookingRank,
			templateResult: formatcookingRank,
			templateSelection: formatcookingRank,
			allowClear: true
		});
		$(".cookingLevel").select2({
			placeholder: app.char.cookingLevel,
			templateResult: formatcookingLevel,
			templateSelection: formatcookingLevel,
			allowClear: true
		});
		$(".alchemyRank").select2({
			placeholder: app.char.alchemyRank,
			templateResult: formatalchemyRank,
			templateSelection: formatalchemyRank,
			allowClear: true
		});
		$(".alchemyLevel").select2({
			placeholder: app.char.alchemyLevel,
			templateResult: formatalchemyLevel,
			templateSelection: formatalchemyLevel,
			allowClear: true
		});
		NProgress.done();
	})

	var formatlevel = function(level) {
	  if (!level.id) {
	    return level.text;
	  }
	  var $level = $(
	    '<span>' + level.text + '</span>'
	  );
	  return $level;
	};
	
	var formatgatheringRank = function(gatheringRank) {
	  if (!gatheringRank.id) {
	    return gatheringRank.text;
	  }
	  var $gatheringRank = $(
	    '<span>' + gatheringRank.text + '</span>'
	  );
	  return $gatheringRank;
	};
	

	var formatgatheringLevel = function(gatheringLevel) {
	  if (!gatheringLevel.id) {
	    return gatheringLevel.text;
	  }
	  var $gatheringLevel = $(
	    '<span>' + gatheringLevel.text + '</span>'
	  );
	  return $gatheringLevel;
	};


	var formatprocessingRank = function(processingRank) {
	  if (!processingRank.id) {
	    return processingRank.text;
	  }
	  var $processingRank = $(
	    '<span>' + processingRank.text + '</span>'
	  );
	  return $processingRank;
	};


	var formatprocessingLevel = function(processingLevel) {
	  if (!processingLevel.id) {
	    return processingLevel.text;
	  }
	  var $processingLevel = $(
	    '<span>' + processingLevel.text + '</span>'
	  );
	  return $processingLevel;
	};

	var formatcookingRank = function(cookingRank) {
	  if (!cookingRank.id) {
	    return cookingRank.text;
	  }
	  var $cookingRank = $(
	    '<span>' + cookingRank.text + '</span>'
	  );
	  return $cookingRank;
	};
	

	var formatcookingLevel = function(cookingLevel) {
	  if (!cookingLevel.id) {
	    return cookingLevel.text;
	  }
	  var $cookingLevel = $(
	    '<span>' + cookingLevel.text + '</span>'
	  );
	  return $cookingLevel;
	};

	var formatalchemyRank = function(alchemyRank) {
	  if (!alchemyRank.id) {
	    return alchemyRank.text;
	  }
	  var $alchemyRank = $(
	    '<span>' + alchemyRank.text + '</span>'
	  );
	  return $alchemyRank;
	};
	

	var formatalchemyLevel = function(alchemyLevel) {
	  if (!alchemyLevel.id) {
	    return alchemyLevel.text;
	  }
	  var $alchemyLevel = $(
	    '<span>' + alchemyLevel.text + '</span>'
	  );
	  return $alchemyLevel;
	};



	app.edit = function(champ,x){
		if(eval("app.disabled"+x)){
			app.disabled=false
			eval("app.disabled"+x+"=false")
			if(x!=1){
				$("."+champ+"Rank").select2({
					placeholder: "Rank",
					templateResult: eval("format"+champ+"Rank"),
					templateSelection: eval("format"+champ+"Rank"),
					allowClear: true
				});
				$("."+champ+"Level").select2({
					placeholder: "Rank percent",
					templateResult: eval("format"+champ+"Level"),
					templateSelection: eval("format"+champ+"Level"),
					allowClear: true
				});
			}else{
				$("."+champ).select2({
					placeholder: "Character level",
					templateResult: formatlevel,
					templateSelection: formatlevel,
					allowClear: true
				});
			}
			
		}else{
			app.err_msg=false
			
			eval("app.disabled"+x+"=true")
			if(x!=1){
				eval("app.err_msg_"+champ+"Rank=false")
				eval("app.err_msg_"+champ+"Level=false")
				$("."+champ+"Rank").select2({
					placeholder:eval("app.char."+champ+"Rank"),
					templateResult: eval("format"+champ+"Rank"),
					templateSelection: eval("format"+champ+"Rank"),
					allowClear: true
				});
				$("."+champ+"Level").select2({
					placeholder:eval("app.char."+champ+"Level"),
					templateResult: eval("format"+champ+"Level"),
					templateSelection: eval("format"+champ+"Level"),
					allowClear: true
				});
			}else{
				eval("app.err_msg_"+champ+"=false")
				$("."+champ).select2({
					placeholder: eval("app.char."+champ),
					templateResult: formatlevel,
					templateSelection: formatlevel,
					allowClear: true
				});
			}
			
			
			if(app.disabled1 && app.disabled2 && app.disabled3 && app.disabled4 && app.disabled5){
				app.disabled=true
			}
		}

	}



	app.regChar = function(regData){
		edited = app.char
		edited.gatheringCloth = app.char.gatheringCloth
		edited.cookingCloth =app.char.cookingCloth
		edited.alchemyCloth =app.char.alchemyCloth
		edited.processingCloth =app.char.processingCloth
		app.disabled = true
		app.loading=true
		app.success_msg=false
		app.enabled=true
		app.err_msg=false
		app.err_msg_alchemyRank=false
		app.err_msg_alchemyLevel=false
		app.err_msg_processingRank=false
		app.err_msg_processingLevel=false
		app.err_msg_gatheringRank=false
		app.err_msg_gatheringLevel=false
		app.err_msg_level=false
		app.err_msg_cookingRank=false
		app.err_msg_cookingLevel=false

		if(!app.disabled1){
			if($(".level").select2('data')[0].text=='' || !$(".level").select2('data')[0].text){
				app.disabled=false
				app.loading=false
				app.err_msg_level = "Select character level"
			}	
			else{
				edited.level=$(".level").select2('data')[0].text
			}
		}


		if(!app.disabled2){
			if(($(".gatheringRank").select2('data')[0].text=='' || !$(".gatheringRank").select2('data')[0].text)){
				app.disabled=false
				app.loading=false
				app.err_msg_gatheringRank = "Select gathering rank"
			}else{
				edited.gatheringRank=$(".gatheringRank").select2('data')[0].text
			}
		}
		if(!app.disabled2){
			if(($(".gatheringLevel").select2('data')[0].text=='' || !$(".gatheringLevel").select2('data')[0].text)){
				app.disabled=false
				app.loading=false
				app.err_msg_gatheringLevel = "Select gathering rank percent"
			}else{
				edited.gatheringLevel=$(".gatheringLevel").select2('data')[0].text
			}
		}
		if(!app.disabled2){
			if(!regData.gatheringclothes){
				app.disabled=false
				app.loading=false
				app.err_msg_gatheringClothes= "Select the gathering Clothes you have"
			}else{
				edited.gatheringCloth=regData.gatheringclothes
			}
		}
		if(!app.disabled3){
			if(($(".processingRank").select2('data')[0].text=='' || !$(".processingRank").select2('data')[0].text)){
				app.disabled=false
				app.loading=false
				app.err_msg_processingRank = "Select processing rank"
			}else{
				edited.processingRank=$(".processingRank").select2('data')[0].text
			}
		}
		if(!app.disabled3){
			if(($(".processingLevel").select2('data')[0].text=='' || !$(".processingLevel").select2('data')[0].text)){
				app.disabled=false
				app.loading=false
				app.err_msg_processingLevel = "Select processing rank percent"
			}else{
				edited.processingLevel=$(".processingLevel").select2('data')[0].text
			}
		}
		if(!app.disabled3){
			if(!regData.processingclothes){
				app.disabled=false
				app.loading=false
				app.err_msg_processingClothes= "Select the processing Clothes you have"
			}else{				
				edited.processingCloth=regData.processingclothes
			}
		}

		if(!app.disabled4){
			if(($(".cookingRank").select2('data')[0].text=='' || !$(".cookingRank").select2('data')[0].text)){
				app.disabled=false
				app.loading=false
				app.err_msg_cookingRank = "Select cooking rank"
			}else{
				edited.cookingRank=$(".cookingRank").select2('data')[0].text
			}
		}
		if(!app.disabled4){
			if(($(".cookingLevel").select2('data')[0].text=='' || !$(".cookingLevel").select2('data')[0].text)){
				app.disabled=false
				app.loading=false
				app.err_msg_cookingLevel = "Select cooking rank percent"
			}else{
				edited.cookingLevel=$(".cookingLevel").select2('data')[0].text
			}
		}
		if(!app.disabled4){
			if(!regData.cookingclothes){
				app.disabled=false
				app.loading=false
				app.err_msg_cookingClothes= "Select the cooking Clothes you have"
			}else{
				edited.cookingCloth=regData.cookingclothes
			}
		}

		if(!app.disabled5){
			if(($(".alchemyRank").select2('data')[0].text=='' || !$(".alchemyRank").select2('data')[0].text)){
				app.disabled=false
				app.loading=false
				app.err_msg_alchemyRank = "Select alchemy rank"
			}else{
				edited.alchemyRank=$(".alchemyRank").select2('data')[0].text
			}
		}
		if(!app.disabled5){
			if(($(".alchemyLevel").select2('data')[0].text=='' || !$(".alchemyLevel").select2('data')[0].text)){
				app.disabled=false
				app.loading=false
				app.err_msg_alchemyLevel = "Select alchemy rank percent"
			}else{
				edited.alchemyLevel=$(".alchemyLevel").select2('data')[0].text
			}
		}
		if(!app.disabled5){
			if(!regData.alchemyclothes){
				app.disabled=false
				app.loading=false
				app.err_msg_alchemyClothes= "Select the alchemy Clothes you have"
			}else{
				edited.alchemyCloth=regData.alchemyclothes
			}
		}

		if((!app.disabled1 && !$(".level").select2('data')[0].text) || (!app.disabled2 && (!$(".gatheringRank").select2('data')[0].text || !$(".gatheringLevel").select2('data')[0].text )) || (!app.disabled4 && (!$(".cookingRank").select2('data')[0].text || !$(".cookingLevel").select2('data')[0].text )) || (!app.disabled3 && (!$(".processingRank").select2('data')[0].text || !$(".processingLevel").select2('data')[0].text )) || (!app.disabled5 && (!$(".alchemyRank").select2('data')[0].text || !$(".alchemyLevel").select2('data')[0].text ))){
			app.err_msg="Please complete the form before submitting it"
		}else{
			Perso.editChar(edited).then(function(data){
				if(data.data.success){
					app.success_msg = data.data.message; // Grab success message from JSON object and redirect	
					$timeout(function(){
						$window.location.href ='/profile'
					},2000)
				}else{
					app.disabled =false
					app.loading = false
					app.err_msg+=data.data.message
				}			
			})
		}

		if(app.disabled1 && app.disabled2 && app.disabled3 && app.disabled4 && app.disabled5){//khass dev ydirha bach twssal hna (submit bla walo)
			app.success_msg="unchanged character's informations"
			$timeout(function(){
				$window.location.href ='/profile'
			},2000)
		}
		
	}

	app.cancel=function(){
		app.err_msg =false
		app.loading2=true
		app.success_msg="Redirecting to your dashboard"
		$timeout(function(){
			$window.location.href ='/profile'
		},2000)
	}
})