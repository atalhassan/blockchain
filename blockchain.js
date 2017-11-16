const Block = require("./block.js");

module.exports = class Blockchain {
  constructor() {
    this.chain = [this.createFirstBlock()];
  }

  createFirstBlock(){
    var newBlock = new Block(0, Date.now(), "first Block" , 0);
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
      var prevBlock = this.chain[i-1];

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
