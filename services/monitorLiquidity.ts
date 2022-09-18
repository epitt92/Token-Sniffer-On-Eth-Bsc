var Web3 = require('web3');
const axios = require('axios');
// var eth_web3 = new Web3('ws://138.201.196.242:8546');
var eth_web3 = new Web3('https://mainnet.infura.io/v3/17d8cab848d947a2ba390e3e25fc81e6');
var bsc_web3 = new Web3('https://bsc-dataseed1.binance.org:443');

const uniswapv2factory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"