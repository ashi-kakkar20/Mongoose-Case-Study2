//Case Study2- Creating a CRUD RestFul API with Node Js, Express and Mongoose
//Importing all the required modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose= require('mongoose'); 

var app = express(); //creating the express app

app.use(bodyParser.urlencoded({ extended: true }))// using the bodyparser
app.use(bodyParser.json())

var Note= require('./model/Notes'); //fetching the model class
const cred= require('./database_credentials'); //fetching the easynotes db credentials

var Notes= require('./model/Notes');// importing the Notes model

mongoose.connect('mongodb://localhost:27017/easynotes',cred); // Configuring the database
var db=mongoose.connection;

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database !!');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database !!");
})


app.get('/', function(req,res) //defining the route
{
    res.json({"message": "Welcome to EasyNotes application. Note down all your notes quickly !!"});
})

app.get('/api/notes', function(req,res) //Retrieving all the notes in the EasyNotes application
{
  Note.find(function(err,data)
  {
    if(err)
    {
        console.log(err);
        res.status(500).send({message: "Some error occurred while getting the notes"});
    }
    else{
        res.send(data);
    }
  })
})


app.get('/api/notes/:noteId', function(req,res){ //Retrieving a specific note in the EasyNotes application
    Note.findById(req.params.noteId, function(err,data)
    {
        if(err)
        {
            console.log(err);
            return res.status(500).send({message: "Error while retrieving the note with id " + req.params.noteId});
        }
    
        else
        {
            if(!data) {
                return res.status(404).send({message: "No note found with the Id " + req.params.noteId});            
            }
    
            res.send(data);
        }
    })
    });


app.post('/api/notes',function(req,res){ //Creating a new note in the EasyNotes application
    Note.create(req.body,function(err,data){
    // Creating a new Note
    if(!req.body.content) {
    return res.status(400).send({message: "Content of the Note cannot be empty"});
    }

 if(err)
 {
    console.log(err);
    return res.status(500).send({message: "Error while creating the note "});
 }

  else{
      res.json(data);
      }
})
})

app.put('/api/notes/:noteId', function(req,res){ //Updating an existing note in the EasyNotes application
    var query={ _id:req.params.noteId};
    var update={ title : req.body.title,
                content : req.body.content}
    Note.findOneAndUpdate(query,update,function(err,data){
        if(!data) {
            return res.status(404).send({message: "No Note found with id " + req.params.noteId});            
        }

        if(err)
        {
            console.log(err);
            return res.status(500).send({message: "Error while updatings note with id " + req.params.noteId});
        }
        else{ 
         
            res.json('Note Record updated successfully');
            }
    
    })
})


app.delete('/api/notes/:noteId',function(req,res){ //Deleting a note in the EasyNotes application
    var obj={ _id: req.params.noteId }
    Note.findByIdAndRemove(obj, function(err,data){
    if(!data) {
            return res.status(404).send({message: "No note found with id " + req.params.noteId});
     }  

    if(err)
    {
        console.log(err);
        return res.status(500).send({message: "Could not delete note with id " + req.params.noteId});
    }

    else{
        res.send('Record Deleted successfully');
    }
})
})

app.listen(3000,function() //listening all the incoming requests
{
    console.log('The server is running at port 3000');
})

