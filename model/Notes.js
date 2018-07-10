var mongoose= require('mongoose');//Importing the mongoose module

var noteschema = mongoose.Schema({ //Note schema in Mongoose
  title: String,
  content: String
}, {
  timestamps: true
});
    

var Note= mongoose.model('Note',noteschema);
module.exports=Note;