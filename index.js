const Blockchain = require("./blockchain.js");
const Block = require("./block.js");

myChain = new Blockchain();

myChain.addBlock(new Block(1, Date.now(), { amount: 4 , from:"Alex", to:"Abby"}));
myChain.addBlock(new Block(2, Date.now(), { amount: 10 , from:"Max", to:"Steve"}));
myChain.addBlock(new Block(3, Date.now(), { amount: 6, from:"John", to:"Mike" }));
console.log("myChain: ");
console.log(myChain.chain);
console.log("Chain valid: " + myChain.isValid());
