var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var CalcSchema = new Schema({  
  calc:{
    type :String
  },
  nbr:{
  	type:Number
  },
})

module.exports = mongoose.model('Calc', CalcSchema, 'calc')