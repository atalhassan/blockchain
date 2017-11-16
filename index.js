const Blockchain = require("./blockchain.js");
const Block = require("./block.js");

myChain = new Blockchain();
myChain.addBlock(new Block(1, Date.now(), { amount: 4 }));
myChain.addBlock(new Block(1, Date.now(), { amount: 10 }));
console.log(myChain.chain);
