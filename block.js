const SHA256 = require("crypto-js/sha256");


module.exports = class Block {
  constructor(index, timestamp, data, prevHash = '', hash = '', salt = 0) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.salt = salt;
    this.hash = hash;
    this.key = "00";
    this.length = this.key.length;
  }

  calculateHash() {
    return SHA256(this.index.toString() + this.timestamp.toString() + JSON.stringify(this.data) + this.prevHash + this.salt.toString()).toString();
  }

  description() {
    return (this.index.toString() + this.timestamp.toString() + JSON.stringify(this.data) + this.prevHash + this.salt.toString()).toString();
  }
  hashed(){
    return (this.index.toString() + this.timestamp.toString() + JSON.stringify(this.data) + this.prevHash + this.salt.toString()).toString();
  }

  startMining(){
    this.hash = this.calculateHash()
    console.log("Mining block " + this.index + "... ")
    while(this.hash.substring(0,this.length ) !== this.key){
      this.salt++;
      this.hash = this.calculateHash()
    }
    console.log("Mining Done: " + this.hash)
  }
}
