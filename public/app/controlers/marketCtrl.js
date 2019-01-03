angular.module('marketController',[])

.controller("marketCtrl",function($timeout,User,$http,Auth,$scope,$window){
	var app = this;
	NProgress.done();
	streaming=true
	app.disabled=false
	app.hideButton=true
	app.link = false
	app.start=false
	app.exit=false
	o=0
	var showModal = function(){
		app.choiceMade=false
		app.hideButton=true
		app.modalHeader = "Loading Processed stream please wait";
		$("#myModal").modal({backdrop: "static"});
	}
	var hideModal = function(){
		$("#myModal").modal('hide')
	}
	Auth.getUser().then((data)=>{
		app.username=data.data.username
	})
	function showChromeExtensionStatus() {
		if(typeof window.getChromeExtensionStatus !== 'function') return;
		var gotResponse;
		window.getChromeExtensionStatus(function(status) {
			gotResponse = true;
			if(status == 'not-installed') {
				app.err_msg='Please install Chrome extension and refresh the page'
				app.link=true
				app.start=false				
				app.exit=false
				return;
			}

			if(status == 'installed-disabled') {
				app.ett_msg='Please enable Chrome extension and refresh the page. Please check "chrome://extensions" page.'
				app.start=false
				app.exit=false
				return;
			}
			if(status="installed-enabled"){
				app.start=true
				app.link=false
				app.exit=false
				return
			}
		});
	}
	showChromeExtensionStatus();
	app.finish = function(){
		$window.location.href ='/marketplace'
	}
	app.begin = function() {
		mdata={}
		mdata.calc="marketplace"
		mdata.nbr = 1
		User.setCalc(mdata)
		app.disabled = true;
		app.start=false
		app.exit=true
		//$scope.style={'display':'block',"width":"100%"}
		getScreenId(function (error, sourceId, screen_constraints) {
			navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
			navigator.getUserMedia(screen_constraints, function (stream) {
				document.querySelector('video').src = URL.createObjectURL(stream);
				setTimeout(()=>{
					console.log("Stream dimensions: " + document.querySelector('video').videoWidth + "x" + document.querySelector('video').videoHeight)
					console.log("image dimensions: "+document.getElementById('imageSrc').width + "x" + document.getElementById('imageSrc').height)

					document.querySelector('video').width=document.querySelector('video').videoWidth
					document.querySelector('video').height=document.querySelector('video').videoHeight

				/*
		            var width = document.getElementById('imageSrc').width;
		            var height = document.getElementById('imageSrc').height;
		            if(document.querySelector('video').videoWidth > 1600){
		            	var canvas = document.createElement("canvas");
		            	canvas.width = 278;
			            canvas.height = 208;
			            var ctx = canvas.getContext("2d");
			            ctx.drawImage(document.getElementById('imageSrc'), 0, 0, 278, 208);
			            var dataurl = canvas.toDataURL("image/png");
			            document.getElementById('output').src = dataurl;
		            }else{
		            	var canvas = document.createElement("canvas");
		            	canvas.width = width;
			            canvas.height = height;
			            var ctx = canvas.getContext("2d");
			            ctx.drawImage(document.getElementById('imageSrc'), 0, 0, width, height);
			            var dataurl = canvas.toDataURL("image/png");
			            document.getElementById('output').src = dataurl;
		            }*/
				},500);
				
				showModal()
				$timeout(()=>{ //cv['onRuntimeInitialized']=()=>{ $timeout(()=>{
					hideModal()     	
					let imgElement = document.getElementById('imageSrc');
					video = document.getElementById('videoInput')
					canvas = document.getElementById('canvasOutput2')
					let cap = new cv.VideoCapture(video);
					b=[]	            
					FPS= 30
					function add(a, b) {
						return a + b;
					}
					function processVideo() {
						try {
							let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
							let begin = Date.now();
							cap.read(src);
							let dst2 = new cv.Mat();
							let dst3 = new cv.Mat();
							let dst4 = new cv.Mat();
							templ = cv.imread(imgElement)
							let res = new cv.Mat();
							let mask = new cv.Mat();
							cv.matchTemplate(src,templ,res,cv.TM_CCOEFF_NORMED,mask)
							let result = cv.minMaxLoc(res, mask);
							let maxPoint = result.maxLoc;						
							let rect = new cv.Rect(maxPoint.x , maxPoint.y , templ.cols, templ.rows)	
							dst2 = src.roi(rect);
							let point = new cv.Point(maxPoint.x + templ.cols, maxPoint.y + templ.rows);
							//console.log(templ.cols+" x "+templ.rows)
							let color = new cv.Scalar(255, 0, 0, 255);
							cv.rectangle(src, maxPoint, point, color, 2, cv.LINE_8, 0);
							cv.imshow('canvasOutput', src);
							cv.imshow('canvasOutput2', dst2);
							cv.threshold(dst2, dst3, 80, 255, cv.THRESH_TOZERO);
							let rect2 = new cv.Rect(10 , 44 , 310, 247)
							dst4 = dst3.roi(rect2);	
							let rect5 = new cv.Rect(10 , 70 , 340, 270)
							dst5 = dst3.roi(rect5);	
							cv.imshow('outout', dst5);
								
							let srcVec = new cv.MatVector();
							srcVec.push_back(dst4);
							let accumulate = false;
							let channels = [0];
							let histSize = [256];
							let ranges = [200, 255];
							let hist = new cv.Mat();
							let mask2 = new cv.Mat();
							let color2 = new cv.Scalar(255, 255, 255);
							let scale = 2;
							cv.calcHist(srcVec, channels, mask2, hist, histSize, ranges, accumulate);
							let result2 = cv.minMaxLoc(hist, mask2);
							let max = result2.maxVal;
							a=[]
							for (let i = 0; i < histSize[0]; i++) {
								let binVal = hist.data32F[i] * dst4.rows / max;
								a[i]=binVal
							}
							console.log(a.reduce(add,0))
							app.popup = Math.floor(result.maxVal.toFixed(2)*100)
							if(parseFloat(result.maxVal)>=0.4){								
								if(o!=0){
									if(a.reduce(add,0) != b.reduce(add,0)){
										var img = canvas.toDataURL()
										console.log('diff')
										d={}
										d.file=img
										User.saveImg(d).then(function(data){
											if (data.data.success) {
												//console.log(app.username);
												imageUrl='https://bdoteach.me/assets/img/uploads/notices/'+app.username+'.png'
												//console.log(imageUrl);
												var message = {
													app_id: "4833465f-bc24-477b-8343-2dee45220b0e",
													heading:{'en': 'BDOTeach.me - Notification system'},
													contents: {"en": "Marketplace Registration Notice"},
													chrome_web_icon:'https://www.bdoteach.me/assets/img/logo-64.png',
													firefox_icon:'https://www.bdoteach.me/assets/img/logo-64.png',
													chrome_web_image:imageUrl,
													ttl:20,
													filters:[{
														"field" : "tag", "key":"username", "relation":"=", "value":"lkhnouna"
													}]
												};    
												User.sendNotification(message).then(function(data){
													if(!data.data.success){
														app.err_msg = data.data.message
													}else{
														app.notifId= data.data.notification.id
													}
												});
											} else {
												console.log(data.data.message)
											}
										})
									}else{
										console.log('equal')
									}
								}
							}
							b=a.slice()
							o++
							let delay = 1000/FPS - (Date.now() - begin);
							setTimeout(function(){
								srcVec.delete()
								mask2.delete()
								hist.delete()
								dst2.delete()
								dst3.delete()
								dst4.delete()
								res.delete()
								mask.delete()
								src.delete()
								processVideo()	                    	
							}, delay);							
						} catch (err) {
							console.log(err);
							app.err_msg="An error occured please refresh the page"
						}
					};
					processVideo()
				},6000)
			}, function (error) {
				console.error('getScreenId error', error);
				app.err_msg="Error occured please refresh the page"
			});
		});
	};
})


