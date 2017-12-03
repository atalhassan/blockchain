var express         = require("express"),
app             = express(),
mongoose        = require("mongoose"),
BlockModel      = require("./models/block"),
bodyParser      = require("body-parser"),
moment          = require('moment');


const Blockchain = require("./blockchain_algorithm/blockchain.js");
const Block = require("./blockchain_algorithm/block.js");

var myChain = new Blockchain();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


const databaseurl = process.env.DATABASEURL || 'mongodb://localhost/mydb'
const port = process.env.PORT || 3000


mongoose.connect(databaseurl, {useMongoClient: true});

app.get("/", function(req, res) {
  BlockModel.find({},function(err, allBlocks) {
    if(err){
      console.log(err);
    } else {
      myChain = new Blockchain(allBlocks);
      res.render("landing" , {blockchain:myChain, valid:myChain.isValid(), moment:moment})
    }
  });
})

app.get("/new", function(req, res) {
  var lastBlock = myChain.getLatestBlock();
  var newBlock = new Block(0, Date.now(), {}, 0);
  if (lastBlock !== 0) {
      var newBlock = new Block(lastBlock.index + 1, Date.now(), {}, lastBlock.hash);
  }

  console.log(newBlock);
  res.render("new", {newBlock:newBlock, key: newBlock.key, length: newBlock.length});
})


app.post("/new", function(req, res) {
  BlockModel.find({},function(err, allBlocks) {
    if(err){
      console.log(err);
    } else {
      myChain = new Blockchain(allBlocks);
      var lastBlock = myChain.getLatestBlock();

      var data = {message: req.body.message, to: req.body.to, from:req.body.from}

      var index = req.body.index;
      var timestamp = req.body.timestamp
      var hash = req.body.hash
      var prevHash = req.body.prevHash
      var salt = req.body.salt
      var newBlock = new Block(index, timestamp, data, prevHash, hash, salt);
      console.log(newBlock);
      if (lastBlock !== 0) {
        if(index  != (lastBlock.index + 1)) {
          res.send("Failed to add block, index not in order")
          return
        }
      }
      if(hash !== newBlock.calculateHash()){
        res.send("Failed to add block hash value not correct")
        return
      }

      myChain.addBlock(newBlock);
      if(!myChain.isValid()) {
        console.log(newBlock);
        console.log(lastBlock);
        res.send("Failed to add block chain will become invalid")
        return
      }

      console.log(newBlock);
      BlockModel.create(newBlock, function(err, newlyCreated){
        if(err){
          console.log(err);
        } else {
          //redirect back to bizcanvasd page
          res.redirect("/");
        }
      });
    }
  });
})
// ===================
// App listner
// ===================
app.listen(port,process.env.IP,function(){
  console.log("Blockchian server is up...");
});
