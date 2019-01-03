var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var AlchemySchema = new Schema({  
  Recipe:{
    type :String
  },
  Level:{
    type :String
  },
  Ingredient1:{
    type :String
  },
  Quanitiy1:{
    type :String
  },
  Ingredient2:{
    type :String
  },
  Quanitiy2:{
    type :String
  },
  Ingredient3:{
    type :String
  },
  Quanitiy3:{
    type :String
  },
  Ingredient4:{
    type :String
  },
  Quanitiy4:{
    type :String
  },
  Ingredient5:{
    type :String
  },
  Quanitiy5:{
    type :String
  },
  Buff:{
    type :String
  }
})

module.exports = mongoose.model('Alchemy', AlchemySchema ,'alchemy')