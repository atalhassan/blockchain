const SHA256 = require("crypto-js/sha256");


module.exports = class Block {
  constructor(index, timestamp, data, prevHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.prevHash).toString();
  }
}
