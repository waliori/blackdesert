var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var XmrSchema = new Schema({  
  date:{
    type :Date
  },
  hps:{
    type :Number
  }
})

module.exports = mongoose.model('Xmr', XmrSchema, 'xmr')