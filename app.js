var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", function(req,res){
    res.render("home");
});

app.get("/gra", function(req,res){
    res.render("gra");
});
app.get("/ee", function(req, res) {
    res.render("ee")
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("serwer is on");
})