angular.module('alchemyController',['alchemyServices'])
.controller("alchemyCtrl",function(Dashboard, Alchemy, Perso, Auth, User,$timeout,$scope,$window,$interval,$location){
	var app = this
	app.Math = window.Math
	app.mobile=false
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
	app.okok=false
    $scope.location=$location
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
	app.dsbllvll = false
        app.dsblxp = false
        app.dsblqty = false
        app.dsblTime=false
        app.dsblTurn=false

        app.expCalc = false
        app.qtyCalc = false
        app.xpCalc = false
        app.timeCalc=false
        app.turnCalc=false

        app.products = {}
        app.enabled = false

        app.calculated = false
        app.calculated2= false
        app.calculated3 = false
        app.calculated4 = false

        app.disabledDR = true
        app.loading = false
        app.disabled = true


        app.scroll = false
        app.villa = false
        app.gmb = 0
        app.pearl = 0
        app.fd = 0
        app.elix = 0

        app.scroll2 = false
        app.villa2 = false
        app.gmb2 = 0
        app.pearl2 = 0
        app.fd2 = 0
        app.elix2 = 0


        

        app.prog = 0
        app.progOk = false
        app.progOk2 = false
        app.back = false

	////////////////////////////////////////// buttons
		app.time= ()=>{
			app.dsblTurn = false
			app.turnCalc=false
			app.err_msg = false
			app.dsbllvll = false
			app.dsblxp = false
			app.dsblqty = false
			app.dsblTime=true
			app.expCalc = false
			app.qtyCalc = false
			app.xpCalc = false
			app.timeCalc=true

		}
		app.lvll = function() {
			app.dsblTurn = false
			app.turnCalc=false
			app.err_msg = false
			app.dsbllvll = true
			app.dsblxp = false
			app.dsblqty = false
			app.expCalc = true
			app.qtyCalc = false
			app.xpCalc = false
			app.dsblTime=false
			app.timeCalc=false
		}
		app.xp = function() {
			app.dsblTurn = false
			app.turnCalc=false
			app.err_msg = false
			app.dsbllvll = false
			app.dsblxp = true
			app.dsblqty = false
			app.expCalc = false
			app.qtyCalc = false
			app.xpCalc = true
			app.dsblTime=false
			app.timeCalc=false
		}
		app.quantities = function() {
			app.dsblTurn = false
			app.turnCalc=false
			app.err_msg = false
			app.dsblxp = false
			app.xpCalc = false
			app.dsbllvll = false
			app.dsblqty = true
			app.expCalc = false
			app.qtyCalc = true
			app.dsblTime=false
			app.timeCalc=false
		}
		app.turn = function() {
			app.dsblTurn = true
			app.turnCalc=true
			app.err_msg = false
			app.dsblxp = false
			app.xpCalc = false
			app.dsbllvll = false
			app.dsblqty = false
			app.expCalc = false
			app.qtyCalc = false
			app.dsblTime=false
			app.timeCalc=false
		}
		Auth.getUser().then(function(data) {
            app.username = data.data.username
            Perso.getChars(app.username).then(function(data2) {
                app.disabled = false
                if (data2.data.chars != '') {
                    app.enabled = true
                    app.chars = data2.data.chars
                }
            })
        })

        Alchemy.getAll().then(function(data) {
            app.products = data.data.recipes
            NProgress.done();
        })
		qty = function(e){
            app.err_msg=""
            Alchemy.getRecipe(e.params.data.text).then(function(data) {
                rec = data.data.recipe
                var i1, i2, i3, i4, i5;
                var ing = [];
                var qt = [];
                var q1, q2, q3, q4, q5;
                var w;
                var tbl, td, tr, inpt, th;
                var e1, e2, e3, e4, e5;
                if (rec.Ingredient1 != "") {
                    ing.push(rec.Ingredient1);
                    qt.push(rec.Quanitiy1);
                    if (rec.Ingredient2 != "") {
                        ing.push(rec.Ingredient2);
                        qt.push(rec.Quanitiy2);
                        if (rec.Ingredient3 != "") {
                            ing.push(rec.Ingredient3);
                            qt.push(rec.Quanitiy3);
                            if (rec.Ingredient4 != "") {
                                ing.push(rec.Ingredient4);
                                qt.push(rec.Quanitiy4);
                                if (rec.Ingredient5 != "") {
                                    ing.push(rec.Ingredient5);
                                    qt.push(rec.Quanitiy5);
                                }
                            }
                        }
                    }
                }
                calc.innerHTML=''
                calc.innerHTML = "<div style='width:70%;background-color: rgba(0, 0, 0, .15);padding: 9.5px;border: none;margin:0 auto;text-align: center;'><i class='fa fa-exclamation-triangle'></i>&emsp;Change quantities (ingredients or product) just by entring your numbers on the desired amount cell <br> After editing press \"ENTER\" or \"TAB\" or \"Click outside the table\" to calculate:</div><br>";
                tbl = document.createElement('table');                
                tbl.setAttribute("style", "margin:0 auto;width:90%");
                var thead = document.createElement("thead");
                tr = document.createElement("tr");
                th = document.createElement("th");
                th.innerHTML = "ingerdients";
                th.setAttribute("style", 'text-align:center;width:65%');
                tr.appendChild(th);
                th = document.createElement("th");
                th.innerHTML = "amounts (editable)";
                th.setAttribute("style", 'text-align:center;width:25%');
                tr.appendChild(th);
                th=document.createElement("th")
                th.innerHTML="Icons "
                th.setAttribute("style", 'text-align:center;width:10%');
                tr.appendChild(th)
                thead.appendChild(tr);
                tbl.appendChild(thead);
                var cpt = 0;
                var tbody = document.createElement('tbody');
                for (var i = 0; i < qt.length; i++) {
                    tr = document.createElement("tr"); //line
                    for (var j = 0; j < 3; j++) {
                        td = document.createElement("td");
                        td.setAttribute("style", 'text-align:center;');
                        if (j == 0) {//0
                            td.innerHTML = ing[i]; //1st cell
                        }else if(j==2){//2
                            td.innerHTML = '<div class="ing" onmouseover="displayIngs(&quot;'+ing[i]+'&quot;)" onclick="ingToRecipe(&quot;'+ing[i]+'&quot;)" style="cursor:pointer">'+'<img src="assets/img/alchemy/'+ing[i]+'.png" height="25px" width="25px">'+'<div id="'+ing[i]+'" class="tooltiptext"></div></div>'
                        } else {//1
                            td.innerHTML = qt[i]; //second cell
                            td.setAttribute('contenteditable', 'true');
                            td.setAttribute('type', 'number');

                            td.onclick = function() {
                                var range = document.createRange();
                                range.selectNodeContents(this);
                                window.getSelection().removeAllRanges();
                                window.getSelection().addRange(range);
                            }
                            $(td).keydown(function(e) {
                                // Allow: backspace, delete, tab, escape, enter and .
                                if ($.inArray(e.keyCode, [9]) !== -1 ||
                                    // Allow: Ctrl/cmd+A
                                    (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                                    // Allow: Ctrl/cmd+C
                                    (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                                    // Allow: Ctrl/cmd+X
                                    (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
                                    // Allow: home, end, left, right
                                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                                    // let it happen, don't do anything
                                    return;
                                }
                                // Ensure that it is a number and stop the keypress
                                if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                                    e.preventDefault();
                                }
                                if (e.keyCode == 13) {                                    
                                    e.preventDefault();
                                    var org_q, org_ing;
                                    var othr_qt = [];
                                    var othr_ing = [];
                                    var tb_rows = this.parentNode.parentNode.children;
                                    var e = this.innerHTML;
                                    //recup original data
                                    for (var k = 0; k < ing.length; k++) {
                                        if (this.parentNode.firstChild.innerHTML != ing[k]) {
                                            othr_qt.push(qt[k]);
                                            othr_ing.push(ing[k]);
                                        } else {
                                            org_q = qt[k];
                                            org_ing = ing[k];
                                        }
                                    }
                                    var ratio = Math.floor(e / org_q);
                                    if (ratio >= 2) {
                                        for (var k = 0; k < ing.length; k++) {
                                            if (this.parentNode.firstChild.innerHTML != ing[k]) {
                                                tb_rows[k].children[1].innerHTML = qt[k] * ratio;
                                                this.parentNode.parentNode.lastChild.children[1].innerHTML = ratio;
                                            }
                                        }
                                    } else { //less than rinal
                                        for (var k = 0; k < ing.length; k++) {
                                            tb_rows[k].children[1].innerHTML = qt[k];
                                            this.parentNode.parentNode.lastChild.children[1].innerHTML = "1";
                                        }
                                    }
                                }
                            });
                            td.onblur = function() {
                                var org_q, org_ing;
                                var othr_qt = [];
                                var othr_ing = [];
                                var tb_rows = this.parentNode.parentNode.children;
                                var e = this.innerHTML;
                                //recup original data
                                for (var k = 0; k < ing.length; k++) {
                                    if (this.parentNode.firstChild.innerHTML != ing[k]) {
                                        othr_qt.push(qt[k]);
                                        othr_ing.push(ing[k]);
                                    } else {
                                        org_q = qt[k];
                                        org_ing = ing[k];
                                    }
                                }
                                var ratio = Math.floor(e / org_q);
                                if (ratio >= 2) {
                                    for (var k = 0; k < ing.length; k++) {
                                        if (this.parentNode.firstChild.innerHTML != ing[k]) {
                                            tb_rows[k].children[1].innerHTML = qt[k] * ratio;
                                            this.parentNode.parentNode.lastChild.children[1].innerHTML = ratio;
                                        }
                                    }
                                } else { //less than rinal
                                    for (var k = 0; k < ing.length; k++) {
                                        tb_rows[k].children[1].innerHTML = qt[k];
                                        this.parentNode.parentNode.lastChild.children[1].innerHTML = "1";
                                    }
                                }
                            };
                        }
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
                tr = document.createElement('tr');
                td = document.createElement('th');
                td.setAttribute("style", 'text-align:center;');
                td.innerHTML = "<b><i>Product:  " + rec.Recipe + "</i></b>";
                tr.appendChild(td);
                td = document.createElement('th');
                td.setAttribute("style", 'text-align:center;');
                td.innerHTML = "1";
                td.setAttribute('contenteditable', 'true');
                td.onclick = function() {
                    var range = document.createRange();
                    range.selectNodeContents(this);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                }
                $(td).keydown(function(e) {
                    // Allow: backspace, delete, tab, escape, enter and .
                    if ($.inArray(e.keyCode, [9]) !== -1 ||
                        // Allow: Ctrl/cmd+A
                        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                        // Allow: Ctrl/cmd+C
                        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                        // Allow: Ctrl/cmd+X
                        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
                        // Allow: home, end, left, right
                        (e.keyCode >= 35 && e.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
                    }
                    // Ensure that it is a number and stop the keypress
                    if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
                    }
                    if (e.keyCode == 13) {                        
                        e.preventDefault();
                    }
                });
                td.onblur = function() {
                    var org_q, org_ing;
                    var othr_qt = [];
                    var othr_ing = [];
                    var tb_rows = this.parentNode.parentNode.children;
                    var e = this.innerHTML;
                    //recup original data
                    for (var k = 0; k < ing.length; k++) {
                        if (this.parentNode.firstChild.innerHTML != ing[k]) {
                            othr_qt.push(qt[k]);
                            othr_ing.push(ing[k]);
                        } else {
                            org_q = qt[k];
                            org_ing = ing[k];
                        }
                    }

                    if (e >= 1) {
                        for (var k = 0; k < ing.length; k++) {
                            tb_rows[k].children[1].innerHTML = qt[k] * e;
                        }
                    } else { //less than rinal
                        for (var k = 0; k < ing.length; k++) {
                            tb_rows[k].children[1].innerHTML = qt[k];
                            this.innerHTML = "1";
                        }
                    }
                };
                tr.appendChild(td);
                td=document.createElement("th")

                td.innerHTML='<div class="ing" onmouseover="displayIngs(&quot;'+rec.Recipe+'&quot;)" onclick="ingToRecipe(&quot;'+rec.Recipe+'&quot;)" style="cursor:pointer">'+'<img src="assets/img/alchemy/'+rec.Recipe+'.png" height="25px" width="25px">'+'<div id="'+rec.Recipe+'" class="tooltiptext"></div></div>'
                td.setAttribute("style", 'text-align:center;');
                tr.appendChild(td)
                tbody.appendChild(tr);
                tbl.appendChild(tbody);
                tbl.setAttribute('class', 'table table-hover table-bordered table-responsive table-striped');
                calc.appendChild(tbl);
                calc.setAttribute('style','text-align: center;')
            })
            ingToRecipe(e.params.data.text)
        }
        calc = document.getElementById('calc')
        
        function testAnim(x,y) {
            $('#qtyCredit'+y).removeClass().addClass(x + ' is-negative animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
              $(this).removeClass().addClass('is-hidden')
            });
        }
    /********************************************format selects********/
        var formatRecipe = function(recipe) {
            if (!recipe.id) {
                return recipe.text;
            }
            var baseUrl = "/assets/img/alchemy";
            var $recipe = $(
                '<span><img src="' + baseUrl + '/' + recipe.element.value + '.png" class="img-flag" width="25px" height="25px"/> &emsp;' + recipe.text + '</span>'
            );
            return $recipe;
        };

        var formatOthers = function(others) {
            if (!others.id) {
                return others.text;
            }
            var $others = $(
                '<span>' + others.text + '%</span>'
            );
            return $others;
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

        var formatChars = function(char) {
            if (!char.id) {
                return char.text;
            }
            name = char.element.value.split(":")[0]
            for (var i = 0; i < app.chars.length; i++) {
                if (app.chars[i].name == name) {
                    classe = app.chars[i].class
                    clth = app.chars[i].cookingCloth
                }
            }
            var baseUrl = "/assets/img/classes";
            var $char = $(
                '<span><img src="' + baseUrl + '/' + classe + '.png" class="img-flag" width="25px" height="25px" style="filter: invert(100%);"/> &emsp;' + char.text + '&emsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i> &emsp;with : <img width="25px" height="25px" src="assets/img/clothes/alchemy.png">' + clth + '% bonus Exp</span>'
            );


            return $char;
        };
    /******************************************selects*/ 
        displayIngs = (y)=>{
            document.getElementById(y).innerHTML='<i class="fa fa-spinner fa-spin"></i>'
            Alchemy.getRecipe(y).then(function(data) {
                if(data.data.success){
                    rec = data.data.recipe
                    content ='<span><img src="assets/img/alchemy/'+rec.Recipe+'.png" height="25px" width="25px">'+rec.Recipe+'</span><br><hr class="style14"><br><table class="table table-striped" style="    background-color: transparent">'
                    var ing = [];
                    var qt = [];
                    if (rec.Ingredient1 != "") {
                        ing.push(rec.Ingredient1);
                        qt.push(rec.Quanitiy1);
                        if (rec.Ingredient2 != "") {
                            ing.push(rec.Ingredient2);
                            qt.push(rec.Quanitiy2);
                            if (rec.Ingredient3 != "") {
                                ing.push(rec.Ingredient3);
                                qt.push(rec.Quanitiy3);
                                if (rec.Ingredient4 != "") {
                                    ing.push(rec.Ingredient4);
                                    qt.push(rec.Quanitiy4);
                                    if (rec.Ingredient5 != "") {
                                        ing.push(rec.Ingredient5);
                                        qt.push(rec.Quanitiy5);
                                    }
                                }
                            }
                        }
                    }
                    for (var i = 0; i < qt.length; i++) {
                        if(qt[i] != ""){
                            content+='<tr><td><img src="assets/img/alchemy/'+ing[i]+'.png" height="25px" width="25px"></td><td>'+ing[i]+'</td><td>'+qt[i]+'</td></tr>'
                        }
                    }
                    content+="</table>"
                    arr = rec.Buff.split(",");
                    content+='<br><hr class="style14"><br><ul>'
                    for (var i = 0; i < arr.length; i++) {
                        content+='<li>'+arr[i]+'</li>'                        
                    }
                    content+='</ul>'
                    if(document.getElementById(y)){
                        document.getElementById(y).innerHTML=content
                    }
                    
                }else{
                    if(document.getElementById(y)){
                        document.getElementById(y).innerHTML=y+" is not a produced ingredient"
                    }
                }
            })
        }
        ingToRecipe = function(y){
            app.err_msg=""
            if(typeof usedIn  !== 'undefined'){
                usedIn.remove()
            }
            usedIn = document.createElement("div")
            usedIn.setAttribute('id','usedIn')
            usedIn.innerHTML = ""
            usedIn.setAttribute('style','margin-top:10px')                        
            Alchemy.getRecipe(y).then(function(data2) {                
                Alchemy.getRecipesFromIngredient(y).then(function(data3){
                    if(data3.data.success){
                        if(typeof data3.data.recipes !== 'undefined' && data3.data.recipes.length > 0){
                            usedIn.innerHTML = '<br><hr class="style14"><br><h3><b>'+y+'</b> <img src="assets/img/alchemy/'+y+'.png" height="30px" width="30px"> is also used in: </h3><br>';
                            tab=document.createElement("table")
                            tab.setAttribute('class', 'table table-hover table-bordered table-responsive');
                            tab.setAttribute("style", "margin:0 auto;width:100%");
                            tab.setAttribute('id',"possibles")
                                            //thead
                                            thead = document.createElement('thead')
                                            tr = document.createElement('tr')
                                            th = document.createElement('th')
                                            th.setAttribute("style", 'text-align:center;width:10%');
                                            th.innerHTML="icon"//icon
                                            tr.appendChild(th)
                                            th = document.createElement('th')
                                            th.setAttribute("style", 'text-align:center;width:10%');
                                            th.innerHTML="Product"//icon
                                            tr.appendChild(th)
                                            th = document.createElement('th')
                                            th.setAttribute("style", 'text-align:center;width:80%');
                                            th.innerHTML="Materials"//icon
                                            tr.appendChild(th)
                                            thead.appendChild(tr)
                                            tab.appendChild(thead)
                                            //tbody
                                            tbody=document.createElement('tbody')
                                            for (var i = 0; i < data3.data.recipes.length; i++) {
                                                rec = data3.data.recipes[i]
                                                ing = [];
                                                qt = [];
                                                if (rec.Ingredient1 != "") {
                                                    ing.push(rec.Ingredient1);
                                                    qt.push(rec.Quanitiy1);
                                                    if (rec.Ingredient2 != "") {
                                                        ing.push(rec.Ingredient2);
                                                        qt.push(rec.Quanitiy2);
                                                        if (rec.Ingredient3 != "") {
                                                            ing.push(rec.Ingredient3);
                                                            qt.push(rec.Quanitiy3);
                                                            if (rec.Ingredient4 != "") {
                                                                ing.push(rec.Ingredient4);
                                                                qt.push(rec.Quanitiy4);
                                                                if (rec.Ingredient5 != "") {
                                                                    ing.push(rec.Ingredient5);
                                                                    qt.push(rec.Quanitiy5);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if(ing.length == 5){
                                                    wid = 20
                                                }else if(ing.length == 4){
                                                    wid = 25
                                                }else if(ing.length == 3){
                                                    wid= 33.3
                                                }
                                                tr = document.createElement('tr')

                                                td=document.createElement('td')
                                                td.innerHTML='<div class="ing" onmouseover="displayIngs(&quot;'+rec.Recipe+'&quot;)" onclick="ingToRecipe(&quot;'+rec.Recipe+'&quot;)" style="cursor:pointer"><img src="assets/img/alchemy/'+rec.Recipe+'.png" height="30px" width="30px"><div id="'+rec.Recipe+'" class="tooltiptext"></div></div>'
                                                tr.appendChild(td)

                                                td=document.createElement('td')
                                                td.innerHTML=rec.Recipe
                                                tr.appendChild(td)

                                                td=document.createElement('td')
                                                tab2 = document.createElement("table")
                                                tab2.setAttribute('style','width:100%')
                                                tr2 = document.createElement('tr')                                
                                                for (var j = 0; j < ing.length; j++) {
                                                    td2= document.createElement('td')                                        
                                                    td2.setAttribute("style", 'text-align:center;width:'+wid+'%');                            
                                                    td2.innerHTML='<span class="row"><span  style="margin: 0 auto;">'+qt[j]+'&emsp;'+ing[j]+'</span</span><span class="row" onclick="ingToRecipe(&quot;'+ing[j]+'&quot;)" style="cursor:pointer;"><img style="margin: 0 auto" src="assets/img/alchemy/'+ing[j]+'.png" height="25px" width="25px"></span>'
                                                    tr2.appendChild(td2)
                                                }
                                                tab2.appendChild(tr2)
                                                td.appendChild(tab2)
                                                tr.appendChild(td)    
                                                tbody.appendChild(tr)
                                            }
                                            
                                            tab.appendChild(tbody)
                                            usedIn.appendChild(tab)
                                            calc.appendChild(usedIn)
                                            $('#possibles').DataTable({
                                                "bSort": false,
                                                aoColumns: [{
                                                    sWidth: '10%'
                                                },
                                                {
                                                    sWidth: '20%'
                                                },
                                                {
                                                    sWidth: '70%'
                                                }
                                                ]
                                            })
                                        }                    
                                    }                    
                })
                if(data2.data.success && $('.recipes3').val() != y){
                                var data = {
                                  "text": y
                                }
                                if(app.permission != 'free'){
                                    $(".recipes3").val(y)
                                    $('.recipes3').trigger('change.select2');
                                    $('.recipes3').trigger({//appelle (select -> qty)
                                        type:'select2:select',
                                        params:{
                                            data:data
                                        }
                                    });
                                }else{
                                    x=23
                                    User.getInfos().then(function(data8){
                                        if(data8.data.success){
                                            balance =data8.data.user.credits
                                            if((balance - x)<0){
                                                calc.innerHTML=""
                                                app.err_msg="Insufficient Credit, Go PRO for unlimitted calculations or let BDOTeach.me open to gain Credits!"                        
                                            }else{
                                                $(".recipes3").val(y)
                                                $('.recipes3').trigger('change.select2');
                                                $('.recipes3').trigger({//appelle (select -> qty)
                                                    type:'select2:select',
                                                    params:{
                                                        data:data
                                                    }
                                                });
                                            }
                                        }
                                    })
                                }//appelle (select -> qty)
                }                
            })
        }     

        // Qunatities
        $(".recipes3").on('select2:select', function(e) {
            mdata={}
            mdata.calc="alchemy_recipes"
            mdata.nbr = 1
            User.setCalc(mdata)
            //$(window).scrollTop(0);
            if(app.permission !== 'free'){
                qty(e)
            }else{
                x=23
                User.getInfos().then(function(data){
                    if(data.data.success){
                        balance =data.data.user.credits
                        if((balance - x)<0){
                            calc.innerHTML=""
                            app.err_msg="Insufficient Credit, Go PRO for unlimitted calculations or let BDOTeach.me open to gain Credits!"
                        }else{                            
                            Dashboard.withdraw(x).then((data2)=>{
                                if(!data2.data.success){
                                    app.err_msg = "Error !"
                                }else{
                                    testAnim('fadeOutDown',1)
                                    qty(e)  
                                }
                            })
                                                      
                        }                                                      
                    }else{
                        app.err_msg=data.data.user.error
                    }    
                }) 
            }   
        })
            

        $(".recipes").select2({
            placeholder: 'Select the recipe',
            templateResult: formatRecipe,
            templateSelection: formatRecipe,
            allowClear: true
        });
        $(".recipes2").select2({
            placeholder: 'Select the recipe',
            templateResult: formatRecipe,
            templateSelection: formatRecipe,
            allowClear: true
        });
         $(".recipes3").select2({
            placeholder: 'Select the recipe',
            templateResult: formatRecipe,
            templateSelection: formatRecipe,
            allowClear: true
        });

        $(".chars").select2({
            placeholder: 'Select a character',
            templateResult: formatChars,
            templateSelection: formatChars,
            allowClear: true
        });
        $(".chars2").select2({
            placeholder: 'Select a character',
            templateResult: formatChars,
            templateSelection: formatChars,
            allowClear: true
        });
        $(".chars").on('select2:open', function(e) {
            $('.lifes').select2({
                placeholder: 'Select the desired Rank',
                templateResult: formatLifes,
                templateSelection: formatLifes,
                allowClear: true
            }).prop("disabled", false);
        })
        app.selectClone = $(".lifes > option").clone();
        $(".chars").on('select2:select', function(e) {
            $('#lifes').empty().append(app.selectClone)
            data = e.params.data.text
            splitedName = data.split(':')
            splited2 = splitedName[1].split('%')[1].split(' ')
            app.charLvl = splited2[2] + " " + splited2[3]
            Alchemy.getAllLifeInfos().then(function(data) {
                Alchemy.getLifeInfos(app.charLvl).then(function(data2) {
                    for (var i = 0; i < data.data.lifes.length; i++) {
                        if ((parseInt(data.data.lifes[i].Xp) <= parseInt(data2.data.recipeLevel.Xp))) {
                            $(".lifes option[value='" + data.data.lifes[i].Level + "']").remove();
                        }
                    }
                })
            })
        })
        $(".lifes").select2({
            placeholder: 'Select the desired Rank',
            templateResult: formatLifes,
            templateSelection: formatLifes,
            allowClear: true
        });
        $(".others").select2({
            placeholder: 'Select exp bonus from other sources if neither listed above nor in your dashboard (event etc...)',
            templateResult: formatOthers,
            templateSelection: formatOthers,
            allowClear: true
        });

        $(".others2").select2({
            placeholder: 'Select exp bonus from other sources if neither listed above nor in your dashboard (event etc...)',
            templateResult: formatOthers,
            templateSelection: formatOthers,
            allowClear: true
        });
/******************************************Yes/no*/
        app.swiftF = function(val) {
            if (val == 'yes') {
                app.swift = true
            } else {
                app.swift = false
            }
        }
        app.scrollF = function(val) {
            if (val == 'yes') {
                app.scroll = true
            } else {
                app.scroll = false
            }
        }
        app.villaF = function(val) {
            if (val == 'yes') {
                app.villa = true
            } else {
                app.villa = false
            }
        }

        app.gmbF = function(val) {
            if (val == '0') {
                app.gmb = '0'
                app.gmbn = 0
            } else if (val == "10") {
                app.gmb = '10'
                app.gmbn = 1
            } else {
                app.gmb = '15'
                app.gmbn = 3
            }
        }

        app.pearlF = function(val) {
            if (val == '0') {
                app.pearl = '0'
            } else if (val == "10") {
                app.pearl = '10'
            } else {
                app.pearl = '15'
            }
        }

        app.elixirF = function(val) {
            app.elix = val
        }
        app.foodF = function(val) {
            app.fd = val
        }


        app.swift2F = function(val) {
            if (val == 'yes') {
                app.swift2 = true
            } else {
                app.swift2 = false
            }
        }
        app.scroll2F = function(val) {
            if (val == 'yes') {
                app.scroll2 = true
            } else {
                app.scroll2 = false
            }
        }
        app.villa2F = function(val) {
            if (val == 'yes') {
                app.villa2 = true
            } else {
                app.villa2 = false
            }
        }

        
        

        app.gmb2F = function(val) {
            if (val == '0') {
                app.gmb2 = '0'
                app.gmbn = 0
            } else if (val == "10") {
                app.gmb2 = '10'
                app.gmbn = 1
            } else {
                app.gmb2 = '15'
                app.gmbn = 3
            }
        }
        app.pearl2F = function(val) {
            if (val == '0') {
                app.pearl2 = '0'
            } else if (val == "10") {
                app.pearl2 = '10'
            } else {
                app.pearl2 = '15'
            }
        }

        app.elixir2F = function(val) {
            app.elix2 = val
        }
        app.food2F = function(val) {
            app.fd2 = val
        }

 ////////////////////********************Useful functs *****************/////////
        var toto = function(a, b, tb, w, y) {
            var i1, i2, i3, i4, i5;
            var q1, q2, q3, q4, q5;
            var tbl, tr, td, wid;
            tbl = document.createElement('table');
            tbl.setAttribute('style', 'width:100%;');
            //Alchemy.getAll().then(function(data) {
                rec = app.products
                for (var i = 0; i < rec.length; i++) {
                    if (rec[i].Recipe == b) {
                        if (rec[i].Ingredient1 != "") {
                            i1 = rec[i].Ingredient1;
                            q1 = rec[i].Quanitiy1;
                            if (rec[i].Ingredient2 != "") {
                                i2 = rec[i].Ingredient2;
                                q2 = rec[i].Quanitiy2;
                                if (rec[i].Ingredient3 != "") {
                                    i3 = rec[i].Ingredient3;
                                    q3 = rec[i].Quanitiy3;
                                    if (rec[i].Ingredient4 != "") {
                                        i4 = rec[i].Ingredient4;
                                        q4 = rec[i].Quanitiy4;
                                        if (rec[i].Ingredient5 != "") {
                                            i5 = rec[i].Ingredient5;
                                            q5 = rec[i].Quanitiy5;
                                        }
                                    }
                                }
                            }
                        }
                        q1 = a * q1;
                        q2 = a * q2;
                        q3 = a * q3;
                        q4 = a * q4;
                        q5 = a * q5;
                        if (q5 == 0 && q4 != 0 && q3 != 0 && q2 != 0 && q1 != 0) {
                            wid = 25;
                        } else if (q5 == 0 && q4 == 0 && q3 != 0 && q2 != 0 && q1 != 0) {
                            wid = 33;
                        } else if (q5 == 0 && q4 == 0 && q3 == 0 && q2 != 0 && q1 != 0) {
                            wid = 50;
                        } else if (q5 == 0 && q4 == 0 && q3 == 0 && q2 == 0 && q1 != 0) {
                            wid = 100;
                        } else {
                            wid = 20;
                        }
                        if (w == 0) {
                            if (rec[i].Ingredient1 != "") {
                                tr = document.createElement('tr');
                                tr.setAttribute('style', 'text-align:center;');
                                td = document.createElement('td');
                                td.setAttribute('style', 'width:' + wid + '%;vertical-align:middle;text-align:center');
                                td.innerHTML += "<img src='assets/img/alchemy/" + i1 + ".png' width='25px' height='25px'/>" + i1;
                                tr.appendChild(td);
                                if (rec[i].Ingredient2 != "") {
                                    td = document.createElement('td');
                                    td.setAttribute('style', 'width:' + wid + '%;vertical-align:middle;text-align:center');
                                    td.innerHTML = "<img src='assets/img/alchemy/" + i2 + ".png' width='25px' height='25px'/>" + i2;
                                    tr.appendChild(td);
                                    if (rec[i].Ingredient3 != "") {
                                        td = document.createElement('td');
                                        td.setAttribute('style', 'width:' + wid + '%;vertical-align:middle;text-align:center');
                                        td.innerHTML = "<td><img src='assets/img/alchemy/" + i3 + ".png' width='25px' height='25px'/>" + i3;
                                        tr.appendChild(td);
                                        if (rec[i].Ingredient4 != "") {
                                            td = document.createElement('td');
                                            td.setAttribute('style', 'width:' + wid + '%;vertical-align:middle;text-align:center');
                                            td.innerHTML = "<td><img src='assets/img/alchemy/" + i4 + ".png' width='25px' height='25px'/>" + i4;
                                            tr.appendChild(td);
                                            if (rec[i].Ingredient5 != "") {
                                                td = document.createElement('td');
                                                td.setAttribute('style', 'width:' + wid + '%;vertical-align:middle;text-align:center');
                                                td.innerHTML = "<td><img src='assets/img/alchemy/" + i5 + ".png' width='25px' height='25px'/>" + i5;
                                                tr.appendChild(td);

                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (rec[i].Ingredient1 != "") {
                                tr = document.createElement('tr');
                                tr.setAttribute('style', 'text-align:center;');
                                td = document.createElement('td');
                                td.setAttribute('style', 'width:' + wid + '%;vertical-align:middle;text-align:center');
                                td.innerHTML += q1;
                                tr.appendChild(td);
                                if (rec[i].Ingredient2 != "") {
                                    td = document.createElement('td');
                                    td.setAttribute('style', 'width:' + wid + '%;vertical-align:middle;text-align:center');
                                    td.innerHTML += q2;
                                    tr.appendChild(td);
                                    if (rec[i].Ingredient3 != "") {
                                        td = document.createElement('td');
                                        td.setAttribute('style', 'width:' + wid + '%;vertical-align:middle;text-align:center');
                                        td.innerHTML += q3;
                                        tr.appendChild(td);
                                        if (rec[i].Ingredient4 != "") {
                                            td = document.createElement('td');
                                            td.setAttribute('style', 'width:' + wid + '%;vertical-align:middle;text-align:center');
                                            td.innerHTML += q4;
                                            tr.appendChild(td);
                                            if (rec[i].Ingredient5 != "") {
                                                td = document.createElement('td');
                                                td.setAttribute('style', 'width:' + wid + '%;vertical-align:middle;text-align:center');
                                                td.innerHTML += q5;
                                                tr.appendChild(td);
                                            }
                                        }
                                    }
                                }
                            }
                            app.prog = (y * 100) / app.full
                            if (app.prog == 100) {
                                app.progOk = false
                                app.back = true
                                app.dsblqty = false
                                app.dsblxp = false
                            }
                        }


                    }
                }
                tbl.appendChild(tr);
                tb.appendChild(tbl);
            //});
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
        function secondsToHms(d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = (d % 3600 % 60).toFixed(1);

            var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            var sDisplay = s >= 0 ? s + (s == 1 ? " second" : " seconds") : "";
            return hDisplay + mDisplay + sDisplay; 
        }
        function progress(timeleft, timetotal, $element) {
            var progressBarWidth = timeleft * $element.width() / timetotal;
            $element.find('div').animate({ width: progressBarWidth }, 500).html(Math.floor(timeleft/60) + ":"+ timeleft%60);
            if(timeleft > 0) {
                setTimeout(function() {
                    progress(timeleft - 1, timetotal, $element);
                }, 1000);
            }
        };        
        app.stopTime = ()=>{
            $interval.cancel(interval)                    
            app.timeck = "Alchemy Session Stopped"
            app.amount2 = "0"
            app.progOk2 = false            
            app.prog = 0
            app.progOk3 = false
            app.disabledt=false
            app.prog3 = parseFloat(app.ctime*100)
            $interval.cancel(xyz)
            /*notifInf={"notif" : app.notifId, "app": "f373a3e6-fdd8-4113-b945-59f649147df5"}
            User.cancelNotification(notifInf).then(function(data){
                if(!data.data.success){
                    app.err_msg = data.data.message
                }
            })*/
            $timeout.cancel(sendnotif)
        }
        app.update = (c,r,p)=>{
            Perso.getChar(c).then(function(data) {
                if(data.data.success){
                    char =data.data.char
                    char.cookingLevel = p.toString()
                    if(r != "Your current Rank"){
                        char.cookingRank = r
                    }
                    Perso.editChar(char).then(function(data2){
                        if(data2.data.success){
                            app.success_msg = data2.data.message; // Grab success message from JSON object and redirect  
                            $timeout(function(){
                                app.disabled = true
                                $window.location.href ='/alchemy'
                            },2000)
                        }else{
                            app.disabled =false
                            app.loading = false
                            app.err_msg+=data.data.message
                        }           
                    })
                }else{
                    app.err_msg = "Error database no character found"
                }
                
            })
        }
        ////////////////////******************** EXPERIENCE *****************/////////
        app.preexperince = function(regData){
            mdata={}
            mdata.calc="alchemy_experience"
            mdata.nbr = 1
            User.setCalc(mdata)
            app.err_msg =false
            if ($(".recipes2").select2('data')[0].text == '' || !$(".recipes2").select2('data')[0].text) {
                app.disabled = false
                app.loading = false
                app.err_msg += "Select a product to cook before submiting\n"
            } else {
                recipe = $(".recipes2").select2('data')[0].text
            }
            if ($(".chars2").select2('data')[0].text == '' || !$(".chars2").select2('data')[0].text) {
                app.disabled = false
                app.loading = false
                app.err_msg += "Select the character who will cook\n"
            } else {
                char = $(".chars2").select2('data')[0].text
            }
            if ($(".others2").select2('data')[0].text == '' || !$(".others2").select2('data')[0].text) {
                other = 0
            } else {
                other = $(".others2").select2('data')[0].text
            }

            if(regData){
                if(regData.gmb2 && regData.pearl2 && regData.food2 && regData.elixir2 && regData.amount && $(".recipes2").select2('data')[0].text && $(".chars2").select2('data')[0].text){
                    if(app.permission !== 'free'){
                        experince(regData)
                    }else{
                        x=7
                        User.getInfos().then(function(data){
                            if(data.data.success){
                                balance =data.data.user.credits  
                                if((balance - x)<0){
                                    calc.innerHTML=""
                                    app.err_msg="Insufficient Credit, Go PRO for unlimitted calculations or let BDOTeach.me open to gain Credits!"
                                }else{                            
                                    Dashboard.withdraw(x).then((data2)=>{
                                        if(!data2.data.success){
                                            app.err_msg = "Error !"
                                        }else{
                                            testAnim('fadeOutDown',2)
                                            experince(regData) 
                                        }
                                    })
                                                               
                                }                                                      
                            }else{
                                app.err_msg=data.data.user.error
                            }    
                        }) 
                    }                                        
                } else {
                    app.disabled = false
                    app.loading = false
                    app.dsblqty = false
                    app.dsbllvll = false
                    app.err_msg = "Ensure the form is completed before submitting it"
                }
            } else {
                app.disabled = false
                app.loading = false
                app.dsblqty = false
                app.dsbllvll = false
                app.err_msg = "Ensure the form is completed before submitting it"
            }            
        }
        experince = function(regData) {
            app.dsblqty = true
            app.dsbllvll = true
            app.expCant = true
            app.loading = true
            app.disabled = true
            app.err_msg = ""
                    splitedName = char.split(':')
                    regData.name = splitedName[0].replace(/\s/g, '');
                    regData.percent = splitedName[1].split('%')[0].replace(/\s/g, '');
                    splited2 = splitedName[1].split('%')[1].split(' ')
                    for (var i = 0; i < app.chars.length; i++) {
                        if (app.chars[i].name == regData.name) {
                            regData.clothes = app.chars[i].cookingCloth
                        }
                    }
                    regData.level = splited2[2] + " " + splited2[3]
                    regData.recipe = recipe
                    if ($(".others2").select2('data')[0].text) {
                        regData.others = $(".others2").select2('data')[0].text
                    } else {
                        regData.others = '0'
                    }
                    if(regData.amount <= 0){
                        app.disabled = false
                        app.loading = false
                        app.err_msg += "Enter a valid batch amount (strictly positive)\n"
                    }
                    Dashboard.getexp().then(function(data) {
                        if (data.data.success) {
                            regData.accountExp = data.data.exp.exp
                            app.bonus2 = parseInt(regData.villa2) + parseInt(regData.pearl2) +parseInt(regData.scroll2) + parseInt(regData.swift2) + parseInt(regData.gmb2) + parseInt(regData.elixir2) + parseInt(regData.food2) + parseInt(regData.clothes) + parseInt(regData.others) + parseInt(regData.accountExp)
                            app.name2 = regData.name
                            app.recipe2 = regData.recipe
                            app.rank2 = regData.level
                            app.ranklevel2 = regData.percent
                            app.amount = regData.amount

                        } else {
                            regData.accountExp = '0'
                            app.disabled = false
                            app.loading = false
                            app.calculated2 = true
                            app.bonus2 = parseInt(regData.villa2) + parseInt(regData.pearl2) + parseInt(regData.scroll2) + parseInt(regData.swift2) + parseInt(regData.gmb2) + parseInt(regData.elixir2) + parseInt(regData.food2) + parseInt(regData.clothes) + parseInt(regData.others) + parseInt(regData.accountExp)
                            app.name2 = regData.name
                            app.recipe2 = regData.recipe
                            app.rank2 = regData.level
                            app.ranklevel2 = regData.percent
                            app.amount = regData.amount
                        }

                        Alchemy.getRecipe(regData.recipe).then(function(data2) {
                            fullRecipe = data2.data.recipe
                            if (data2.data.recipe.Level == "Beginner 1" || data2.data.recipe.Level == "Beginner 6") {
                                app.recipeXp2 = 400
                            } else if (data2.data.recipe.Level == "Apprentice 1" || data2.data.recipe.Level == "Apprentice 6" || data2.data.recipe.Level == "Professional 1") {
                                app.recipeXp2 = 800
                            } else if (data2.data.recipe.Level == "Artisan 1") {
                                app.recipeXp2 = 2400
                            } else if (data2.data.recipe.Level == "Professional 6") {
                                app.recipeXp2 = 2400 
                            } else {
                                if (app.recipe2.includes("Meal")) {
                                    app.recipeXp2 = 1600
                                } else {
                                    app.recipeXp2 = 1200
                                }
                            }
                            

                            app.recipeXpBonus2 = app.recipeXp2 + (app.recipeXp2 * app.bonus2) / 100
                            var m_xp = parseInt(app.recipeXpBonus2) * parseInt(regData.amount);
                            app.tot_xp = m_xp

                            var titi = [];
                            var tata=[];
                            var ff=m_xp;
                            Alchemy.getLifeInfos(app.rank2).then(function(data3) {
                                
                                    ranksLibghina = []
                                    ranksLibghina[0] = data3.data.recipeLevel
                                    ranksLibghina[0].Xp = parseInt(data3.data.recipeLevel.Xp)
                                    j = 1
                                    Alchemy.getAllLifeInfos().then(function(data4) {
                                        for (var i = 0; i < data4.data.lifes.length; i++) {
                                            if (data4.data.lifes[i].Rank == fullRecipe.Level) {
                                                fullRecipe.lvl = data4.data.lifes[i].Level //get the level                                                
                                            }
                                            if (parseInt(data4.data.lifes[i].Xp) > parseInt(data3.data.recipeLevel.Xp)) {
                                                ranksLibghina[j] = data4.data.lifes[i]
                                                ranksLibghina[j].Xp = parseInt(data4.data.lifes[i].Xp)
                                                j = j + 1
                                            }
                                        }
                                        ranksLibghina.sort(dynamicSort("Xp"))
                                        if (parseInt(fullRecipe.lvl) > parseInt(data3.data.recipeLevel.Level)) {
                                            app.err_msg += "You can not cook this dish with your current rank"
                                            app.disabled = false
                                            app.loading = false
                                            app.dsblqty = false
                                            app.dsbllvll = false
                                            app.back = true
                                            app.expCant = false
                                        } else {
                                            for (var i = 0; i < ranksLibghina.length; i++) {
                                                titi.push(ranksLibghina[i].Rank);
                                                tata.push(ranksLibghina[i].Xp);
                                            }
                                            lvl_xp = parseInt(data3.data.recipeLevel.Xp)
                                            app.remain_xp2 = parseFloat(lvl_xp - (parseInt(lvl_xp * app.ranklevel2) / 100))
                                            

                                            if(app.remain_xp2 < m_xp){                                
                                                for (var y = 0; y < tata.length; y++) {
                                                    if(y==0){
                                                        ff=ff-app.remain_xp2;
                                                    }else{
                                                        if(ff-tata[y] < 0){
                                                            break;
                                                        }
                                                        ff=ff-tata[y];
                                                    }                                                    
                                                }
                                                app.prctRnk=Math.round(((ff*100)/tata[y])*1000)/1000
                                                app.rnk = titi[y]
                                                //sp.innerHTML+=" which leads you to <b>"+Math.round(((ff*100)/tata[y])*1000)/1000+"%</b> of "+titi[y];
                                            }else{
                                                var ttt = ((m_xp*100)/tata[0]) + Math.floor(app.ranklevel2);
                                                app.prctRnk=Math.round(ttt*1000)/1000
                                                app.rnk = "Your current Rank"
                                                //sp.innerHTML+=" which is <b>"+Math.round(ttt*1000)/1000+"%</b> of your current rank percent";
                                            }
                                            app.disabled = false
                                            app.loading = false
                                            app.calculated2 = true
                                            app.dsbllvll = false
                                            app.dsblqty = false
                                    }                                    
                                })
                            })
                        })
                    })                    
        }
        ////////////////////******************** leveling *****************/////////

        app.precook = function(regData){
            mdata={}
            mdata.calc="alchemy_leveling"
            mdata.nbr = 1
            User.setCalc(mdata)
                app.err_msg =false
           if ($(".recipes").select2('data')[0].text == '' || !$(".recipes").select2('data')[0].text) {
                app.disabled = false
                app.loading = false
                app.err_msg += "Select a product to cook before submiting\n"
            } else {
                recipe = $(".recipes").select2('data')[0].text
            }
            if ($(".chars").select2('data')[0].text == '' || !$(".chars").select2('data')[0].text) {
                app.disabled = false
                app.loading = false
                app.err_msg += "Select the character who will cook\n"
            } else {
                char = $(".chars").select2('data')[0].text
            }
            if ($(".lifes").select2('data')[0].text == '' || !$(".lifes").select2('data')[0].text) {
                app.disabled = false
                app.loading = false
                app.err_msg += "Select the Rank you desire\n"
            } else {
                life = $(".lifes").select2('data')[0].text
                app.life = $(".lifes").select2('data')[0].text
            }

            if (regData) {
                    if (regData.elixir && regData.gmb && regData.food && regData.pearl && $(".recipes").select2('data')[0].text && $(".chars").select2('data')[0].text && $(".lifes").select2('data')[0].text) {
                    if(app.permission !== 'free'){
                        cook(regData)
                    }else{
                        x=13
                        User.getInfos().then(function(data){
                            if(data.data.success){
                                balance =data.data.user.credits  
                                if((balance - x)<0){
                                    calc.innerHTML=""
                                    app.err_msg="Insufficient Credit, Go PRO for unlimitted calculations or let BDOTeach.me open to gain Credits!"
                                }else{                            
                                    Dashboard.withdraw(x).then((data2)=>{
                                        if(!data2.data.success){
                                            app.err_msg = "Error !"
                                        }else{
                                            testAnim('fadeOutDown',3)
                                            cook(regData) 
                                        }
                                    })
                                                               
                                }                                                      
                            }else{
                                app.err_msg=data.data.user.error
                            }    
                        }) 
                    }                                        
                } else {
                    app.disabled = false
                    app.loading = false
                    app.dsblqty = false
                    app.dsbllvll = false
                    app.err_msg = "Ensure the form is completed before submitting it"
                }
            } else {
                app.disabled = false
                app.loading = false
                app.dsblqty = false
                app.dsbllvll = false
                app.err_msg = "Ensure the form is completed before submitting it"
            }            
        }
        cook = function(regData) {
            app.dsblqty = true
            app.dsblxp = true
            app.back = false
            app.prog = 0
            app.progOk = false
            app.loading = true
            app.disabled = true
            app.err_msg = ""
                        splitedName = char.split(':')
                        regData.name = splitedName[0].replace(/\s/g, '');
                        regData.percent = splitedName[1].split('%')[0].replace(/\s/g, '');
                        splited2 = splitedName[1].split('%')[1].split(' ')
                        for (var i = 0; i < app.chars.length; i++) {
                            if (app.chars[i].name == regData.name) {
                                regData.clothes = app.chars[i].cookingCloth
                            }
                        }
                        regData.level = splited2[2] + " " + splited2[3]
                        regData.recipe = recipe
                        if ($(".others").select2('data')[0].text) {
                            regData.others = $(".others").select2('data')[0].text
                        } else {
                            regData.others = '0'
                        }
                        Dashboard.getexp().then(function(data) {
                            if (data.data.success) {
                                regData.accountExp = data.data.exp.exp
                                app.bonus = parseInt(regData.villa) + parseInt(regData.pearl) + parseInt(regData.scroll) + parseInt(regData.swift) + parseInt(regData.gmb) + parseInt(regData.elixir) + parseInt(regData.food) + parseInt(regData.clothes) + parseInt(regData.others) + parseInt(regData.accountExp)
                                app.name = regData.name
                                app.recipe = regData.recipe
                                app.rank = regData.level
                                app.ranklevel = regData.percent

                            } else {
                                regData.accountExp = '0'
                                app.disabled = false
                                app.loading = false
                                app.calculated = true
                                app.bonus = parseInt(regData.villa) + parseInt(regData.pearl) + parseInt(regData.scroll) + parseInt(regData.swift) + parseInt(regData.gmb) + parseInt(regData.elixir) + parseInt(regData.food) + parseInt(regData.clothes) + parseInt(regData.others) + parseInt(regData.accountExp)
                                app.name = regData.name
                                app.recipe = regData.recipe
                                app.rank = regData.level
                                app.ranklevel = regData.percent
                            }
                            Alchemy.getRecipe(app.recipe).then(function(data2) {
                                app.fullRecipe = data2.data.recipe
                                if (data2.data.recipe.Level == "Beginner 1" || data2.data.recipe.Level == "Beginner 6") {
                                    app.recipeXp = 400
                                } else if (data2.data.recipe.Level == "Apprentice 1" || data2.data.recipe.Level == "Apprentice 6" || data2.data.recipe.Level == "Professional 1") {
                                    app.recipeXp = 800
                                } else if (data2.data.recipe.Level == "Artisan 1") {
                                    app.recipeXp = 2400
                                } else if (data2.data.recipe.Level == "Professional 6") {
                                    app.recipeXp = 2400 // to change after tests
                                } else {
                                    if (app.recipe.includes("Meal")) {
                                        app.recipeXp = 1600
                                    } else {
                                        app.recipeXp = 1200
                                    }
                                }
                                Alchemy.getLifeInfos(app.rank).then(function(data3) {
                                    Alchemy.getLifeInfos(life).then(function(data4) {
                                        if (parseInt(data3.data.recipeLevel.Xp) >= parseInt(data4.data.recipeLevel.Xp)) {
                                            
                                            app.err_msg += "Please select a desired rank above your current rank"
                                            app.back = true
                                            app.disabled = false
                                            app.loading = false
                                            app.dsblqty = false
                                            app.dsblxp = false
                                        } else {
                                            app.progOk = true
                                            app.disabled = false
                                            app.loading = false
                                            app.calculated = true
                                            lvl_xp = parseInt(data3.data.recipeLevel.Xp)
                                            app.remain_xp = parseFloat(lvl_xp - (parseInt(lvl_xp * app.ranklevel) / 100))
                                            app.recipeXpBonus = app.recipeXp + (app.recipeXp * app.bonus) / 100
                                            var craft_nmb = Math.ceil(app.remain_xp / app.recipeXpBonus);
                                            ranksLibghina = []
                                            j = 0

                                            Alchemy.getAllLifeInfos().then(function(data5) {
                                                for (var i = 0; i < data5.data.lifes.length; i++) {
                                                    if (data5.data.lifes[i].Rank == app.fullRecipe.Level) {
                                                        app.fullRecipe.lvl = data5.data.lifes[i].Level //get the level
                                                    }
                                                    if ((parseInt(data5.data.lifes[i].Xp) > parseInt(data3.data.recipeLevel.Xp)) && (parseInt(data5.data.lifes[i].Xp) <= parseInt(data4.data.recipeLevel.Xp))) {
                                                        ranksLibghina[j] = data5.data.lifes[i]
                                                        ranksLibghina[j].Xp = parseInt(data5.data.lifes[i].Xp)
                                                        j = j + 1
                                                    }
                                                }
                                                ranksLibghina.sort(dynamicSort("Xp"))
                                                app.full = ranksLibghina.length
                                                mdiv = document.getElementById('xpResult')
                                                mdiv.innerHTML = ""
                                                if (parseInt(app.fullRecipe.lvl) > parseInt(data3.data.recipeLevel.Level)) {
                                                    app.err_msg += "You can not cook this dish with your current rank"
                                                    app.back = true
                                                    app.disabled = false
                                                    app.loading = false
                                                    app.dsblqty = false
                                                    app.dsblxp = false
                                                } else {
                                                    mdiv.innerHTML = "<hr class='style14'><br><h3>You have the following Results</h3><br>"
                                                    var tab = document.createElement('table'),
                                                        tr, td, row, cell, th, thead, tbody;
                                                    tab.setAttribute('class', 'table table-hover table-striped table-bordered table-responsive');
                                                    tab.setAttribute("style", "width:100%;margin-top:2%");
                                                    tab.setAttribute("id", "xptable")
                                                    thead = document.createElement("thead");
                                                    tr = document.createElement('tr');
                                                    th = document.createElement('th');
                                                    th.setAttribute('style', 'vertical-align:middle;text-align:center')
                                                    tr.appendChild(th);
                                                    th.innerHTML = 'Rank';
                                                    th = document.createElement('th');
                                                    th.setAttribute('style', 'vertical-align:middle;text-align:center')
                                                    tr.appendChild(th);
                                                    th.innerHTML = 'Number of batches to move to the next rank';
                                                    th = document.createElement('th');
                                                    th.setAttribute('style', 'vertical-align:middle;text-align:center')
                                                    th.setAttribute("style", 'text-align:center;');
                                                    tr.appendChild(th);
                                                    th.innerHTML = 'Cumulative number of Materials<br>';
                                                    toto(craft_nmb, app.recipe, th, 0, 0);
                                                    th = document.createElement('th');
                                                    th.setAttribute('style', 'vertical-align:middle;text-align:center')
                                                    tr.appendChild(th);
                                                    th.innerHTML = 'Xp needed';
                                                    thead.appendChild(tr);
                                                    tab.appendChild(thead);
                                                    mdiv.appendChild(tab)
                                                    /**************************************dakchi dyal prog***/

                                                    /******************tbody first line*/
                                                    tbody = document.createElement('tbody');
                                                    tr = document.createElement('tr');
                                                    tr.setAttribute('style', 'background-color:rgba(255, 255, 255, 0.53);')
                                                    td = document.createElement('td');
                                                    td.setAttribute('style', 'vertical-align:middle;text-align:center')
                                                    tr.appendChild(td);
                                                    td.innerHTML = app.rank;
                                                    /**********************/
                                                    td = document.createElement('td');
                                                    td.setAttribute('style', 'vertical-align:middle;text-align:center')
                                                    tr.appendChild(td);
                                                    td.innerHTML = craft_nmb;
                                                    /**********************/
                                                    td = document.createElement('td');
                                                    td.setAttribute('style', 'vertical-align:middle;text-align:center')
                                                    tr.appendChild(td);
                                                    toto(craft_nmb, app.recipe, td, 1, 1);

                                                    /***************************/
                                                    td = document.createElement('td');
                                                    td.setAttribute('style', 'vertical-align:middle;text-align:center')
                                                    tr.appendChild(td);
                                                    var chiata = craft_nmb * app.recipeXpBonus - app.remain_xp;
                                                    td.innerHTML = app.remain_xp + " XP";
                                                    tbody.appendChild(tr);
                                                    /**************************tbody other lines*/
                                                    for (var i = 0; i < ranksLibghina.length; i++) {

                                                        tr = document.createElement('tr');
                                                        td = document.createElement('td');
                                                        td.setAttribute('style', 'vertical-align:middle;text-align:center')
                                                        tr.appendChild(td);
                                                        td.innerHTML = ranksLibghina[i].Rank;

                                                        td = document.createElement('td');
                                                        td.setAttribute('style', 'vertical-align:middle;text-align:center')
                                                        tr.appendChild(td);
                                                        td.innerHTML = Math.ceil((ranksLibghina[i].Xp - chiata) / app.recipeXpBonus);

                                                        td = document.createElement('td');
                                                        td.setAttribute('style', 'vertical-align:middle;text-align:center')
                                                        tr.appendChild(td);
                                                        toto(Math.ceil((ranksLibghina[i].Xp - chiata) / app.recipeXpBonus), app.recipe, td, 1, i + 1);

                                                        td = document.createElement('td');
                                                        td.setAttribute('style', 'vertical-align:middle;text-align:center')
                                                        tr.appendChild(td);
                                                        td.innerHTML = (ranksLibghina[i].Xp - chiata) + " XP";
                                                        tbody.appendChild(tr);
                                                        var chiata = (app.recipeXpBonus * (Math.ceil((ranksLibghina[i].Xp - chiata) / app.recipeXpBonus))) - (ranksLibghina[i].Xp - chiata);
                                                    }
                                                    tab.appendChild(tbody);
                                                    mdiv.appendChild(tab);
                                                    $('#xptable').DataTable({
                                                        "bSort": false,
                                                        aoColumns: [{
                                                                sWidth: '12%'
                                                            },
                                                            {
                                                                sWidth: '16%'
                                                            },
                                                            {
                                                                sWidth: '60%'
                                                            },
                                                            {
                                                                sWidth: '12%'
                                                            },
                                                        ]
                                                    })

                                                }
                                            })
                                        }
                                    })
                                })
                            })
                        })                                
        }
////////////////////******************** Time *****************/////////
         ////////////////////********************time food*****************/////////
        if($window.localStorage['fd31']){
            app.fd3 = $window.localStorage['fd31']
        }else{
            app.fd3 = 0
            $window.localStorage['fd31'] = 0
        }
        app.food3F = function(val) {
            app.fd3 = val
            $window.localStorage['fd31'] = val
        }
        app.checkfd30 = function(){
            if(app.fd3 == "0" ){
                return true
            }
            else return false
        }
        app.checkfd31 = function(){
            if(app.fd3 == "-0.3" ){
                return true
            }
            else return false
        }
        app.checkfd32 = function(){
            if(app.fd3 == "-0.5" ){
                return true
            }
            else return false
        }
    ////////////////////********************time clothes*****************/////////
        if($window.localStorage['ck2']){
            app.ck = $window.localStorage['ck2']
        }else{
            app.ck = 0
            $window.localStorage['ck2'] = 0
        }
        app.ckclothesF = function(val) {
            app.ck = val
            $window.localStorage['ck2'] = val
        }
        app.checkck0 = function(){
            if(app.ck == "0" ){
                return true
            }
            else return false
        }
        app.checkck1 = function(){
            if(app.ck == "-1" ){
                return true
            }
            else return false
        }
        app.checkck2 = function(){
            if(app.ck == "-2" ){
                return true
            }
            else return false
        }
        app.checkck3 = function(){
            if(app.ck == "-3" ){
                return true
            }
            else return false
        }
        app.checkck4 = function(){
            if(app.ck == "-4" ){
                return true
            }
            else return false
        }
        app.checkck5 = function(){
            if(app.ck == "-5" ){
                return true
            }
            else return false
        }
        app.checkck7 = function(){
            if(app.ck == "-7" ){
                return true
            }
            else return false
        }
    ////////////////////********************time alchemy stone *****************/////////
        if($window.localStorage['as1']){
            app.as = $window.localStorage['as1']
            app.as2 = $window.localStorage['as1']
        }else{
            app.as = 0
            app.as2 = 0
            $window.localStorage['as1'] = 0
        }
        app.asF = function(val) {
            app.as = val
            app.as2 = parseFloat(val).toFixed(1)
            $window.localStorage['as1']=val
        }
        app.checkas0 = function(){
            if(app.as == "0" ){
                return true
            }
            else return false
        }
        app.checkas1 = function(){
            if(app.as == "-0.5" ){
                return true
            }
            else return false
        }
        app.checkas2 = function(){
            if(app.as == "-0.7" ){
                return true
            }
            else return false
        }
        app.checkas3 = function(){
            if(app.as == "-0.9" ){
                return true
            }
            else return false
        }
        app.checkas4 = function(){
            if(app.as == "-1.10" ){
                return true
            }
            else return false
        }
        app.checkas5 = function(){
            if(app.as == "-1.1" ){
                return true
            }
            else return false
        }
        app.checkas6 = function(){
            if(app.as == "-1.4" ){
                return true
            }
            else return false
        }
        app.checkas7 = function(){
            if(app.as == "-1.7" ){
                return true
            }
            else return false
        }
        app.checkas8 = function(){
            if(app.as == "-2" ){
                return true
            }
            else return false
        }
        app.checkas9 = function(){
            if(app.as == "-2.5" ){
                return true
            }
            else return false
        }
    ////////////////////********************time cooking utensil *****************/////////
        if($window.localStorage['cu1']){
            app.cu = $window.localStorage['cu1']
        }else{
            app.cu = 0
            $window.localStorage['cu1'] = 0
        }
        app.cuF = function(val){
            app.cu = val
            $window.localStorage['cu1']=val
        }
        app.checkcu0 = function(){
            if(app.cu == "-0" ){                
                return true
            }
            else return false
        }
        app.checkcu1 = function(){
            if(app.cu == "0" ){                
                return true
            }
            else return false
        }
        app.checkcu2 = function(){
            if(app.cu == "-1" ){                
                return true
            }
            else return false
        }
        app.checkcu3 = function(){
            if(app.cu == "+5" ){                
                return true
            }
            else return false
        }
        app.checkcu4 = function(){
            if(app.cu == "+6" ){                
                return true
            }
            else return false
        }
        app.checkcu5 = function(){
            if(app.cu == "+7" ){                
                return true
            }
            else return false
        }

        /*******************************************/
        app.pretime =function (regData){
            mdata={}
            mdata.calc="alchemy_time"
            mdata.nbr = 1
            User.setCalc(mdata)
            app.err_msg =false
            if(regData){
                if(regData.amount){
                    if(app.permission !== 'free'){
                        time(regData)
                    }else{
                        //time(regData)
                        app.err_msg = "Time Calculator is for PREMIUM users only" 
                    }
                }else{
                    app.disabled = false
                    app.loading = false
                    app.err_msg = "Ensure the form is completed before submitting it"
                }
            }else{
                app.disabled = false
                app.loading = false
                app.err_msg = "Ensure the form is completed before submitting it"
            }
        }
        time=function(regData){
            app.err_msg=false
            app.progOk2 = true
            app.disabledt=true
            app.prog2 = 0
            app.ctime = 1
            stone= parseFloat(regData.as)
            cloth = parseFloat(regData.alchemyclothes)
            utensil = parseFloat(regData.cu)
            food = parseFloat(regData.food3)
            all=parseFloat(stone+cloth+utensil+food+10).toFixed(1)
            console.log(all)
            if(all >= 1){
                app.ctime = all
            }
            
            var options = {  
                weekday: "long", year: "numeric", month: "short",  
                day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"  
            };
            app.amount = regData.amount
            app.timereduced = parseFloat(stone+cloth+utensil+food).toFixed(1)

            i=1
            j=0
            now = Math.floor(Date.now() / 1000)
            test=parseFloat(app.ctime*app.amount)+parseFloat(app.amount*0.5)
            finish1 = now+test
            d1 = new Date(parseFloat(finish1*1000))
            app.finishD1 = d1.toLocaleTimeString($window.navigator.language,options)
            app.timeck1 = secondsToHms(test)
            app.live =false
            app.max=parseFloat(app.ctime*100)
            
            all2=parseFloat(app.ctime*app.amount)
            asdura=parseFloat(all2/600.5)
            if(asdura<=1){
                app.asdura=1
            }else{
                app.asdura=Math.ceil(asdura)
            }

            if(regData.cu=="-0"){                
                cudura = parseFloat(app.amount/100)
                if(cudura<=1){
                    app.cuNeed=1
                }else{
                    app.cuNeed=Math.ceil(cudura)
                }
            }else if(regData.cu=="+5"){                
                cudura = parseFloat(app.amount/500)
                if(cudura<=1){
                    app.cuNeed=1
                }else{
                    app.cuNeed=Math.ceil(cudura)
                }
            }else if(regData.cu=="+7"){                
                cudura = parseFloat(app.amount/2000)
                if(cudura<=1){
                    app.cuNeed=1
                }else{
                    app.cuNeed=Math.ceil(cudura)
                }
            }else if(regData.cu=="+6"){                
                cudura = parseFloat(app.amount/1250)
                if(cudura<=1){
                    app.cuNeed=1
                }else{
                    app.cuNeed=Math.ceil(cudura)
                }
            }else if(regData.cu=="-1"){                
                cudura = parseFloat(app.amount/900)
                if(cudura<=1){
                    app.cuNeed=1
                }else{
                    app.cuNeed=Math.ceil(cudura)
                }
            }else if(regData.cu=="0"){
                cudura = parseFloat(app.amount/500)
                if(cudura<=1){
                    app.cuNeed=1
                }else{
                    app.cuNeed=Math.ceil(cudura)
                }
            } 

            function loop2(){
                var incomeTicker = parseFloat(app.ctime*100);
                xyz = $interval(function(){
                    if (incomeTicker > 0)
                        incomeTicker--;
                        app.prog3 = parseFloat(incomeTicker/app.ctime)
                    if (incomeTicker <= 0){
                        incomeTicker = parseFloat(app.ctime*100);
                        $interval.cancel(xyz);
                        return;
                    }
                }, 10,parseFloat(app.ctime*100)-1);
            }
            


            function loopme() {
                app.progOk3 = true
                app.prog3 = 0
                app.live= true
                app.amount2= app.amount-j
                finish = now+i
                d = new Date(finish*1000)
                app.finishD = d.toLocaleTimeString($window.navigator.language,options)
                app.timeck = secondsToHms(parseFloat((app.ctime*regData.amount)-i))
                //progress(app.ctime, app.ctime, $('#progressBar'));
                app.prog2 = ((app.amount-app.amount2)/app.amount)*100
                i=i+parseFloat(app.ctime)
                j++
                loop2()                
                if(app.timeck <=0){
                    $interval.cancel(interval)                    
                    app.timeck = "Alchemy Session Ended"                    
                    app.amount2 = "0"
                    app.progOk2 = false
                    app.progOk3 = false
                    app.disabledt=false
                    app.prog3 = parseFloat(app.ctime*100)
                    $interval.cancel(xyz)
                    return;
                }              
            };

            loopme()
            interval = $interval(function(){
                    loopme()               
            }, parseFloat(app.ctime*1000)+500);//500ms latency
            //d5=moment(new Date(d1)).format("YYYY-MM-DD HH:mm:ss")
            sendnotif = $timeout(function(){
                var message = {
                    app_id: "f373a3e6-fdd8-4113-b945-59f649147df5",
                    template_id:"34076e31-9e2f-4660-9f7f-2c284e1d7be4",
                    //send_after:d5,
                    ttl:20,
                    priority:10,
                    filters:[{
                        "field" : "tag", "key":"username", "relation":"=", "value":app.username
                    }]
                };    
                User.sendNotification(message).then(function(data){
                    if(!data.data.success){
                        app.err_msg = data.data.message
                    }else{
                        app.notifId= data.data.notification.id
                        alert('Alchemy session complete')
                    }
                });                
            },parseFloat((parseFloat(app.ctime*app.amount)+parseFloat(app.amount*0.5))*1000))
            app.calculated3 = true            
        }
      ///////////////////---------------------Byproduct--------------------//////////
        app.preturn =function (regData){
            mdata={}
            mdata.calc="alchemy_byproduct"
            mdata.nbr = 1
            User.setCalc(mdata)
            app.err_msg =false
            if(regData){
                if(regData.amount){
                    if(app.permission !== 'free'){
                        turn(regData)
                    }else{
                        x=11
                        User.getInfos().then(function(data){
                            if(data.data.success){
                                balance =data.data.user.credits  
                                if((balance - x)<0){
                                    calc.innerHTML=""
                                    app.err_msg="Insufficient Credit, Go PRO for unlimitted calculations or let BDOTeach.me open to gain Credits!"
                                }else{                            
                                    Dashboard.withdraw(x).then((data2)=>{
                                        if(!data2.data.success){
                                            app.err_msg = "Error !"
                                        }else{
                                            testAnim('fadeOutDown',5)
                                            turn(regData) 
                                        }
                                    })                                                               
                                }                                                      
                            }else{
                                app.err_msg=data.data.user.error
                            }    
                        }) 
                    }
                }else{
                    app.disabled = false

                    app.loading = false
                    app.err_msg = "Ensure the form is completed before submitting it"
                }
            }else{
                app.disabled = false
                app.loading = false
                app.err_msg = "Ensure the form is completed before submitting it"
            }
        }
        const numberWithCommas = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        turn=(regData)=>{
            app.calculated4=true
            theo=parseFloat(regData.amount/5)
            cofminbeer=13.5
            cofmaxbeer=9.2
            cofmincp=15
            cofmaxcp=7
            cofminmilk=30
            cofmaxmilk=2
            cofminxp=5
            cofmaxxp=15
            cofminsilver=5
            cofmaxsilver=20

            app.beermin = "_"
            app.beermax = "_"
            app.cpmin = "_"
            app.cpmax  = "_"
            app.milkmin = "_"
            app.milkmax = "_"
            app.xpmin = "_"
            app.xpmax = "_"
            app.silvermin = "_"
            app.silvermax = "_"

            app.beerMin=Math.floor(theo-(theo*cofminbeer/100))
            app.beerMax=Math.ceil(theo+(theo*cofmaxbeer/100))
            if(app.beerMin >= 5) app.beermin = numberWithCommas(Math.floor(app.beerMin/5))
            if(app.beerMax >= 5) app.beermax = numberWithCommas(Math.ceil(app.beerMax/5))

            app.cpMin=Math.floor(theo-(theo*cofmincp/100))
            app.cpMax=Math.ceil(theo+(theo*cofmaxcp/100))
            if(app.cpMin >= 5) app.cpmin = (Math.floor(app.cpMin/5)*50)
            if(app.cpMax >= 5) app.cpmax = (Math.ceil(app.cpMax/5)*50)


            app.milkMin=Math.floor(theo-(theo*cofminmilk/100))
            app.milkMax=Math.ceil(theo+(theo*cofmaxmilk/100))
            if(app.milkMin >= 5) app.milkmin = numberWithCommas(Math.floor(app.milkMin/5))
            if(app.milkMax >= 5) app.milkmax = numberWithCommas(Math.ceil(app.milkMax/5))

            app.xpMin=Math.floor(theo-(theo*cofminxp/100))
            app.xpMax=Math.ceil(theo+(theo*cofmaxxp/100))
            if(app.xpMin >= 5) app.xpmin = (Math.floor(app.xpMin/5)*1000)
            if(app.xpMax >= 5) app.xpmax = (Math.ceil(app.xpMax/5)*1000)

            app.silverMin=Math.floor(theo-(theo*cofminsilver/100))
            app.silverMax=Math.ceil(theo+(theo*cofmaxsilver/100))
            if(app.silverMin >= 5) app.silvermin = numberWithCommas(Math.floor(app.silverMin/5)*3000)
            if(app.silverMax >= 5) app.silvermax = numberWithCommas(Math.ceil(app.silverMax/5)*3000)

        }

        app.dwwtf=function(c){
            if(c>=5){
                app.dwwt=numberWithCommas(Math.floor(c/5)*3000)
            }else{
                app.dwwt=null
            }
        }
        app.dwmif=function(c){
            if(c>=5){
                app.dwmi=numberWithCommas(Math.floor(c/5))
            }else{
                app.dwmi=null
            }
        }
        app.dwppif=function(c){
            if(c>=5){
                app.dwppi=numberWithCommas(Math.floor(c/5)*50)
            }else{
                app.dwppi=null
            }
        }
        app.toff=function(c){
            if(c>=5){
                app.tof=numberWithCommas(Math.floor(c/5)*1000)
            }else{
                app.tof=null
            }
        }
        app.ssdf=function(c){
            if(c>=5){
                app.ssd=numberWithCommas(Math.floor(c/5))
            }else{
                app.ssd=null
            }
        }
/*************--------------END--------------**********/      




   })