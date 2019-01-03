var express = require('express')
var morgan = require('morgan')
var paypal = require('paypal-rest-sdk')
var bodyParser = require('body-parser')
var url = require('url')
var open = require('open')
var port = process.env.PORT || 80
var mongo = require('mongoose')
var router = express.Router()
var appRoutes = require('./app/routes/api')(router)
var app = express()
var path = require('path')
var UAParser = require('ua-parser-js');
var session = require('express-session')

app.use(morgan('dev'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended : true,limit: '50mb'}))
app.use(express.static(__dirname+'/public'))
app.use('/api',appRoutes)


mongo.connect('mongodb://waliori:motdepass@ds117965.mlab.com:17965/bdoteach', { useMongoClient: true }, function(err){
	if (err) {
		console.log("not conn"+ err);
	}else{
		console.log("we're connected!")
	}
})

var clientId = 'AQGz8svscaS_xfLEChlqdL0Xx85VLk-PrarO7EQBft5JIqmw-_mnw6LGI6qTkpejFcPG2y1BUZxZGBvg'
var secret = 'EMWtzNPiI_QxlmYYvHVLT_c_JwV9SbYri2znsLKre7Iyfi9CE2nrEmCTGzViJZI9VpJVg-zBjkV5ve_f'
//P-0BA476087C938431GGWBCCCY

paypal.configure({
  'mode': 'live', //sandbox or live
  'client_id': clientId,
  'client_secret': secret
});


app.get('/lkhnouna/createplan', function(req, res){
	var billingPlanAttribs = {
	    "description": "Create Plan for premium",
	    "merchant_preferences": {
	        "auto_bill_amount": "yes",
	        "cancel_url": "https://bdoteach.me/cancel",
	        "initial_fail_amount_action": "continue",
	        "max_fail_attempts": "1",
	        "return_url": "https://bdoteach.me/success/",
	        "setup_fee": {
	            "currency": "USD",
	            "value": "1.99"
	        }
	    },
	    "name": "bdoteach.me premium account",
	    "payment_definitions": [
	        {
	            "amount": {
	                "currency": "USD",
	                "value": "1.99"
	            },
	            "cycles": "0",
	            "frequency": "MONTH",
	            "frequency_interval": "1",
	            "name": "Regular 1",
	            "type": "REGULAR"
	        }
	    ],
	    "type": "INFINITE"
	};
	paypal.billingPlan.create(billingPlanAttribs, function (error, billingPlan){
	  var billingPlanUpdateAttributes;

	  if (error){
	    console.error(JSON.stringify(error));
	    throw error;
	  } else {
	    // Create billing plan patch object
	    billingPlanUpdateAttributes = [{
	      op: 'replace',
	      path: '/',
	      value: {
	        state: 'ACTIVE'
	      }
	    }];

	    // Activate the plan by changing status to active
	    paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, function(error, response){
	      if (error){
	        console.error(JSON.stringify(error));
	        throw error;
	      } else {
	        console.log('Billing plan created under ID: ' + billingPlan.id);
	        res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
	      }
	    });
	  }
	});
});

app.get('*',function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
})

app.listen(port, function(){
	console.log('runing on '+ port);
}) 

