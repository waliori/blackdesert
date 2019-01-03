var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')
var titlize = require('mongoose-title-case')
var validate = require('mongoose-validator');

var usernameValidator = [
  validate({
    validator: 'isAlphanumeric',
    message: 'Username should contain alpha-numeric characters only'
  }),
  validate({
    validator: 'isLength',
    arguments: [3, 20],
    message: 'username should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];
var passwordValidator = [
  validate({
    validator: 'matches',
    arguments : /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,35}$/,
    message: 'Password should contain at least one letter, one number , one special character and between 8 and 35 characters'
  }),
  validate({
    validator: 'isLength',
    arguments: [8, 35],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];
var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Enter a valid Email'
  }),
  validate({
    validator: 'isLength',
    arguments: [5, 30],
    message: 'email should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var UserSchema = new Schema({
  username:{
    type: String,
    lowercase : true,
    required:true,
    unique:true,
    validate: usernameValidator
  },
  password:{
    type: String,
    required:true,
    validate: passwordValidator,
    select : false
  },
  email:{
    type: String,
    lowercase : true,
    required:true,
    unique:true,
    validate :emailValidator
  },
  active:{
    type: Boolean,
    required:true,
    default : false
  },
  tmptoken:{
    type: String,
    required:true
  },
  resettoken:{
    type: String,
    required:false
  },
  permission:{
    type: String,
    required:true,
    default : 'free' //user / premium  /trial
  },
  start_date:{
    type:Date   
  },
  billingAgreementId:{
    type :String
  },
  subscriptionState:{
    type :String
  },
  lastPaymentDate:{
    type :String
  },
  ip:{
    type:String
  },
  conn:{
    type :Boolean,
    default : false
  },
  iat:{
    type:Number
  },
  credits:{
    type:Number,
    default : 0
  },
  withdrawn:{
    type:Number,
    default : 0
  },
  total:{
    type:Number,
    default : 0
  }
})
UserSchema.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')) return next()
  bcrypt.hash(user.password, null,null, function(err, hash) {
    if(err) return next(err)
    user.password = hash
    next()
  })  
})

UserSchema.plugin(titlize, {
  paths: [ 'username' ],
});

UserSchema.methods.comparePass = function(password){
  return bcrypt.compareSync(password,this.password)
}

module.exports = mongoose.model('User', UserSchema, 'users')