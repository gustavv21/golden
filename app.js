var express         = require("express"),
    app             = express(),
    bodyparser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose");

mongoose.connect("mongodb://localhost/golden", { useNewUrlParser: true });
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));

var gameSchema = new mongoose.Schema({
    player: String,
    player2: String,
    price: Number
});

var Game = mongoose.model("Game", gameSchema);

app.get("/", function(req,res){
    res.render("home");
});

app.get("/gra", function(req,res){
    Game.find({}, function(err, game){
        if(err){
            console.log(err);
        } else {
            res.render("game/gra", {game:game});
        }
    });
});

app.post("/gra", function(req, res) {
    var player  = req.body.player;
    var player2 = req.body.player2;
    var price   = req.body.price;
    var full    = {player:player, player2:player2, price:price};
    Game.create(full, function(err,full){
        if(err){
            res.render("game/gra");
        } else {
            res.redirect("/gra");
        }
    });
});

app.get("/gra/:id", function(req, res) {
    Game.findById(req.params.id, function(err,foundGame){
        if(err){
            console.log(err);
        } else {
            res.render("game/show", {game:foundGame});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("serwer is on");
})