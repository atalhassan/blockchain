var mongoose = require("mongoose");

var BlockSchema = new mongoose.Schema({
    index : Number,
    data : {
      to: String,
      from: String,
      message: String
    },
    timestamp: Number,
    hash: String,
    prevHash: String,
    salt: String
});


module.exports = mongoose.model("Block", BlockSchema);
