var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var NinjaSchema = new Schema({  
  req_lvl:{
    type :String
  },
  name:{
  	type:String
  },
  type_attack:{
  	type:[String]
  },
  effect:{
  	type:[String]
  },
})

module.exports = mongoose.model('Ninja', NinjaSchema, 'ninja')