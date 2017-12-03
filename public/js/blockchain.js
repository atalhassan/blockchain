

class Block {
  constructor(index, timestamp, data, prevHash = '', hash = '', salt = 0) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.salt = salt;
    this.hash = hash;
  }

  calculateHash() {

    return CryptoJS.SHA256(this.index.toString() + this.timestamp.toString() + JSON.stringify(this.data) + this.prevHash + this.salt.toString()).toString();
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
    while(this.hash.substring(0,5) !== "12345"){
      this.salt++;
      this.hash = this.calculateHash()
    }
    console.log("Mining Done: " + this.hash)
  }
}



class Blockchain {
  constructor(chain = []) {

    this.chain = []
    if(chain.length !== 0) {
      chain.sort(function(a, b) {
        return parseInt(a.index) - parseInt(b.index);
      });
      for (var i = 0; i < chain.length; i++) {
        var data = {message: chain[i].data.message, to: chain[i].data.to, from: chain[i].data.from}
        this.chain.push(new Block(chain[i].index, chain[i].timestamp, data, chain[i].prevHash, chain[i].hash, chain[i].salt))
      }
    }
  }

  createFirstBlock(){
    var newBlock = new Block(0, Date.now(), {Message: "first Block"} , 0);
    newBlock.startMining();
    return newBlock;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().hash;
    newBlock.startMining();
    this.chain.push(newBlock);
  }

  isValid(){
    for (var i = 1; i < this.chain.length; i++) {
      var currBlock = this.chain[i];
      var prevBlock = this.chain[i-1];;

      //case 1 check if currBlock is valid
      if(currBlock.hash !== currBlock.calculateHash()){
        return false;
      }

      //case 2 check if currBlock is linked correctly
      if (currBlock.prevHash !== prevBlock.hash) {
        return false;
      }
    }
    return true;
  }

}
