var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var LifeSchema = new Schema({  
  Rank:{
    type :String
  },
  Level:{
    type :String
  },
  Xp:{
    type :String
  },
  Total:{
    type :String
  }
})

module.exports = mongoose.model('Life', LifeSchema, 'life')