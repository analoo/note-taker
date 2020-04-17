var path = require("path")
var express = require("express")
var fs = require("fs")

var app = express()
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

app.post("/api/notes/new", function(req, res){
    var newnote = req.body;
    console.log(newnote);
    // need to add push location to the right place
    // place.push(newnote)
    res.json(newnote)

})

app.delete("/api/notes/delete/:id", function(req, res){
    var note = req.param.id
    console.log(note);
    // need to add remove function
    // place.pop(note)

})


app.listen(PORT, function(){
    console.log("app listening on localhost:" +PORT)
})