var path = require("path")
var express = require("express")
var fs = require("fs")


var app = express()
app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = process.env.port || 3000;

app.get ("/", function(req,res){
    res.sendFile(path.join(__dirname,"public/index.html"));
})

app.get ("/notes", function(req,res){
    res.sendFile(path.join(__dirname,"public/notes.html"));
})

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
    var newnote = req.body;
    fs.readFile(path.join(__dirname,"db/db.json"), function(err, data){
        if(err){
            console.log(err)
        }
        var returnVal = JSON.parse(data)
        returnVal.push(newnote)
        fs.writeFile(path.join(__dirname,"db/db.json"), JSON.stringify(returnVal), function(err,data){
            if(err) throw err;
            res.json(returnVal)
        });

    });    
});

app.delete("/api/notes/:id", function(req, res){
    var note = req.params.id
    console.log(note);
    fs.readFile(path.join(__dirname,"db/db.json"), function(err, data){
        if(err){
            console.log(err)
        }
        var returnVal = JSON.parse(data)
        returnVal.splice(note,1)
        fs.writeFile(path.join(__dirname,"db/db.json"), JSON.stringify(returnVal), function(err,data){
            if(err) throw err;
            res.json(returnVal)
        });
    });  
})


app.listen(PORT, function(){
    console.log("app listening on localhost:" +PORT)
})