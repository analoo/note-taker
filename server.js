var path = require("path")
var express = require("express")
var fs = require("fs")


var app = express()
// needed to be able to access the public folders
app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = process.env.PORT || 3000;

// sends user to indexhtml at root
app.get ("/", function(req,res){
    res.sendFile(path.join(__dirname,"public/index.html"));
})

// sends user to indexhtml at /notes
app.get ("/notes", function(req,res){
    res.sendFile(path.join(__dirname,"public/notes.html"));
})

// returns json data to user at api/notes
app.get("/api/notes", function(req, res){
    fs.readFile(path.join(__dirname,"db/db.json"), function(err, data){
        if(err){
            console.log(err)
        }
        var returnVal = JSON.parse(data)
        res.json(returnVal)
    })

})

app.post("/api/notes", function(req, res){
    //stores data into new note
    var newnote = req.body;

    //reads the most recent data from the database
    fs.readFile(path.join(__dirname,"db/db.json"), function(err, data){
        if(err){
            console.log(err)
        }
        var returnVal = JSON.parse(data)
        // adds the new note to the data just read and rewrites the database file
        returnVal.push(newnote)
        fs.writeFile(path.join(__dirname,"db/db.json"), JSON.stringify(returnVal), function(err,data){
            if(err) throw err;
            res.json(returnVal)
        });

    });    
});


app.delete("/api/notes/:id", function(req, res){
    // takes the note number from the api url
    var noteLocation = req.params.id
    // reads the data from the database
    fs.readFile(path.join(__dirname,"db/db.json"), function(err, data){
        if(err){
            console.log(err)
        }
        var returnVal = JSON.parse(data)
        // removes one value at the location of the note
        returnVal.splice(noteLocation,1)

        // rewrites data into the database
        fs.writeFile(path.join(__dirname,"db/db.json"), JSON.stringify(returnVal), function(err,data){
            if(err) throw err;
            res.json(returnVal)
        });
    });  
})

// ensures that our instance of express is listening to the page
app.listen(PORT, function(){
    console.log("app listening on localhost:" +PORT)
})