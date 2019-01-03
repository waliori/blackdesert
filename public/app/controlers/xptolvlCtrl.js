angular.module('xptolvlController',['rzModule'])
.controller("xptolvlCtrl",function(Cook,$scope,Auth, User){
	var app = this
	if(Auth.isLoggedIn()){
		User.getpermission().then(function(data){
			app.permission = data.data.permission
			if(data.data.permission === 'premium' || data.data.permission === 'trial' || data.data.permission === 'sa7bi' || data.data.permission === 'molchi'){
				app.okok=true
			}else{
				app.okok=false
			}
		})
	}
	mobile=(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent||navigator.vendor||window.opera.substr(0,4))) 
	if(mobile){
		app.mobile=true
	}else{
		app.mobile=false
	}  
	app.dsblcp=false
	app.dsblls=false
	app.dsblimg=false
	app.cpCalc=false
	app.lsCalc=false
	app.imgCalc=false

	app.calculated = false
	app.calculated2 = false


	app.xs=[]
	for (var i = 0; i <= 100; i++) {
		app.xs[i]=i
	}
	app.cp = ()=>{
		app.err_msg=false
		app.dsblcp=true
		app.dsblls=false
		app.cpCalc=true
		app.lsCalc=false
		app.dsblimg=false
		app.imgCalc=false
	}
	app.ls = ()=>{
		app.err_msg=false
		app.dsblcp=false
		app.dsblls=true
		app.cpCalc=false
		app.lsCalc=true
		app.dsblimg=false
		app.imgCalc=false
	}
	app.img = ()=>{
		app.err_msg=false
		app.dsblcp=false
		app.dsblls=false
		app.cpCalc=false
		app.lsCalc=false
		app.dsblimg=true
		app.imgCalc=true
	}

	function dynamicSort(property) {
		var sortOrder = 1;
		if (property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function(a, b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	}
	var formatlevels = function(levels) {
		if (!levels.id) {
			return levels.text;
		}
		var $levels = $(
			'<span>' + levels.text + '%</span>'
			);
		return $levels;
	};
	var formatLifes = function(life) {
		if (!life.id) {
			return life.text;
		}
		if (life.text.includes("Beg")) {
			var $life = $(
				'<span style="color:#adaeaf">' + life.text + '</span>'
				);
		} else if (life.text.includes("App")) {
			var $life = $(
				'<span style="color:#2b7d2a">' + life.text + '</span>'
				);
		} else if (life.text.includes("Skil")) {
			var $life = $(
				'<span style="color:#3e96b7">' + life.text + '</span>'
				);
		} else if (life.text.includes("Prof")) {
			var $life = $(
				'<span style="color:#dbde33">' + life.text + '</span>'
				);
		} else if (life.text.includes("Art")) {
			var $life = $(
				'<span style="color:#d84726">' + life.text + '</span>'
				);
		} else if (life.text.includes("Mast")) {
			var $life = $(
				'<span style="color:#cc53da">' + life.text + '</span>'
				);
		} else {
			var $life = $(
				'<span style="color:#7d532f">' + life.text + '</span>'
				);
		}
		return $life;
	};

	$(".levels").select2({
		placeholder: 'Select the profession level percentage',
		templateResult: formatlevels,
		templateSelection: formatlevels,
		allowClear: true
	});
	$(".levels2").select2({
		placeholder: 'Select the Contribution Points level percentage',
		templateResult: formatlevels,
		templateSelection: formatlevels,
		allowClear: true
	});
	$(".lifes").select2({
		placeholder: 'Select the profession level',
		templateResult: formatLifes,
		templateSelection: formatLifes,
		allowClear: true
	})

	
	app.prels= function(regData){
		app.err_msg = false
		app.lsData=regData
		mdata={}
		mdata.calc="lsConverter"
		mdata.nbr = 1
		User.setCalc(mdata)
		if(regData){
			if ($(".lifes").select2('data')[0].text == '' || !$(".lifes").select2('data')[0].text) {
				app.disabled = false
				app.loading = false
				app.err_msg = "Select a profession level before submiting\n"
			} else {

				app.lsData.life = $(".lifes").select2('data')[0].text
				app.lsData.lifeId=$(".lifes").select2('data')[0].id
			}
			if ($(".levels").select2('data')[0].text == '' || !$(".levels").select2('data')[0].text) {
				app.disabled = false
				app.loading = false
				app.err_msg = "Select a profession percetange before submiting\n"
			} else {
				app.lsData.level = $(".levels").select2('data')[0].text
			}
			if(regData.amount){
				if(app.permission !== 'free'){
					ls(app.lsData)
				}else{
					//ls(app.lsData)
					app.err_msg = "For PREMIUM users only"  
				}
			}else{
				app.disabled = false
				app.err_msg = "Ensure the form is completed before submitting it"
			}
		}else{
			app.disabled = false
			app.err_msg = "Ensure the form is completed before submitting it"
		}
	}
	


	app.precp = function(regData){		
		app.err_msg = false
		app.cpData=regData
		mdata={}
		mdata.calc="cpConverter"
		mdata.nbr = 1
		User.setCalc(mdata)
		if(regData){			
			//console.log(app.cpData)
			if(regData.amount && (regData.level || parseInt(regData.level)>=0) && (regData.percent || parseInt(regData.percent)>=0)){
				if(app.permission !== 'free'){
					cp(app.cpData)
				}else{
					//cp(app.cpData)
					app.err_msg = "For PREMIUM users only"  
				}
			}else{
				app.disabled = false
				app.err_msg = "Ensure the form is completed before submitting it"
			}
		}else{
			app.disabled = false
			app.err_msg = "Ensure the form is completed before submitting it"
		}
	}
	ls = (lsData)=>{
		if(lsData.amount && lsData.life && lsData.level){
			app.disabled = true
			var titi = [];
			var tata=[];
			var ff=lsData.amount;
			Cook.getLifeInfos(lsData.life).then(function(data3){
				ranksLibghina = []
				ranksLibghina[0] = data3.data.recipeLevel
				ranksLibghina[0].Xp = parseInt(data3.data.recipeLevel.Xp)
				j = 1
				Cook.getAllLifeInfos().then(function(data4) {
					for (var i = 0; i < data4.data.lifes.length; i++) {
						if (parseInt(data4.data.lifes[i].Xp) > parseInt(data3.data.recipeLevel.Xp)) {
							ranksLibghina[j] = data4.data.lifes[i]
							ranksLibghina[j].Xp = parseInt(data4.data.lifes[i].Xp)
							j = j + 1
						}
					}
					ranksLibghina.sort(dynamicSort("Xp"))  
					for (var i = 0; i < ranksLibghina.length; i++) {
						titi.push(ranksLibghina[i].Rank);
						tata.push(ranksLibghina[i].Xp);
					}
					lvl_xp = parseInt(data3.data.recipeLevel.Xp)
					remain_xp = parseFloat(lvl_xp - (parseInt(lvl_xp * lsData.level) / 100))
					if(remain_xp < lsData.amount){                                
						for (var y = 0; y < tata.length; y++) {
							if(y==0){
								ff=ff-remain_xp;
							}else{
								if(ff-tata[y] < 0){
									break;
								}
								ff=ff-tata[y];
							}                                                    
						}
						app.prctRnk=(Math.round((parseFloat(ff*100)/tata[y])*1000)/1000).toFixed(2)
						
						app.rnk = titi[y]
					}else{
						var ttt = (parseFloat(lsData.amount*100)/tata[0]) + parseFloat(lsData.level);
						app.prctRnk=(Math.round(ttt*1000)/1000).toFixed(2)
						app.rnk = lsData.life
					}                                                
				})
			})
			app.calculated=true
		}		
	}
	cp = (cpData)=>{		
		if(cpData.amount && (cpData.percent || parseFloat(cpData.percent)>=0) && (cpData.level || parseFloat(cpData.level)>=0)){
			console.log(cpData.percent)
			a=[]
			for(i=0;i<15;i++)a[i]={"xp":100,"lvl":i}
			for(i=15;i<30;i++)a[i]={"xp":150,"lvl":i}
			for(i=30;i<45;i++)a[i]={"xp":200,"lvl":i}
			for(i=45;i<60;i++)a[i]={"xp":250,"lvl":i}
			for(i=60;i<75;i++)a[i]={"xp":300,"lvl":i}
			for(i=75;i<90;i++)a[i]={"xp":450,"lvl":i}
			for(i=90;i<100;i++)a[i]={"xp":600,"lvl":i}
			for(i=100;i<120;i++)a[i]={"xp":800,"lvl":i}
			for(i=120;i<150;i++)a[i]={"xp":1000,"lvl":i}
			for(i=150;i<250;i++)a[i]={"xp":1200,"lvl":i}
			for(i=250;i<255;i++)a[i]={"xp":1205,"lvl":i}
			for(i=255;i<260;i++)a[i]={"xp":4820,"lvl":i}
			for(i=260;i<275;i++)a[i]={"xp":5302,"lvl":i}
			for(i=275;i<290;i++)a[i]={"xp":6362,"lvl":i}
			for(i=290;i<300;i++)a[i]={"xp":8907,"lvl":i}
			for(i=300;i<315;i++)a[i]={"xp":16033,"lvl":i}
			for(i=315;i<325;i++)a[i]={"xp":24050,"lvl":i}
			for(i=325;i<350;i++)a[i]={"xp":28860,"lvl":i}
			for(i=350;i<400;i++)a[i]={"xp":101009,"lvl":i}
			for(i=400;i<=500;i++)a[i]={"xp":606057,"lvl":i}
			b=[]
			j=0
			for (var i = 0; i < a.length; i++) {
				if(i >= cpData.level){
					b[j]=a[i]
					j++
				}
			}
			titi=[]
			tata=[]

			var ff=cpData.amount;
			for (var i = 0; i < b.length; i++) {				
				titi.push(b[i].lvl);
				tata.push(b[i].xp);
			}
			lvl_xp = parseFloat(b[0].xp)
			remain_xp = parseFloat(lvl_xp - (parseFloat(lvl_xp * cpData.percent) / 100))
			if(remain_xp < cpData.amount){                                
				for (var y = 0; y < tata.length; y++) {
					if(y==0){
						ff=ff-remain_xp;
					}else{
						if(ff-tata[y] < 0){
							break;
						}
						ff=ff-tata[y];
					}                                                    
				}
				app.prctRnk2=(((parseFloat(ff*100)/tata[y])*1000)/1000).toFixed(2)
				app.rnk2 = titi[y]
			}else{
				var ttt = (parseFloat(cpData.amount*100)/tata[0]) + parseFloat(cpData.percent);
				app.prctRnk2=((ttt*1000)/1000).toFixed(2)
				app.rnk2 = b[0].lvl
			} 
			app.calculated2=true
		}
		
	}

	app.back=()=>{
		app.err_msg=false
		app.calculated=false
		$(".lifes").val(app.lsData.lifeId).trigger('change');
		app.disabled=false
	}
	app.back2=()=>{
		app.err_msg=false
		app.cpData=null
		app.calculated2=false
		app.disabled=false
	}
	function readURL(input) {
	  if (input.files && input.files[0]) {
	    var reader = new FileReader();

	    reader.onload = function(e) {
	      app.url=e.target.result;
	      /**
		  * Trigger the app.
		  */
		  imageCropper.init(app.url);
	    }
	    reader.readAsDataURL(input.files[0]);
	  }
	}
	$("#imgInp").change(function() {
	  readURL(this);
	});

	app.slider = {
	  value: 1,
	  options: {
	    floor: 0,
	    ceil: 100,
	    step: 0.1,
    	precision: 1,
    	translate: function(value) {
	      return value+"%";
	    },
	    showSelectionBar: true,
	  }
	};
	var imageCropper = {

		ctx: document.getElementById("panel").getContext("2d"),

		image: new Image(),

		scale: 1,

		click: false,

		baseX: 0,

		baseY: 0,

		lastPointX: 104,

		lastPointY: 57,

		cutoutWidth: 0,

		windowWidth: 352,

		init: function(xxx) {
			this.image.setAttribute('crossOrigin', 'anonymous');
			this.image.src = xxx;
			this.image.onload = this.onImageLoad.bind(this);
			document.getElementById("cropImgButtn").onclick = this.showCropedImage.bind(this);
			document.getElementById("scaleSlider").oninput = this.updateScale.bind(this);
		},

  /**
   * Animation on the canvas depends on three events of mouse. down, up and move
   */
   onImageLoad: function() {
   	this.drawimage(0, 0);
   	this.ctx.canvas.onmousedown = this.onMouseDown.bind(this);
   	this.ctx.canvas.onmousemove = this.onMouseMove.bind(this);
   	this.ctx.canvas.onmouseup = this.onMouseUp.bind(this);
   },

  /**
   * Draw image on canvas, after any changes
   * @param  {[type]} x
   * @param  {[type]} y
   * @return {[type]}
   */
   drawimage: function(x, y) {
   	var w = this.ctx.canvas.width,
   	h = this.ctx.canvas.height;
   	this.ctx.clearRect(0, 0, w, h);
   	this.baseX = this.baseX + (x - this.lastPointX);
   	this.baseY = this.baseY + (y - this.lastPointY);
   	this.lastPointX = x;
   	this.lastPointY = y;
   	this.ctx.drawImage(this.image, this.baseX, this.baseY, Math.floor(this.image.width * this.scale), Math.floor(this.image.height * this.scale));
   	this.drawCutout();
   },

  /**
   * Responsible to draw the cutout over canvas, clockwise rectangle and anticlock wise rectangle, make sure a cutout.
   * @return {[type]}
   */
   drawCutout: function() {
   	this.ctx.fillStyle = 'rgba(128, 128, 128, 0.7)';
   	this.ctx.beginPath();
   	this.ctx.rect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    //Draw anti clockwise rectangle, for cutout.
    this.ctx.moveTo(this.cutoutWidth, this.cutoutWidth);
    this.ctx.lineTo(this.cutoutWidth, this.windowWidth + this.cutoutWidth);
    this.ctx.lineTo(this.cutoutWidth + this.windowWidth, this.cutoutWidth + this.windowWidth);
    this.ctx.lineTo(this.cutoutWidth + this.windowWidth, this.cutoutWidth);
    this.ctx.closePath();
    this.ctx.fill();
},

  /**
   * Get call on mouse press, make click variable to true, which will be used in mousemove events
   * It also set the point were mouse click happened.
   * @param  {[type]} e
   * @return {[type]}
   */
   onMouseDown: function(e) {
   	e.preventDefault();
   	var loc = this.windowToCanvas(e.clientX, e.clientY);
   	this.click = true;
   	this.lastPointX = loc.x;
   	this.lastPointY = loc.y;
   },

  /**
   * Track the mouse movment and draw the image accordingly, but only when clicked happened.
   * @param  {[type]} e
   * @return {[type]}
   */
   onMouseMove: function(e) {
   	e.preventDefault();
   	if (this.click) {
   		var loc = this.windowToCanvas(e.clientX, e.clientY);
   		this.drawimage(loc.x, loc.y);
   	}
   },

  /**
   * make click = false, hence no canvas draw on mousemovment.
   * @param  {[type]} e
   * @return {[type]}
   */
   onMouseUp: function(e) {
   	e.preventDefault();
   	this.click = false;
   },

  /**
   * Translate to HTML coardinates to Canvas coardinates.
   */
   windowToCanvas: function(x, y) {
   	var canvas = this.ctx.canvas;
   	var bbox = canvas.getBoundingClientRect();
   	return {
   		x: x - bbox.left * (canvas.width / bbox.width),
   		y: y - bbox.top * (canvas.height / bbox.height)
   	};
   },

  /**
   * Get the canavs, remove cutout, create image elemnet on UI.
   * @return {[type]}
   */
   showCropedImage: function() {
   	var temp_ctx, temp_canvas;
   	temp_canvas = document.createElement('canvas');
   	temp_ctx = temp_canvas.getContext('2d');
   	temp_canvas.width = this.windowWidth;
   	temp_canvas.height = this.windowWidth;
   	temp_ctx.drawImage(this.ctx.canvas, this.cutoutWidth, this.cutoutWidth, this.windowWidth, this.windowWidth, 0, 0, this.windowWidth, this.windowWidth);
   	var vData = temp_canvas.toDataURL();
   	document.getElementById('crop_result').src = vData;
   },
  /**
   * Update image zoom scale on slider movment.
   * @param  {[type]} e
   * @return {[type]}
   */
   updateScale: function(e) {
   	this.scale = e.target.value;
   	this.drawimage(this.lastPointX, this.lastPointY);
   }
};



	//window.addEventListener('DOMContentLoaded', function () {
      //var image = document.querySelector('#image');
      /*var cropper = new Cropper(image, {
      	viewMode:1,
        dragMode: 'move',
        aspectRatio: 350 / 10,
        autoCropArea: 0.65,
        restore: false,
        guides: false,
        center: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
      });*/
    //});
	NProgress.done();
})