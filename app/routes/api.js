var User = require('../models/user')
var Calc = require('../models/calc')
var Cook = require('../models/cook')
var Alchemy = require('../models/alchemy')
var Life = require('../models/life')
var Xmr = require('../models/xmr.js')
var Explife = require('../models/explife')
var Perso = require('../models/perso')
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var paypal = require('paypal-rest-sdk')
var bodyParser = require('body-parser')
var url = require('url');
var open = require('open')
var UAParser = require('ua-parser-js');
var http = require("http");
var https = require("https");
var querystring = require('querystring');
var secret2 = "3l@chb@ghit3ref"
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var requestIp = require('request-ip');
var ipaddr = require('ipaddr.js');
var disposable = require('disposable-email');
var fs = require('fs');
var path = require('path');


var Ninja = require('../models/ninja')


var options = {//sendgrid
  auth: {
    api_user: 'waliori',
    api_key: '3Otdep@55'
  }
}


var clientId = 'AbYdtcDFLypW5JGKCrg7c177FZ6vTKOmBL5uDwVqGsiQHAOXInsRJJABQhzQ_tf5PpWfYaBgycIU5q17'
var secret = 'ELcsjITuukPM8UxDBchtoT8pxl1X6EkkHVB_e3o1fl6TwpY0gS1HiUC6YSho2x9WIlnS5EMj9SPrBRpp'
//P-0BA476087C938431GGWBCCCY

paypal.configure({
  'mode': 'live', //sandbox or live
  'client_id': clientId,
  'client_secret': secret
});

var client = nodemailer.createTransport(sgTransport(options));



