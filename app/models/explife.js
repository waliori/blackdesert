var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var ExplifeSchema = new Schema({  
  user:{
    type :String,
    unique: true
  },
  exp:{
    type :String
  }
})

module.exports = mongoose.model('Explife', ExplifeSchema, 'explife')