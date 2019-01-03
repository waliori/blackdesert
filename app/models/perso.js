var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var PersoSchema = new Schema({  
  user:{
    type :String
  },
  name:{
    type :String,
    unique:true
  },
  level:{
    type :String
  },
  class:{
    type :String
  },
  cookingRank:{
    type :String
  },
  cookingLevel:{
    type :String
  },
  alchemyRank:{
    type :String
  },
  alchemyLevel:{
    type :String
  },
  processingRank:{
    type :String
  },
  processingLevel:{
    type :String
  },
  gatheringRank:{
    type :String
  },
  gatheringLevel:{
    type :String
  },
  cookingCloth:{
    type :String
  },
  alchemyCloth:{
    type :String
  },
  processingCloth:{
    type :String
  },
  gatheringCloth:{
    type :String
  }
})

module.exports = mongoose.model('Perso', PersoSchema ,'persos')