module.exports = function(router){
	//api/users
	//User registration

	router.post('/users', function(req,res){
		var user= new User()
		user.username = req.body.username
		user.password=req.body.password
		user.email=req.body.email
		user.tmptoken = jwt.sign(
							{username: user.username,
							email:user.email}, 
						  	secret2, 
						  	{expiresIn: '24h' })
		user.credits = 100
		user.total=100

		if (req.body.username == null || req.body.username =='' || req.body.password == null || req.body.password =='' || req.body.email == null || req.body.email =='') {
			res.json({
				success: false,
				message: 'Please complete the form before submiting it'
			})
		}else{
			user.save(function(err){
				if(err){
					if(err.errors != null){
						if(err.errors.username){
							res.json({
								success: false,
								message: err.errors.username.message
							})
						}else if(err.errors.email){
							res.json({
								success: false,
								message: err.errors.email.message
							})
						}else if(err.errors.password){
							res.json({
								success: false,
								message: err.errors.password.message
							})
						}else{
							res.json({
								success: false,
								message: err
							})
						}
					}else if(err){
						if(err.code == 11000){
							if(err.errmsg.indexOf("email") != -1){
								res.json({
									success: false,
									message: 'This email is alrady taken'
								})
							}else if(err.errmsg.indexOf("username") != -1){
								res.json({
									success: false,
									message: 'This username is alrady taken'
								})
							}
						}else{
							res.json({
								success: false,
								message: err
							})
						}
					}
					
				}else{
					var email = {
					  from: 'BdoTeach.me, no-reply@bdoteach.me',
					  to: user.email,
					  subject: 'BdoTeach.me _ Activation link',
					  text: 'Hello '+ user.username + ' thank you for registering to bdoteach.me. To complete your registration, please follow the link : http://localhost/activate/'+user.tmptoken,
					  html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=Edge"/><!--[if (gte mso 9)|(IE)]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if (gte mso 9)|(IE)]> <style type="text/css"> body{width: 600px;margin: 0 auto;}table{border-collapse: collapse;}table, td{mso-table-lspace: 0pt;mso-table-rspace: 0pt;}img{-ms-interpolation-mode: bicubic;}</style><![endif]--> <style type="text/css"> body, p, div{font-family: arial; font-size: 14px;}body{color: #9B9B9B;}body a{color: #0070CD; text-decoration: none;}p{margin: 0; padding: 0;}table.wrapper{width:100% !important; table-layout: fixed; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}img.max-width{max-width: 100% !important;}.column.of-2{width: 50%;}.column.of-3{width: 33.333%;}.column.of-4{width: 25%;}@media screen and (max-width:480px){.preheader .rightColumnContent, .footer .rightColumnContent{text-align: left !important;}.preheader .rightColumnContent div, .preheader .rightColumnContent span, .footer .rightColumnContent div, .footer .rightColumnContent span{text-align: left !important;}.preheader .rightColumnContent, .preheader .leftColumnContent{font-size: 80% !important; padding: 5px 0;}table.wrapper-mobile{width: 100% !important; table-layout: fixed;}img.max-width{height: auto !important; max-width: 480px !important;}a.bulletproof-button{display: block !important; width: auto !important; font-size: 80%; padding-left: 0 !important; padding-right: 0 !important;}.columns{width: 100% !important;}.column{display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important;}}</style> </head> <body> <center class="wrapper" data-link-color="#0070CD" data-body-style="font-size: 14px; font-family: arial; color: #9B9B9B; background-color: #FFFFFF;"> <div class="webkit"> <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF"> <tr> <td valign="top" bgcolor="#FFFFFF" width="100%"> <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td width="100%"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td><!--[if mso]> <center> <table><tr><td width="600"><![endif]--> <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center"> <tr> <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #9B9B9B; text-align: left;" bgcolor="#FFFFFF" width="100%" align="left"> <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;"> <tr> <td role="module-content"> <p>Email from http://bdoteach.me</p></td></tr></table> <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="font-size:6px;line-height:10px;background-color:#FFFFFF;padding:51px 0px 51px 0px;" valign="top" align="center"> <img class="max-width" width="480" src="http://localhost/assets/img/Screenshot_88.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:80% !important;width:80%;height:auto !important;"> </td></tr></table> <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:34px 5px 34px 5px;background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff"> <div style="text-align: center;"><span style="color:#F5A623;"><span style="font-size:22px;">Account activation link</span></span> </div><div>&nbsp;</div><div style="text-align: center;">Hello <strong>'+ user.username + '</strong><br><br>Thank you for registering to <a href="http://bdoteach.me"><strong>bdoteach.me</strong></a><br>Please click on the link below to complete your registration:<br></div></td></tr></table> <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%"><tbody><tr><td align="center" bgcolor="#ffffff" class="outer-td" style="padding:0px 0px 51px 0px;background-color:#ffffff;"><table border="0" cellpadding="0" cellspacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center;"><tbody><tr><td align="center" bgcolor="#182c3e" class="inner-td" style="-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;font-size:16px;text-align:center;background-color:inherit;"><a style="background-color:#182c3e;height:px;width:250px;font-size:16px;line-height:px;font-family:Helvetica, Arial, sans-serif;color:#ffffff;padding:12px 12px 12px 12px;text-decoration:none;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;border:1px solid #F5A623;display:inline-block;" href="http://localhost/activate/'+user.tmptoken+'" target="_blank">Activate my account</a></td></tr></tbody></table></td></tr></tbody></table> <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:0px 0px 2px 0px;" role="module-content" bgcolor="#1c2034"> </td></tr></table> <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="font-size:6px;line-height:10px;background-color:#FFFFFF;padding:36px 0px 23px 0px;" valign="top" align="center"> <img class="max-width" width="120" src="http://localhost/assets/img/Screenshot_88.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:20% !important;width:20%;height:auto !important;"> </td></tr></table> <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns"> <tr> <td style="padding:10px 5px 90px 5px;background-color:#ffffff;" bgcolor="#ffffff"><!--[if mso]> <table width="99%" align="left"><tr><td><![endif]--> <table style="padding: 0px 0px 0px 0px;" align="left" valign="top" height="100%" class="column column-0 of-1 empty"> <tr> <td class="columns--column-content"> <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:0px 0px 0px 0px;background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff"> <div style="font-size:10px;line-height:150%;margin:0;text-align:center;">[bdoteach.me]</div><div style="font-size:10px;line-height:150%;margin:0;text-align:center;">&nbsp;</div></td></tr></table> </td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table> </td></tr></table> </div></center> </body></html>'
					};

					client.sendMail(email, function(err, info){
					    if (err ) console.log(error);
					});

					res.json({
						success: true,
						message: 'Congratulation your account has been created, Please check your e-mail for activation link.'
					})
				}
			})
		}
	})

	router.post('/checkusername', function(req,res){
		User.findOne({
			username: req.body.username
		}).select('username').exec(function(err,user){
			if(err) res.json({ success: false, message: err });
			if(user){
				res.json({
					success : false,
					message : 'Username alrady taken !'
				})
			}else{
				res.json({
					success : true,
					message : 'Username available'
				})
			}
		})
	})

	router.post('/checkemail', function(req,res){
		if(!disposable.validate(req.body.email)){
			res.json({
				success : false,
				message : "Email's domain banned try again" 
			})
		}else{
			User.findOne({
				email: req.body.email
			}).select('email').exec(function(err,user){
				if(err) res.json({ success: false, message: err });
				if(user){
					res.json({
						success : false,
						message : 'E-mail alrady taken !'
					})
				}else{
					res.json({
						success : true,
						message : 'Valid e-mail'
					})
				}
			})
		}
		
	})

	router.post('/authenticate', function(req,res){
		User.findOne({
			username: req.body.username
		}).select('email username password active conn permission iat').exec(function(err,user){
			if(err) res.json({ success: false, message: err });
			if(req.body.password && req.body.username){
				if(!user){
					res.json({
						success : false,
						message : 'User does not exist'
					})
				}else if(user){
					var validPass = user.comparePass(req.body.password)
					if(!validPass){
						res.json({
							success: false,
							message: 'Your password is invalid, please try again.'
						})
					}else if (!user.active) {
						res.json({ success: false, message: 'Account is not yet activated. Please check your e-mail for activation link.', expired: true });
					} else{//hna kolchi mzyna ( log pass active)
						ipString = requestIp.getClientIp(req);
						if (ipaddr.IPv4.isValid(ipString)) {
							lip = ipString
						}else if (ipaddr.IPv6.isValid(ipString)) {
							var ip = ipaddr.IPv6.parse(ipString);
							if (ip.isIPv4MappedAddress()) {
								lip = ip.toIPv4Address().toString()
							} else {
								lip = ip//develop lovalhost only makhshach tkoun
						    	//res.json({ success: false, message: "Your ip addresse is invalid"});//hadi li vrai
						    }
						} else {
							res.json({ success: false, message: "Your ip addresse is invalid"});
						}

						if(user.permission == "premium" || user.permission == "sa7bi"){
							if(!user.conn){//mamkonikti ta fblass
								var token = jwt.sign({
										username: user.username,
										email:user.email,
										ip:lip
									}, 
									secret2, 
									{
										expiresIn: '24h' //to change in main ctrl too
									} 
								);
								jwt.verify(token, secret2, function(err, decoded) {
									if(err){
										console.log(err)
									}else{
										User.update({username: req.body.username},{
											conn : true,
											ip : lip,
											iat : decoded.iat	
										},function(err,user){
											if(err){
												console.log(err)
											}else{
												res.json({
													success: true,
													message: 'Authenticated',
													token:token
												})
											}
										})
									}
								})									
							}else{//prem o deja connect , disconnect him from the other device
								var timeStamp = new Date().getTime() / 1000	
								//console.log(parseInt(timeStamp) +" "+ parseInt(user.iat))							
								if(parseInt(timeStamp) > parseInt(user.iat)){//deja connecté o bgha ydkhol mn pc jdid

									var token = jwt.sign({
											username: user.username,
											email:user.email,
											ip:lip
										}, 
										secret2, 
										{
											expiresIn: '24h' //to change in main ctrl too
										} 
									);
									jwt.verify(token, secret2, function(err, decoded) {
										if(err){
											console.log(err)
										}else{
											User.update({username: req.body.username},{
												conn : true,
												ip : lip,
												iat : decoded.iat	
											},function(err,user){
												if(err){
													console.log(err)
												}else{
													res.json({
														success: true,
														message: 'Authenticated',
														token:token
													})
												}
											})
										}
									})
								}					
							}
						}else{//free - admin
							var token = jwt.sign({
									username: user.username,
									email:user.email,
									ip:lip
								}, 
								secret2, 
								{
									expiresIn: '24h' //to change in main ctrl too
								} 
							);
							if(!user.conn){
								User.update({username: req.body.username},{
									conn : true,
									ip : lip,
									iat : decoded.iat	
								},function(err,user){
									if(err){
										console.log(err)
									}else{
										res.json({
											success: true,
											message: 'Authenticated',
											token:token
										})
									}
								})
							}else{
								res.json({
									success: true,
									message: 'Authenticated',
									token:token
								})
							}
						}
					}
				}
			}else{
				res.json({
					success : false,
					message : 'Missing credentials'
				})
			}
		})
	})

	router.put('/activate/:token',function(req,res){
		User.findOne({
			tmptoken: req.params.token
		},function(err,user){
			if(err) res.json({ success: false, message: err });
			var token = req.params.token
			jwt.verify(token, secret2, function(err, decoded) {
				if(err){
					res.json({
						success : false,
						message : 'Activation link has expired !'
					})
				}else if(!user){
					res.json({
						success : false,
						message : 'Activation link has expired !'
					})
				}else{

					user.tmptoken = false
					user.active = true
					user.start_date = new Date()
					user.save(function(err){
						if(err){
							console.log(err)
						}else{
							var email = {
							  from: 'BdoTeach.me, no-reply@bdoteach.me',
							  to: user.email,
							  subject: 'BdoTeach.me _ Account activated',
							  text: 'Hello '+ user.username + ' your account has been activated!',
							  html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=Edge"/><!--[if (gte mso 9)|(IE)]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if (gte mso 9)|(IE)]> <style type="text/css"> body{width: 600px;margin: 0 auto;}table{border-collapse: collapse;}table, td{mso-table-lspace: 0pt;mso-table-rspace: 0pt;}img{-ms-interpolation-mode: bicubic;}</style><![endif]--> <style type="text/css"> body, p, div{font-family: arial; font-size: 14px;}body{color: #9B9B9B;}body a{color: #0070CD; text-decoration: none;}p{margin: 0; padding: 0;}table.wrapper{width:100% !important; table-layout: fixed; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}img.max-width{max-width: 100% !important;}.column.of-2{width: 50%;}.column.of-3{width: 33.333%;}.column.of-4{width: 25%;}@media screen and (max-width:480px){.preheader .rightColumnContent, .footer .rightColumnContent{text-align: left !important;}.preheader .rightColumnContent div, .preheader .rightColumnContent span, .footer .rightColumnContent div, .footer .rightColumnContent span{text-align: left !important;}.preheader .rightColumnContent, .preheader .leftColumnContent{font-size: 80% !important; padding: 5px 0;}table.wrapper-mobile{width: 100% !important; table-layout: fixed;}img.max-width{height: auto !important; max-width: 480px !important;}a.bulletproof-button{display: block !important; width: auto !important; font-size: 80%; padding-left: 0 !important; padding-right: 0 !important;}.columns{width: 100% !important;}.column{display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important;}}</style> </head> <body> <center class="wrapper" data-link-color="#0070CD" data-body-style="font-size: 14px; font-family: arial; color: #9B9B9B; background-color: #FFFFFF;"> <div class="webkit"> <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF"> <tr> <td valign="top" bgcolor="#FFFFFF" width="100%"> <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td width="100%"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td><!--[if mso]> <center> <table><tr><td width="600"><![endif]--> <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center"> <tr> <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #9B9B9B; text-align: left;" bgcolor="#FFFFFF" width="100%" align="left"> <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;"> <tr> <td role="module-content"> <p>Email from http://bdoteach.me</p></td></tr></table> <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="font-size:6px;line-height:10px;background-color:#FFFFFF;padding:51px 0px 51px 0px;" valign="top" align="center"> <img class="max-width" width="480" src="http://localhost/assets/img/Screenshot_88.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:80% !important;width:80%;height:auto !important;"> </td></tr></table> <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:34px 5px 34px 5px;background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff"> <div style="text-align: center;"><span style="color:#F5A623;"><span style="font-size:22px;">Account activated</span></span> </div><div>&nbsp;</div><div style="text-align: center;">Hello <strong>'+ user.username + '</strong><br><br>your account has been activated</div></td></tr></table> <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:0px 0px 2px 0px;" role="module-content" bgcolor="#1c2034"> </td></tr></table> <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="font-size:6px;line-height:10px;background-color:#FFFFFF;padding:36px 0px 23px 0px;" valign="top" align="center"> <img class="max-width" width="120" src="http://localhost/assets/img/Screenshot_88.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:20% !important;width:20%;height:auto !important;"> </td></tr></table> <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns"> <tr> <td style="padding:10px 5px 90px 5px;background-color:#ffffff;" bgcolor="#ffffff"><!--[if mso]> <table width="99%" align="left"><tr><td><![endif]--> <table style="padding: 0px 0px 0px 0px;" align="left" valign="top" height="100%" class="column column-0 of-1 empty"> <tr> <td class="columns--column-content"> <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:0px 0px 0px 0px;background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff"> <div style="font-size:10px;line-height:150%;margin:0;text-align:center;">[bdoteach.me]</div><div style="font-size:10px;line-height:150%;margin:0;text-align:center;">&nbsp;</div></td></tr></table> </td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table> </td></tr></table> </div></center> </body></html>'
							};

							client.sendMail(email, function(err, info){
							    if (err ) console.log(err);
							});

							res.json({
								success : true,
								message : 'Account activated !'
							})
						}
					})	
				}
			});
		})
	})

	router.post('/resend', function(req,res){//resend activation ink
		//console.log(req.body.username)
		User.findOne({
			username: req.body.username
		}).select('username password active').exec(function(err,user){
			if(err) res.json({ success: false, message: err });
			if(req.body.password && req.body.username){
				if(!user){
					res.json({
						success : false,
						message : 'User does not exist'
					})
				}else if(user){
					var validPass = user.comparePass(req.body.password)
					if(!validPass){
						res.json({
							success: false,
							message: 'Your password is invalid, please try again.'
						})
					}else if (user.active) {
						res.json({ success: false, message: 'Account is alrady activated.', expired: true });
					} else{
						res.json({
							success: true,
							user:user
						})
					}
				}
			}else{
				res.json({
					success : false,
					message : 'Missing credentials'
				})
			}
		})
	})

	// Route to send user a new activation link once credentials have been verified
	router.put('/resend', function(req, res) {
		User.findOne({ username: req.body.username }).select('username email tmptoken').exec(function(err, user) {
			if (err) res.json({ success: false, message: err }); // Throw error if cannot connect
			user.tmptoken = jwt.sign({ username: user.username, email: user.email }, secret2, { expiresIn: '24h' }); // Give the user a new token to reset password
			// Save user's new token to the database
			user.save(function(err) {
				if (err) {
					console.log(err); // If error saving user, log it to console/terminal
				} else {
					// If user successfully saved to database, create e-mail object
					var email = {
						from: 'BdoTeach.me, no-reply@bdoteach.me',
						to: user.email,
						subject: 'BdoTeach.me Activation Link Request',
						text: 'Hello ' + user.username + ', You recently requested a new account activation link. Please click on the following link to complete your activation: http://localhost/activate/' + user.tmptoken,
						html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=Edge"/><!--[if (gte mso 9)|(IE)]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if (gte mso 9)|(IE)]> <style type="text/css"> body{width: 600px;margin: 0 auto;}table{border-collapse: collapse;}table, td{mso-table-lspace: 0pt;mso-table-rspace: 0pt;}img{-ms-interpolation-mode: bicubic;}</style><![endif]--> <style type="text/css"> body, p, div{font-family: arial; font-size: 14px;}body{color: #9B9B9B;}body a{color: #0070CD; text-decoration: none;}p{margin: 0; padding: 0;}table.wrapper{width:100% !important; table-layout: fixed; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}img.max-width{max-width: 100% !important;}.column.of-2{width: 50%;}.column.of-3{width: 33.333%;}.column.of-4{width: 25%;}@media screen and (max-width:480px){.preheader .rightColumnContent, .footer .rightColumnContent{text-align: left !important;}.preheader .rightColumnContent div, .preheader .rightColumnContent span, .footer .rightColumnContent div, .footer .rightColumnContent span{text-align: left !important;}.preheader .rightColumnContent, .preheader .leftColumnContent{font-size: 80% !important; padding: 5px 0;}table.wrapper-mobile{width: 100% !important; table-layout: fixed;}img.max-width{height: auto !important; max-width: 480px !important;}a.bulletproof-button{display: block !important; width: auto !important; font-size: 80%; padding-left: 0 !important; padding-right: 0 !important;}.columns{width: 100% !important;}.column{display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important;}}</style> </head> <body> <center class="wrapper" data-link-color="#0070CD" data-body-style="font-size: 14px; font-family: arial; color: #9B9B9B; background-color: #FFFFFF;"> <div class="webkit"> <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF"> <tr> <td valign="top" bgcolor="#FFFFFF" width="100%"> <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td width="100%"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td><!--[if mso]> <center> <table><tr><td width="600"><![endif]--> <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center"> <tr> <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #9B9B9B; text-align: left;" bgcolor="#FFFFFF" width="100%" align="left"> <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;"> <tr> <td role="module-content"> <p>Email from http://bdoteach.me</p></td></tr></table> <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="font-size:6px;line-height:10px;background-color:#FFFFFF;padding:51px 0px 51px 0px;" valign="top" align="center"> <img class="max-width" width="480" src="http://localhost/assets/img/Screenshot_88.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:80% !important;width:80%;height:auto !important;"> </td></tr></table> <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:34px 5px 34px 5px;background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff"> <div style="text-align: center;"><span style="color:#F5A623;"><span style="font-size:22px;">Activation link request</span></span> </div><div>&nbsp;</div><div style="text-align: center;">Hello<strong> ' + user.username + '</strong>,<br><br>You recently requested a new account activation link. Please click on the link below to complete your activation:</div></td></tr></table> <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%"><tbody><tr><td align="center" bgcolor="#ffffff" class="outer-td" style="padding:0px 0px 51px 0px;background-color:#ffffff;"><table border="0" cellpadding="0" cellspacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center;"><tbody><tr><td align="center" bgcolor="#182c3e" class="inner-td" style="-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;font-size:16px;text-align:center;background-color:inherit;"><a style="background-color:#182c3e;height:px;width:250px;font-size:16px;line-height:px;font-family:Helvetica, Arial, sans-serif;color:#ffffff;padding:12px 12px 12px 12px;text-decoration:none;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;border:1px solid #F5A623;display:inline-block;" href="http://localhost/activate/' + user.tmptoken + '" target="_blank">Activate my account</a></td></tr></tbody></table></td></tr></tbody></table> <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:0px 0px 2px 0px;" role="module-content" bgcolor="#1c2034"> </td></tr></table> <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="font-size:6px;line-height:10px;background-color:#FFFFFF;padding:36px 0px 23px 0px;" valign="top" align="center"> <img class="max-width" width="120" src="http://localhost/assets/img/Screenshot_88.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:20% !important;width:20%;height:auto !important;"> </td></tr></table> <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns"> <tr> <td style="padding:10px 5px 90px 5px;background-color:#ffffff;" bgcolor="#ffffff"><!--[if mso]> <table width="99%" align="left"><tr><td><![endif]--> <table style="padding: 0px 0px 0px 0px;" align="left" valign="top" height="100%" class="column column-0 of-1 empty"> <tr> <td class="columns--column-content"> <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:0px 0px 0px 0px;background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff"> <div style="font-size:10px;line-height:150%;margin:0;text-align:center;">[bdoteach.me]</div><div style="font-size:10px;line-height:150%;margin:0;text-align:center;">&nbsp;</div></td></tr></table> </td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table> </td></tr></table> </div></center> </body></html>'
					};

					// Function to send e-mail to user
					client.sendMail(email, function(err, info) {
						if (err) console.log(err); // If error in sending e-mail, log to console/terminal
					});
					res.json({ success: true, message: 'Activation link has been sent to ' + user.email + '!' }); // Return success message to controller
				}
			});
		});
	});
	//********************** forgot username / reset password
	router.get('/resetusername/:email', function(req,res){
		User.findOne({ email: req.params.email }).select('username email').exec(function(err, user) {
			if(err){
				res.json({ success: false, message: err });
			}else{
				if(!req.params.email){
					res.json({ success: false, message: 'No e-mail provided' });
				}else{
					if(!user){
						res.json({ success: false, message: req.params.email+' is not registred' }); 
					}else{
						var email = {
							from: 'BdoTeach.me, no-reply@bdoteach.me',
							to: user.email,
							subject: 'BdoTeach.me Username Request',
							text: 'Hello, You recently requested your username.Your username is:' + user.username,
							html: '<p>Hello,</p><br><p>You recently requested your username.</p><p>Your username is: <strong>' + user.username + '</strong></p>'
						};

						// Function to send e-mail to user
						client.sendMail(email, function(err, info) {
							if (err) console.log(err); // If error in sending e-mail, log to console/terminal
						});
						res.json({ success: true, message: 'Username link has been sent to ' + req.params.email + '!' });
					}
				}			
			}
		})
	})

	router.put('/resetpassword', function(req,res){
		User.findOne({ username: req.body.username }).select('username active email resettoken').exec(function(err, user) {
			if(err) res.json({ success: false, message: err });
			if(!req.body.username){
				res.json({ success: false, message: 'No username provided' });
			}else{
				if(!user){
					res.json({ success: false, message: 'Username was not found' });
				}else if(!user.active){
					res.json({ success: false, message: 'Account is not yet activated. Please check your e-mail for activation link.'});
				}else{
					user.resettoken = jwt.sign({ username: user.username, email: user.email }, secret2, { expiresIn: '24h' });
					user.save(function(err){
						if(err){
							res.json({ success: false, message: err });
						}else{
							var email = {
								from: 'BdoTeach.me, no-reply@bdoteach.me',
								to: user.email,
								subject: 'BdoTeach.me _ Password Reset link request',
								text: 'Hello, You recently requested a password reset. Please follow the link : http://localhost/reset/' + user.resettoken,
								html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=Edge"/><!--[if (gte mso 9)|(IE)]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if (gte mso 9)|(IE)]> <style type="text/css"> body{width: 600px;margin: 0 auto;}table{border-collapse: collapse;}table, td{mso-table-lspace: 0pt;mso-table-rspace: 0pt;}img{-ms-interpolation-mode: bicubic;}</style><![endif]--> <style type="text/css"> body, p, div{font-family: arial; font-size: 14px;}body{color: #9B9B9B;}body a{color: #0070CD; text-decoration: none;}p{margin: 0; padding: 0;}table.wrapper{width:100% !important; table-layout: fixed; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}img.max-width{max-width: 100% !important;}.column.of-2{width: 50%;}.column.of-3{width: 33.333%;}.column.of-4{width: 25%;}@media screen and (max-width:480px){.preheader .rightColumnContent, .footer .rightColumnContent{text-align: left !important;}.preheader .rightColumnContent div, .preheader .rightColumnContent span, .footer .rightColumnContent div, .footer .rightColumnContent span{text-align: left !important;}.preheader .rightColumnContent, .preheader .leftColumnContent{font-size: 80% !important; padding: 5px 0;}table.wrapper-mobile{width: 100% !important; table-layout: fixed;}img.max-width{height: auto !important; max-width: 480px !important;}a.bulletproof-button{display: block !important; width: auto !important; font-size: 80%; padding-left: 0 !important; padding-right: 0 !important;}.columns{width: 100% !important;}.column{display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important;}}</style> </head> <body> <center class="wrapper" data-link-color="#0070CD" data-body-style="font-size: 14px; font-family: arial; color: #9B9B9B; background-color: #FFFFFF;"> <div class="webkit"> <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF"> <tr> <td valign="top" bgcolor="#FFFFFF" width="100%"> <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td width="100%"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td><!--[if mso]> <center> <table><tr><td width="600"><![endif]--> <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center"> <tr> <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #9B9B9B; text-align: left;" bgcolor="#FFFFFF" width="100%" align="left"> <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;"> <tr> <td role="module-content"> <p>Email from http://bdoteach.me</p></td></tr></table> <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="font-size:6px;line-height:10px;background-color:#FFFFFF;padding:51px 0px 51px 0px;" valign="top" align="center"> <img class="max-width" width="480" src="http://localhost/assets/img/Screenshot_88.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:80% !important;width:80%;height:auto !important;"> </td></tr></table> <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:34px 5px 34px 5px;background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff"> <div style="text-align: center;"><span style="color:#F5A623;"><span style="font-size:22px;">Password reset link</span></span> </div><div>&nbsp;</div><div style="text-align: center;"><p>Hello,</p><br><p>You recently requested a password reset. Please follow the link :</p></div></td></tr></table> <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%"><tbody><tr><td align="center" bgcolor="#ffffff" class="outer-td" style="padding:0px 0px 51px 0px;background-color:#ffffff;"><table border="0" cellpadding="0" cellspacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center;"><tbody><tr><td align="center" bgcolor="#182c3e" class="inner-td" style="-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;font-size:16px;text-align:center;background-color:inherit;"><a style="background-color:#182c3e;height:px;width:250px;font-size:16px;line-height:px;font-family:Helvetica, Arial, sans-serif;color:#ffffff;padding:12px 12px 12px 12px;text-decoration:none;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;border:1px solid #F5A623;display:inline-block;" href="http://localhost/reset/'+user.resettoken+'" target="_blank">Reset my password</a></td></tr></tbody></table></td></tr></tbody></table> <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:0px 0px 2px 0px;" role="module-content" bgcolor="#1c2034"> </td></tr></table> <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="font-size:6px;line-height:10px;background-color:#FFFFFF;padding:36px 0px 23px 0px;" valign="top" align="center"> <img class="max-width" width="120" src="http://localhost/assets/img/Screenshot_88.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:20% !important;width:20%;height:auto !important;"> </td></tr></table> <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns"> <tr> <td style="padding:10px 5px 90px 5px;background-color:#ffffff;" bgcolor="#ffffff"><!--[if mso]> <table width="99%" align="left"><tr><td><![endif]--> <table style="padding: 0px 0px 0px 0px;" align="left" valign="top" height="100%" class="column column-0 of-1 empty"> <tr> <td class="columns--column-content"> <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:0px 0px 0px 0px;background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff"> <div style="font-size:10px;line-height:150%;margin:0;text-align:center;">[bdoteach.me]</div><div style="font-size:10px;line-height:150%;margin:0;text-align:center;">&nbsp;</div></td></tr></table> </td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table> </td></tr></table> </div></center> </body></html>'
							};

							// Function to send e-mail to user
							client.sendMail(email, function(err, info) {
								if (err) console.log(err); // If error in sending e-mail, log to console/terminal
							});
							res.json({ success: true, message: 'Password reset link has been sent to ' + user.email + '!' });
						}
					})
				}
			}
			
		})
	})

	router.get('/resetpassword/:token', function(req, res) {
		User.findOne({ resettoken: req.params.token }).select().exec(function(err, user) {
			if (err) res.json({ success: false, message: err }); // Throw err if cannot connect
			var token = req.params.token; // Save user's token from parameters to variable
			// Function to verify token
			jwt.verify(token, secret2, function(err, decoded) {
				if (err) {
					res.json({ success: false, message: 'Password link expired' }); // Token has expired or is invalid
				} else {
					if (!user) {
						res.json({ success: false, message: 'Password link expired' }); // Token is valid but not no user has that token anymore
					} else {
						res.json({ success: true, user: user }); // Return user object to controller
					}
				}
			});
		});
	});


	router.put('/savepassword', function(req, res) {
		User.findOne({ username: req.body.username }).select('username email password resettoken').exec(function(err, user) {
			if (err) res.json({ success: false, message: err }); // Throw error if cannot connect
			if (req.body.password == null || req.body.password == '') {
				res.json({ success: false, message: 'Password not provided' });
			} else {
				user.password = req.body.password; // Save user's new password to the user object
				user.resettoken = false; // Clear user's resettoken 
				// Save user's new data
				user.save(function(err) {
					if (err) {
						res.json({ success: false, message: err });
					} else {
						// Create e-mail object to send to user
						var email = {
							from: 'BdoTeach.me, no-reply@bdoteach.me',
							to: user.email,
							subject: 'BdoTeach.me reset password',
							text: 'Hello ' + user.username + ', This e-mail is to notify you that your password was recently reset at bdoteach.me',
							html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=Edge"/><!--[if (gte mso 9)|(IE)]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if (gte mso 9)|(IE)]> <style type="text/css"> body{width: 600px;margin: 0 auto;}table{border-collapse: collapse;}table, td{mso-table-lspace: 0pt;mso-table-rspace: 0pt;}img{-ms-interpolation-mode: bicubic;}</style><![endif]--> <style type="text/css"> body, p, div{font-family: arial; font-size: 14px;}body{color: #9B9B9B;}body a{color: #0070CD; text-decoration: none;}p{margin: 0; padding: 0;}table.wrapper{width:100% !important; table-layout: fixed; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}img.max-width{max-width: 100% !important;}.column.of-2{width: 50%;}.column.of-3{width: 33.333%;}.column.of-4{width: 25%;}@media screen and (max-width:480px){.preheader .rightColumnContent, .footer .rightColumnContent{text-align: left !important;}.preheader .rightColumnContent div, .preheader .rightColumnContent span, .footer .rightColumnContent div, .footer .rightColumnContent span{text-align: left !important;}.preheader .rightColumnContent, .preheader .leftColumnContent{font-size: 80% !important; padding: 5px 0;}table.wrapper-mobile{width: 100% !important; table-layout: fixed;}img.max-width{height: auto !important; max-width: 480px !important;}a.bulletproof-button{display: block !important; width: auto !important; font-size: 80%; padding-left: 0 !important; padding-right: 0 !important;}.columns{width: 100% !important;}.column{display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important;}}</style> </head> <body> <center class="wrapper" data-link-color="#0070CD" data-body-style="font-size: 14px; font-family: arial; color: #9B9B9B; background-color: #FFFFFF;"> <div class="webkit"> <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF"> <tr> <td valign="top" bgcolor="#FFFFFF" width="100%"> <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td width="100%"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td><!--[if mso]> <center> <table><tr><td width="600"><![endif]--> <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center"> <tr> <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #9B9B9B; text-align: left;" bgcolor="#FFFFFF" width="100%" align="left"> <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;"> <tr> <td role="module-content"> <p>Email from http://bdoteach.me</p></td></tr></table> <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="font-size:6px;line-height:10px;background-color:#FFFFFF;padding:51px 0px 51px 0px;" valign="top" align="center"> <img class="max-width" width="480" src="http://localhost/assets/img/Screenshot_88.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:80% !important;width:80%;height:auto !important;"> </td></tr></table> <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:34px 5px 34px 5px;background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff"> <div style="text-align: center;"><span style="color:#F5A623;"><span style="font-size:22px;">Reset Password Successful</span></span> </div><div>&nbsp;</div><div style="text-align: center;">Hello<strong> ' + user.username + '</strong>,<br><br>This e-mail is to notify you that your password was recently reset at bdoteach.me</div></td></tr></table> <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:0px 0px 2px 0px;" role="module-content" bgcolor="#1c2034"> </td></tr></table> <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="font-size:6px;line-height:10px;background-color:#FFFFFF;padding:36px 0px 23px 0px;" valign="top" align="center"> <img class="max-width" width="120" src="http://localhost/assets/img/Screenshot_88.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:20% !important;width:20%;height:auto !important;"> </td></tr></table> <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns"> <tr> <td style="padding:10px 5px 90px 5px;background-color:#ffffff;" bgcolor="#ffffff"><!--[if mso]> <table width="99%" align="left"><tr><td><![endif]--> <table style="padding: 0px 0px 0px 0px;" align="left" valign="top" height="100%" class="column column-0 of-1 empty"> <tr> <td class="columns--column-content"> <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:0px 0px 0px 0px;background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff"> <div style="font-size:10px;line-height:150%;margin:0;text-align:center;">[bdoteach.me]</div><div style="font-size:10px;line-height:150%;margin:0;text-align:center;">&nbsp;</div></td></tr></table> </td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table> </td></tr></table> </div></center> </body></html>'
						};
						// Function to send e-mail to the user
						client.sendMail(email, function(err, info) {
							if (err) console.log(err); // If error with sending e-mail, log to console/terminal
						});
						res.json({ success: true, message: 'Password has been reset!' }); // Return success message
					}
				});
			}
		});
	});
	
	router.use(function(req,res,next){
		var token = req.body.token || req.body.query || req.headers['x-access-token']
		if(token){
			jwt.verify(token, secret2, function(err, decoded) {
				if(err){
					res.json({
						success : false,
						message : 'Invalid token'
					})
				}else{
					res.header('Access-Control-Allow-Origin','bdoteach.me')
					res.header('Access-Control-Allow-Methods','GET')
					res.header('Access-Control-Allow-Headers','Content-Type')
					req.decoded = decoded
					next()
				}
			});
		}else{
			res.json({
					success : false,
					message : 'Not logged in'
				})
		}
		
	})

	router.post('/me', function(req,res){
		res.send(req.decoded)
	})
	router.get('/getdbuser', function(req,res){
		User.findOne({username : req.decoded.username},function(err,user){
			if(err){
				console.log(err)
				res.json({ success: false, message: err });
			}
			if(!user){
				res.json({
					success : false,
					message : 'No user found' //propablement jamais nwasslo hna
				})
			}else{
				res.json({
					success : true,
					iat : user.iat,
					conn:user.conn,
					ip:user.ip
				})
			}
		})
	})
	/*************************************************************************/
	router.get('/deco',function(req,res){
		User.update({username: req.decoded.username},{
			conn : false,
			ip:""
		},function(err,user){
			if(err){
				console.log(err)
			}else{
				res.json({
					success: true,
					message: 'Disconnected'
				})
			}
		})
	})
	router.get('/getip', function(req,res){
		ipString = requestIp.getClientIp(req);
		if (ipaddr.IPv4.isValid(ipString)) {
		 	res.json({ success: true, ip: ipString})
		}else if (ipaddr.IPv6.isValid(ipString)) {
		  	var ip = ipaddr.IPv6.parse(ipString);
		  	if (ip.isIPv4MappedAddress()) {
		  		lip = ip.toIPv4Address().toString()
		  		res.json({ success: true, ip: lip})
		    	//console.log(ip.toIPv4Address().toString()+" is IPv4")
		  	} else {
		    	res.json({ success: false, message: "ip addresse is invalid"});
		  	}
		} else {
		 	res.json({ success: false, message: "ip addresse is invalid"});
		}
	})
	router.post('/payinfos',function(req,res){
		User.findOne({ username: req.decoded.username }).select().exec(function(err, user) {
			if(err) res.json({ success: false, message: err });
			if (!user) {
				res.json({ success: false, message: 'No user found' });
			} else {
				res.json({ success: true, user: user});
			}	
		})
	})
	router.get('/renewToken/:username',function(req,res){
		User.findOne({ username: req.params.username }).select('username email password').exec(function(err, user) {
			if(err) res.json({ success: false, message: err });
			if (!user) {
				res.json({ success: false, message: 'No user found' });
			} else {
				var newToken = jwt.sign(
					{username: user.username,
					email:user.email}, 
					secret2, 
					{expiresIn: '24h' } //to change in main ctrl too
				);
				res.json({
					success: true,
					message: 'Session renewed',
					token:newToken
				})
			}	
		})
	})

	router.get('/permission',function(req,res){
		User.findOne({username : req.decoded.username},function(err,user){
			if(err){
				console.log(err)
				res.json({ success: false, message: err });
			}
			if(!user){
				res.json({
					success : false,
					message : 'No user found' //propablement jamais nwasslo hna
				})
			}else{
				res.json({
					success : true,
					permission : user.permission
				})
			}
		})
	})

	router.get('/payment',function(req,res){//create agreement 
		var username = req.decoded.username
		//begin l3ab
		var billingPlan = "P-0WH49457FF8705804SYMM7II"//to chnage after creating a proper plan
	    var isoDate = new Date();
	    isoDate.setSeconds(isoDate.getSeconds() + 50);
	    var c = isoDate.toISOString().slice(0, 19) + 'Z';
	    var billingAgreementAttributes = {
	        "name": "Bdoteach.me Premium Membership",
	        "description": "Advanced BDO calculators and notifications system Premium Membership",
	        "start_date": c,
	        "plan": {
	            "id": billingPlan
	        },
	        "payer": {
	            "payment_method": "paypal"
	        }
	    };
	    var links = {};

		//end l3ab and begin ssa7
	    paypal.billingAgreement.create(billingAgreementAttributes, function (error, billingAgreement){
	      if (error){
	        console.error(JSON.stringify(error));
	        res.json({ success: false, message: err })
	      } else {
	        // Capture HATEOAS links
	        billingAgreement.links.forEach(function(linkObj){
	          links[linkObj.rel] = {
	            href: linkObj.href,
	            method: linkObj.method
	          };
	        })

	        // If redirect url present, send them to ctrlr
	        if (links.hasOwnProperty('approval_url')){
	            for (var index = 0; index < billingAgreement.links.length; index++) {
	                if (billingAgreement.links[index].rel === 'approval_url') {
	                    var approval_url = billingAgreement.links[index].href;
	                    res.json({
							success: true,
							token: require('url').parse(approval_url, true).query.token,
							url:approval_url,
							username: username
						})
	                }
	            }
	        } else {
	          	res.json({
					success: false,
					token: "error payment"
				})
	        }
	      }
	    });		
	})

	router.get('/success/:token',function(req,res){
		var token = req.params.token;
		//console.log(req.params)
		/*res.json({
			success : false,
			message : req.params //propablement jamais nwasslo hna
		})*/
	    paypal.billingAgreement.execute(token, {}, function (error, billingAgreement){
	      if (error){
	        res.json({
				success : false,
				message : "Error payment probably invalid token "
			})
	        //res.json({ success: false, message: err });or;
	      } else {
	        User.findOne({username : req.decoded.username},function(err,user){
				if(err){
					console.log(err)
					res.json({ success: false, message: err });
				}
				if(!user){
					res.json({
						success : false,
						message : 'No user found' //propablement jamais nwasslo hna
					})
				}else{
					user.permission="premium"
					user.billingAgreementId=billingAgreement.id
					user.subscriptionState = billingAgreement.state
					user.lastPaymentDate = billingAgreement.agreement_details.last_payment_date
					user.save(function(err) {
						if (err) {
							console.log(err); // Log error to console
	                    } else {
							res.json({ success: true, bA:billingAgreement, message: 'Paymenet successful, you are now a Premium user' }); // Return success
	                    }
	                });
				}
			})
	      }
	    });
	})
	router.get('/getagreement/:id',function(req,res){
		var billingAgreementId = req.params.id;
		paypal.billingAgreement.get(billingAgreementId, function (error, billingAgreement) {
		    if (error) {
		        console.log(error);
		        res.json({
		    		success:false,
		    		message:error
		    	})
		    } else {
		    	res.json({
		    		success:true,
		    		billingAgreement:billingAgreement
		    	})
		    }
		});
	})
	router.get('/getagreementid/',function(req,res){
		User.findOne({username : req.decoded.username}).select('username email password billingAgreementId').exec(function(err,user){
			if(err){
				console.log(err)
				res.json({ success: false, message: err });
			}
			if(!user){
				res.json({
					success : false,
					message : 'No user found' //propablement jamais nwasslo hna
				})
			}else{
				res.json({ success: true, user:user }); // Return success
			}
		})
	})

	router.get("/removesubs/:state",function(req,res){
		User.findOne({username : req.decoded.username},function(err,user){
			if(err){
				res.json({ success: false, message: err });
			}
			if(!user){
				res.json({
					success : false,
					message : 'No user found' //propablement jamais nwasslo hna
				})
			}else{
				user.permission="free"
				user.subscriptionState = req.params.state
				user.save(function(err) {
					if (err) {
						res.json({ success: false, message: err });
	                } else {
						res.json({ success: true, user:user, message: 'Subscription ended, you have now a Free account' }); // Return success
	                }
	            });
			}
		})
	})
	router.put('/modifypassword',function(req,res){
		User.findOne({ username: req.body.username }).select('username email password').exec(function(err, user) {
			if (err) res.json({ success: false, message: err }); // Throw error if cannot connect			
			if (req.body.password == null || req.body.password == '') {
				res.json({ success: false, message: 'Password not provided' });
			} else {
				var validPass = user.comparePass(req.body.previousPassword)
				if(!validPass){
					res.json({ success: false, message: 'Old password provided does not match the account password' });
				}else{
					user.password = req.body.password; // Save user's new password to the user object 
					// Save user's new data
					user.save(function(err) {
						if (err) {
							res.json({ success: false, message: err });
						} else {												
							res.json({ success: true, message: 'Password has been changed!' }); // Return success message
						}
					});
				}			
			}
		});
	})

	router.put('/modifyemail',function(req,res){
		User.findOne({email: req.body.email}).select('email').exec(function(err2,user2){
			if(err2) res.json({ success: false, message: err2 });
			if(user2){
				res.json({
					success : false,
					message : 'This email is already registered, please select a new one'
				})
			}else{							
				User.findOne({ username: req.body.username }).select('username email password').exec(function(err, user) {
					if (err) res.json({ success: false, message: err }); // Throw error if cannot connect			
					if (req.body.password == null || req.body.password == '') {
						res.json({ success: false, message: 'Password not provided' });
					}else{
						var validPass = user.comparePass(req.body.password)
						if(!validPass){
							res.json({ success: false, message: 'Your password is invalid, please try again.' });
						}else{
							user.email = req.body.email; // Save user's new email to the user object 
							user.password=req.body.password
							user.save(function(err) {
								if (err) {
									res.json({ success: false, message: err });
									console.log(err)
								} else {												
									res.json({ success: true, message: 'Email has been changed!' }); // Return success message
								}
							});
						}			
					}
				});
			}
		})		
	})

	router.get('/cancelagreement/:id',function(req,res){
		var billingAgreementId = req.params.id
		var cancel_note = {
		    "note": "Canceling the agreement between "+req.decoded.username+" and bdoteach.me"
		};
		paypal.billingAgreement.cancel(billingAgreementId, cancel_note, function (error, response) {
		    if (error) {
		        res.json({ success: false, message: error });
		    } else {
		        User.findOne({username : req.decoded.username}).select().exec(function(err,user){
					if(err){
						console.log(err)
						res.json({ success: false, message: err });
					}
					if(!user){
						res.json({
							success : false,
							message : 'No user found' //propablement jamais nwasslo hna
						})
					}else{
						//console.log(response)
						user.permission="free"
						user.billingAgreementId=billingAgreementId
						user.subscriptionState = "Cancelled"
						user.save(function(err) {
							if (err) {
								console.log(err);// Log error to console
								res.json({ success: false, message: err }); 
					        } else {
								res.json({ success: true, user:user, message: 'Subscription Canceled, you have now a Free account' }); // Return success
					        }
					    });
					}
				})
		    }
		});
	})

	router.get('/getcookingrecipe/:recipe',function(req,res){
		var recipe = req.params.recipe
		Cook.findOne({Recipe : recipe},function(err,recipe){
		    if(err){
				console.log(err)
				res.json({ success: false, message: err });
			}
			if(!recipe){
				res.json({
					success : false,
					message : 'No recipe found' 
				})
			}else{		
				res.json({ success: true, recipe:recipe});
			}
		})
	})
	router.get('/getalchemyrecipe/:recipe',function(req,res){
		var recipe = req.params.recipe
		Alchemy.findOne({Recipe : recipe},function(err,recipe){
		    if(err){
				console.log(err)
				res.json({ success: false, message: err });
			}
			if(!recipe){
				res.json({
					success : false,
					message : 'No recipe found' 
				})
			}else{		
				res.json({ success: true, recipe:recipe});
			}
		})
	})
	router.get('/getrecipesfromingredient/:ingredient',function(req,res){
		var ingredient = req.params.ingredient
		var field="Ingredient"+1
		Cook.find({ $or: [ { Ingredient1: ingredient },
		{ Ingredient2: ingredient },
		{ Ingredient3: ingredient },
		{ Ingredient4: ingredient },
		{ Ingredient5: ingredient } ] } ,function(err,recipes){
		    if(err){
				console.log(err)
				res.json({ success: false, message: err });
			}
			if(!recipes){
				res.json({
					success : false,
					message : 'No recipes found' 
				})
			}else{
				res.json({ success: true, recipes:recipes});
			}
		})
	})
	router.get('/getrecipesfromingredient2/:ingredient',function(req,res){
		var ingredient = req.params.ingredient
		var field="Ingredient"+1
		Alchemy.find({ $or: [ { Ingredient1: ingredient },
		{ Ingredient2: ingredient },
		{ Ingredient3: ingredient },
		{ Ingredient4: ingredient },
		{ Ingredient5: ingredient } ] } ,function(err,recipes){
		    if(err){
				console.log(err)
				res.json({ success: false, message: err });
			}
			if(!recipes){
				res.json({
					success : false,
					message : 'No recipes found' 
				})
			}else{
				res.json({ success: true, recipes:recipes});
			}
		})
	})

	router.get('/getlifeinfos/:rank',function(req,res){
		var rank = req.params.rank
		Life.findOne({Rank:rank},function(err,recipeLevel){
				if(err){
					console.log(err)
					res.json({ success: false, message: err });
				}
				if(!recipeLevel){
					res.json({
					success : false,
					message : 'No rcpLvl found'
				})
				}else{					
					res.json({ success: true, recipeLevel:recipeLevel});
				}
		})
	})
	
	router.get('/getallcooking',function(req,res){
		Cook.find({},null,{sort:{Recipe:1}},function(err,recipes){
				if(err){
					console.log(err)
					res.json({ success: false, message: err });
				}
				if(!recipes){
					res.json({
					success : false,
					message : 'No cooking products found' 
				})
				}else{					
					res.json({ success: true, recipes:recipes});
				}
		})
	})
	router.get('/getallalchemy',function(req,res){
		Alchemy.find({},null,{sort:{Recipe:1}},function(err,recipes){
				if(err){
					console.log(err)
					res.json({ success: false, message: err });
				}
				if(!recipes){
					res.json({
					success : false,
					message : 'No alchemy products found' 
				})
				}else{					
					res.json({ success: true, recipes:recipes});
				}
		})
	})
	router.get('/getalllifeinfos',function(req,res){
		Life.find({},null,{sort:{Rank:1}},function(err,lifes){
				if(err){
					console.log(err)
					res.json({ success: false, message: err });
				}
				if(!lifes){
					res.json({
					success : false,
					message : 'No life infos found' //propablement jamais nwasslo hna
				})
				}else{					
					res.json({ success: true, lifes:lifes});
				}
		})
	})
	
	router.post('/addchar',function(req,res){
		var perso= new Perso()

		perso.name = req.body.name
		perso.user=req.body.username

		perso.class=req.body.class
		perso.level=req.body.level

		perso.gatheringRank=req.body.gr
		perso.gatheringLevel=req.body.gp

		perso.processingRank=req.body.pr
		perso.processingLevel=req.body.pp

		perso.alchemyRank=req.body.ar
		perso.alchemyLevel=req.body.ap

		perso.cookingRank=req.body.cr
		perso.cookingLevel=req.body.cp

		perso.cookingCloth=req.body.cookingclothes
		perso.alchemyCloth=req.body.alchemyclothes
		perso.gatheringCloth=req.body.gatheringclothes
		perso.processingCloth=req.body.processingclothes

		if (req.body.username == null || req.body.username =='' || req.body.name == null || req.body.name =='' || req.body.class == null || req.body.class =='' || req.body.level == null || req.body.level =='' || req.body.gr == null || req.body.gr =='' || req.body.gp == null || req.body.gp =='' || req.body.ar == null || req.body.ar =='' || req.body.ap == null || req.body.ap =='' || req.body.cr == null || req.body.cr =='' || req.body.cp == null || req.body.cp =='' || req.body.pr == null || req.body.pr =='' || req.body.pp == null || req.body.pp =='' || req.body.cookingclothes =='' || req.body.cookingclothes == null || req.body.gatheringclothes =='' || req.body.gatheringclothes == null || req.body.alchemyclothes =='' || req.body.alchemyclothes == null || req.body.processingclothes =='' || req.body.processingclothes == null) {
			res.json({
				success: false,
				message: 'Please complete the form before submiting it'
			})
		}else{
			perso.save(function(err){
				if(err){
					if(err.code == 11000){
							if(err.errmsg.indexOf("name") != -1){
								res.json({
									success: false,
									message: "This character's name is alrady taken"
								})
							}
						}else{
							res.json({
								success: false,
								message: err
							})
						}
				}else{
					res.json({
						success: true,
						message: 'Character added successfully'
					})
				}
			})
		}
	})
	router.get('/getchars/:username',function(req,res){
		Perso.find({user:req.params.username},function(err,chars){
				if(err){
					console.log(err)
					res.json({ success: false, message: err });
				}
				if(!chars){
					res.json({
					success : false,
					message : 'No character found' //propablement jamais nwasslo hna
				})
				}else{					
					res.json({ success: true, chars:chars});
				}
		})
	})
	router.get('/getrankfromlvl/:rank',function(req,res){
		Life.findOne({Level : req.params.rank},function(err,life){
			if(err){
					console.log(err)
					res.json({ success: false, message: err });
				}
				if(!life){
					res.json({
					success : false,
					message : 'No life found' //propablement jamais nwasslo hna
				})
				}else{					
					res.json({ success: true, life:life});
				}
		})
	})
	router.get('/getchar/:name',function(req,res){
		Perso.findOne({user:req.decoded.username, name:req.params.name},function(err,char){
				if(err){
					console.log(err)
					res.json({ success: false, message: err });
				}
				if(!char){
					res.json({
					success : false,
					message : 'No character found' //propablement jamais nwasslo hna sauf ila khna badal smyat f url
				})
				}else{					
					res.json({ success: true, char:char});
				}
		})
	})
	router.post("/editchar",function(req,res){
		Perso.findOne({name:req.body.name, user:req.body.user } ,function(err,char){
			if(err){
				console.log(err)
				res.json({ success: false, message: err });
			}
			if(!char){
				res.json({
					success : false,
					message : 'No character found' //propablement jamais nwasslo hna
				})
			}else{
				if (req.body.user == null || req.body.user =='' || req.body.name == null || req.body.name =='' || req.body.class == null || req.body.class =='' || req.body.level == null || req.body.level =='' || req.body.gatheringRank == null || req.body.gatheringRank =='' || req.body.gatheringLevel == null || req.body.gatheringLevel =='' || req.body.alchemyRank == null || req.body.alchemyRank =='' || req.body.alchemyLevel == null || req.body.alchemyLevel =='' || req.body.cookingRank == null || req.body.cookingRank =='' || req.body.cookingLevel == null || req.body.cookingLevel =='' || req.body.processingRank == null || req.body.processingRank =='' || req.body.processingLevel == null || req.body.processingLevel =='') {
					res.json({
						success: false,
						message: 'Please complete the form before submiting it'
					})
				}else{
					char.level=req.body.level

					char.gatheringRank=req.body.gatheringRank
					char.gatheringLevel=req.body.gatheringLevel

					char.processingRank=req.body.processingRank
					char.processingLevel=req.body.processingLevel

					char.alchemyRank=req.body.alchemyRank
					char.alchemyLevel=req.body.alchemyLevel

					char.cookingRank=req.body.cookingRank
					char.cookingLevel=req.body.cookingLevel

					char.cookingCloth=req.body.cookingCloth
					char.alchemyCloth=req.body.alchemyCloth
					char.gatheringCloth=req.body.gatheringCloth
					char.processingCloth=req.body.processingCloth



					char.save(function(err){
						if(err){
							res.json({
								success: false,
								message: err
							})
						}else{
							res.json({
								success: true,
								message: 'Character edited successfully'
							})
						}
					})
				}
				
			}
		})
	})

	router.put('/setCalc',function(req,res){
		Calc.findOne({calc:req.body.calc}, function(err,calc){
			if(err){
				console.log(err)
			}
			if(!calc){
				var calcu= new Calc()
				calcu.calc = req.body.calc
				calcu.nbr = req.body.nbr
				calcu.save(function(err){
					if(err){
						console.log(err)
					}else{
						console.log('saved')
					}
				})
			}else{
				if (req.body.calc == null || req.body.calc =='' || req.body.nbr == null || req.body.nbr =='') {
					console.log('mawssalni walo')
				}else{
					Calc.update({calc: req.body.calc},{
						nbr : parseInt(req.body.nbr)+parseInt(calc.nbr)
					},function(err,user){
						if(err){
							console.log(err)
						}else{
							console.log("updated")
						}
					})
				}
			}
		})
	})
	router.get('/gatAllCalc',function(req,res){
		Calc.find({},null,{sort:{nbr:-1}},function(err,calcs){
			if(err){
				console.log(err)
				res.json({ success: false, message: err });
			}
			if(!calcs){
				res.json({
					success : false,
					message : 'No calcs found' //propablement jamais nwasslo hna
				})
			}else{					
				res.json({ success: true, calcs:calcs});
			}
		})
	})

	router.post('/deletechar',function(req,res){
		Perso.remove(req.body,function(err){
			if (err) {
            	 res.json({ success: true,  message : err});
		    }
		    else {
		        res.json({ success: true, message:"Character deleted successfully"});
		    }
		})
	})

	router.get('/savexmr/:hps',function(req,res){
		hps=req.params.hps
		xmr = new Xmr()
		xmr.date=new Date()
		xmr.hps = hps
		xmr.save(function(err){
			if(err){
				res.json({
					success: false,
					message: err
				})
			}else{
				res.json({
					success: true,
					message: 'hps added successfully'
				})
			}
		})
	})
	router.post('/expuser',function(req,res){
		all = parseInt(req.body.pets)+parseInt(req.body.valuepack)+parseInt(req.body.guild)
		Explife.findOne({user:req.decoded.username},function(err,chars){
				if(err){
					console.log(err)
					res.json({ success: false, message: err });
				}
				if(!chars){
					var explife= new Explife()
					explife.user = req.decoded.username
					explife.exp = all
					if (req.body.pets == null || req.body.pets =='' || req.body.valuepack == null || req.body.valuepack =='' || req.body.guild == null || req.body.guild =='') {
						res.json({
							success: false,
							message: 'Please complete the form before submiting it'
						})
					}else{
						explife.save(function(err){
							if(err){
								res.json({
									success: false,
									message: err
								})									
							}else{
								res.json({
									success: true,
									message: 'Exp modifiers saved successfully'
								})
							}
						})
					}
				
				}else{				
					chars.exp=all
					chars.save(function(err){
						if(err){
							res.json({
								success: false,
								message: err
							})
						}else{
							res.json({
								success: true,
								message: 'Exp modifers edited successfully'
							})
						}
					})
				}
		})
	})
	router.get("/getexp",function(req,res){
		Explife.findOne({user:req.decoded.username},function(err,exp){
			if(err){
				console.log(err)
				res.json({ success: false, message: err });
			}
			if(!exp){
				res.json({
					success : false,
					message : 'no exp modifier saved for this account yet' //propablement jamais nwasslo hna sauf ila khna badal smyat f url
				})
			}else{					
				res.json({ success: true, exp:exp});
			}
		})
	})
	router.get('/updatecredit/:total',function(req,res){
		User.findOne({ username: req.decoded.username }).select().exec(function(err, user) {
			if(err) res.json({ success: false, message: err });
			if (!user) {
				res.json({ success: false, message: 'No user found' });
			} else {
				cred = user.credits
				tota = user.total
				User.update({username: req.decoded.username},{
					credits : parseInt(cred)+ parseInt(req.params.total),
					total : parseInt(req.params.total)+	parseInt(user.total)
				},function(err,user){
					if(err){
						console.log(err)
					}else{
						res.json({
							success: true,
							message:"updated"
						})
					}
				})
			}	
		})		
	})
	router.get('/withdraw/:x',function(req,res){
		User.findOne({ username: req.decoded.username }).select().exec(function(err, user) {
			if(err) res.json({ success: false, message: err });
			if (!user) {
				res.json({ success: false, message: 'No user found' });
			} else {
				cred = user.credits
				withd = user.withdrawn
				//console.log(cred+" | "+req.params.x+" >>>> "+(parseInt(cred) < parseInt(req.params.x)))
				if((parseInt(cred) < parseInt(req.params.x))){
					res.json({
						success: false,
						message:"insufficient funds!"
					})
				}else{
					User.update({username: req.decoded.username},{
						credits : parseInt(cred)-parseInt(req.params.x),
						withdrawn : parseInt(withd)+parseInt(req.params.x)	
					},function(err,user){
						if(err){
							console.log(err)
						}else{
							res.json({
								success: true,
								message:"updated"
							})
						}
					})
				}
				
			}	
		})
	})
	router.get('/reset',function(req,res){
		User.findOne({ username: req.decoded.username }).select().exec(function(err, user) {
			if(err) res.json({ success: false, message: err });
			if (!user) {
				res.json({ success: false, message: 'Error, feel free to contact us to report' });
			} else {
				User.update({username: req.decoded.username},{
					credits : 0,
					total : 0,
					withdrawn : 0	
				},function(err,user){
					if(err){
						console.log(err)
					}else{
						res.json({
							success: true,
							message:"reseted"
						})
					}
				})
			}
		})
	})
	router.put("/sendnotif",function(req,res){
		  var headers = {
		    "Content-Type": "application/json; charset=utf-8",
		    "Authorization": "Basic NGI5OTY2M2EtYTdmMC00YzU1LTk2YTUtZjFmNDljYmNiOTY0"
		  };
		  
		  var options = {
		    host: "onesignal.com",
		    port: 443,
		    path: "/api/v1/notifications",
		    method: "POST",
		    headers: headers
		  };

		  var req2 = https.request(options, function(res2) {  
		    res2.on('data', function(data) {
		      console.log("Response:");
		      console.log(JSON.parse(data));
		      res.json({
		      	success: true,
		      	notification:JSON.parse(data)
		      })
		    });
		  });
		  
		  req2.on('error', function(e) {
		    console.log("ERROR:");
		    console.log(e);
		    res.json({
		      	success: false,
		      	message:e
		      })
		  });
		  
		  req2.write(JSON.stringify(req.body));
		  req2.end();
	})
	router.put("/cancelnotif",function(req,res){
		  var headers = {
		    "Authorization": "Basic NGI5OTY2M2EtYTdmMC00YzU1LTk2YTUtZjFmNDljYmNiOTY0"
		  };
		  
		  var options = {
		    host: "onesignal.com",
		    port: 443,
		    path: "/api/v1/notifications/"+req.body.notif+"?app_id="+req.body.app,
		    method: "DELETE",
		    headers: headers
		  };

		  var req2 = https.request(options, function(res2) {  
		    res2.on('data', function(data) {
		      console.log("Response:");
		      console.log(JSON.parse(data));
		      res.json({
		      	success: true,
		      	notification:JSON.parse(data)
		      })
		    });
		  });
		  
		  req2.on('error', function(e) {
		    console.log("ERROR:");
		    console.log(e);
		    res.json({
		      	success: false,
		      	message:e
		      })
		  });
		  
		  req2.write(JSON.stringify(req.body));
		  req2.end();
	})

	router.post('/postCanvas', function (req, res){
		var data = req.body.file.replace(/^data:image\/\w+;base64,/, "");
		var buf = new Buffer(data, 'base64');
		fs.writeFile('public/assets/img/uploads/notices/'+req.decoded.username+'.png', buf,(err)=>{
			if (err) {
				console.log(err);
				res.json({
			      	success: false,
			      	message:'Error saving the notice'
			      })
			}
			res.json({
		      	success: true,
		      	message:'The file has been saved!'
		      })
		});	
	})
	router.get('/trialend',function(req,res){
		User.update({username: req.decoded.username},{
			permission:'free'	
		},function(err,user){
			if(err){
				console.log(err)
			}else{
				res.json({
					success: true,
					message: 'Trial ended you have now a free account'
				})
			}
		})
	})
	router.post('/sendmail',function(req,res){
		var email = {
			from: req.decoded.email,
			to: 'contact@bdoteach.me',
			subject: 'bdoteach website message from '+req.decoded.username,
			text: req.body.contact_msg,
			html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=Edge"/><!--[if (gte mso 9)|(IE)]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if (gte mso 9)|(IE)]> <style type="text/css"> body{width: 600px;margin: 0 auto;}table{border-collapse: collapse;}table, td{mso-table-lspace: 0pt;mso-table-rspace: 0pt;}img{-ms-interpolation-mode: bicubic;}</style><![endif]--> <style type="text/css"> body, p, div{font-family: arial; font-size: 14px;}body{color: #9B9B9B;}body a{color: #0070CD; text-decoration: none;}p{margin: 0; padding: 0;}table.wrapper{width:100% !important; table-layout: fixed; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}img.max-width{max-width: 100% !important;}.column.of-2{width: 50%;}.column.of-3{width: 33.333%;}.column.of-4{width: 25%;}@media screen and (max-width:480px){.preheader .rightColumnContent, .footer .rightColumnContent{text-align: left !important;}.preheader .rightColumnContent div, .preheader .rightColumnContent span, .footer .rightColumnContent div, .footer .rightColumnContent span{text-align: left !important;}.preheader .rightColumnContent, .preheader .leftColumnContent{font-size: 80% !important; padding: 5px 0;}table.wrapper-mobile{width: 100% !important; table-layout: fixed;}img.max-width{height: auto !important; max-width: 480px !important;}a.bulletproof-button{display: block !important; width: auto !important; font-size: 80%; padding-left: 0 !important; padding-right: 0 !important;}.columns{width: 100% !important;}.column{display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important;}}</style> </head> <body> <center class="wrapper" data-link-color="#0070CD" data-body-style="font-size: 14px; font-family: arial; color: #9B9B9B; background-color: #FFFFFF;"> <div class="webkit"> <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF"> <tr> <td valign="top" bgcolor="#FFFFFF" width="100%"> <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td width="100%"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td><!--[if mso]> <center> <table><tr><td width="600"><![endif]--> <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center"> <tr> <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #9B9B9B; text-align: left;" bgcolor="#FFFFFF" width="100%" align="left"> <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;"> <tr> <td role="module-content"> <p>Email from '+req.decoded.username+'</p></td></tr></table> <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="font-size:6px;line-height:10px;background-color:#FFFFFF;padding:51px 0px 51px 0px;" valign="top" align="center"> <img class="max-width" width="480" src="https://bdoteach.me/assets/img/Screenshot_88.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:80% !important;width:80%;height:auto !important;"> </td></tr></table> <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:34px 5px 34px 5px;background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff"><div style="text-align: center;"><pre>'+req.body.contact_msg+'</pre></div></td></tr></table> <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:0px 0px 2px 0px;" role="module-content" bgcolor="#1c2034"> </td></tr></table> <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="font-size:6px;line-height:10px;background-color:#FFFFFF;padding:36px 0px 23px 0px;" valign="top" align="center"> <img class="max-width" width="120" src="https://bdoteach.me/assets/img/Screenshot_88.png" alt="" border="0" style="display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:20% !important;width:20%;height:auto !important;"> </td></tr></table> <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns"> <tr> <td style="padding:10px 5px 90px 5px;background-color:#ffffff;" bgcolor="#ffffff"><!--[if mso]> <table width="99%" align="left"><tr><td><![endif]--> <table style="padding: 0px 0px 0px 0px;" align="left" valign="top" height="100%" class="column column-0 of-1 empty"> <tr> <td class="columns--column-content"> <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"> <tr> <td style="padding:0px 0px 0px 0px;background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff"> <div style="font-size:10px;line-height:150%;margin:0;text-align:center;">[bdoteach.me]</div><div style="font-size:10px;line-height:150%;margin:0;text-align:center;">&nbsp;</div></td></tr></table> </td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table><!--[if mso]> </td></tr></table> </center><![endif]--> </td></tr></table> </td></tr></table> </td></tr></table> </div></center> </body></html>'
		};
		client.sendMail(email, function(err, info){
			if (err ) console.log(error);
			if(info.message == "success"){
				res.json({
					success:true,
					message:'Message sent! We will reply as soon as possible!'
				})
			}
		});
	})
	return router
}


