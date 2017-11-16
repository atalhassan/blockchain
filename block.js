const SHA256 = require("crypto-js/sha256");


module.exports = class Block {
  constructor(index, timestamp, data, prevHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.salt = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.prevHash + this.salt).toString();
  }

  startMining(){
    this.hash = this.calculateHash()
    console.log("Mining block " +this.index + "... ")
    while(this.hash.substring(0,5) !== "12345"){
      this.salt++;
      this.hash = this.calculateHash()
    }
    console.log("Mining Done: " + this.hash)
  }
}
