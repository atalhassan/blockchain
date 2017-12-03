# Blockchain
Simple blockchain algorithm

## Framework
- [express](https://expressjs.com)
- ejs
- mongodb


## To run
```
npm install
node index.js
```
and make sure that you run '''mongod''' on a different shell

Then visit [localhost:3000](https://localhost:3000)


## the blockchain algorithm
blockchain is simply a list of information, but what makes it special is that
the order of the list has to be validated using mathematical functions.

In this program the blockchain is validated by proving that the hash of block
,using its content, is indeed the hash shown, and the previous hash value is
equal to the hash of the previous block.

The hashing algorithm used is ``` SHA256 ```
