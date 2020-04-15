var path = require("path")
var express = require("express")

var app = express()

var PORT = process.env.port || 3000;

app.get ("/", function(req,res){
    res.send(path.join(__dirname,"index.html"));
})

app.get ("/notes", function(req,res){
    res.send(path.join(__dirname,"notes.html"));
})

app.get("/api/notes", function(req, res){
    return res.json("placeholder for notes")

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