var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser")


const Blockchain = require("./blockchain.js");
const Block = require("./block.js");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");



app.get("/", function(req, res) {

  myChain = new Blockchain();

  myChain.addBlock(new Block(1, Date.now(), { amount: 4 , from:"Alex", to:"Abby"}));
  myChain.addBlock(new Block(2, Date.now(), { amount: 10 , from:"Max", to:"Steve"}));
  myChain.addBlock(new Block(3, Date.now(), { amount: 6, from:"John", to:"Mike" }));
  myChain.addBlock(new Block(4, Date.now(), { amount: 12, from:"Mack", to:"Lee" }));
  myChain.addBlock(new Block(5, Date.now(), { amount: 3, from:"Sal", to:"Fox" }));
  myChain.addBlock(new Block(6, Date.now(), { amount: 19, from:"Phil", to:"Fitz" }));

  res.render("landing" , {blockchain:myChain.chain, valid:myChain.isValid()})
})
// ===================
// App listner
// ===================
app.listen(3000,function(){
    console.log("Blockchian server is up...");
});
