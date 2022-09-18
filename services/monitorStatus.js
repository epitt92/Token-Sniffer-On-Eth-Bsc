'use-strict'
const axios = require('axios');
const ethers = require("ethers");

const { setIntervalAsync } = require('set-interval-async/fixed');


const Token = require("../models/TokenModel");
const ethScanAPIKey = "TACDSUZKWJVSEAAX9B92G2F3KKQYXJ56C2";
const bscScanAPIKey = "8N611RASKNMHVE9B5IGM3V99YU9YZ5UV1R";

// const provider = new ethers.providers.AlchemyProvider();

var eth_web3 = "ws://138.201.196.242:8546";
var bsc_web3 = "ws://138.201.196.242:8548";

const eth_provider = new ethers.providers.WebSocketProvider(eth_web3);
const bsc_provider = new ethers.providers.WebSocketProvider(bsc_web3);

const abi = {
  factory: require("../abi/pancake/factory.json"),
  router: require("../abi/pancake/router.json"),
  token: require("../abi/function/token.json"),
  pair: require("../abi/function/pair.json"),
  find_pair: require("../abi/function/find_pair.json"),
  front: require("../abi/function/frontrun.json"),
};

const uniswapFactory = new ethers.Contract(
  "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  abi.factory,
  eth_provider
);
const pancakeFactory = new ethers.Contract(
  "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
  abi.factory,
  bsc_provider
);

const BASECOIN = {
  WRAPCOIN: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2".toLowerCase(),
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2".toLowerCase(),
  DAI: "0x6b175474e89094c44da98b954eedeac495271d0f".toLowerCase(),
  SAI: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359".toLowerCase(),
  USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48".toLowerCase(),
  USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7".toLowerCase(),
};

const BNBBASECOIN = {
  WBNB: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'.toLowerCase(),
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56'.toLowerCase(),
  USDT: '0x55d398326f99059ff775485246999027b3197955'.toLowerCase(),
  USDC: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'.toLowerCase(),
}
const checkInUniswap = async (addr) => {
  const obkeys = Object.keys(BASECOIN);
  for (let i = 0; i < obkeys.length; i++) {
    try {
      const pairAddress = await uniswapFactory.getPair(
        BASECOIN[obkeys[i]],
        addr
      );
      if (pairAddress == "0x0000000000000000000000000000000000000000") continue;
      console.log(pairAddress)
      return true;
    } catch (e) {
      console.log("ee", e);
    }
  }
  return false;
};
const checkInPancake = async (addr) => {
  const obkeys = Object.keys(BNBBASECOIN);
  for (let i = 0; i < obkeys.length; i++) {
    try {
      const pairAddress = await pancakeFactory.getPair(
        BNBBASECOIN[obkeys[i]],
        addr
      );
      if (pairAddress == "0x0000000000000000000000000000000000000000") continue;
      console.log(pairAddress)
      return true;
    } catch (e) {
      console.log("ee", e);
    }
  }
  return false;
};
const isBlockList = (url) => {
  const blockList = ["tokenmint.io","forum.zeppelin",'github.com','stackoverflow','reddit',"solidity.readthedocs","forum.openzeppelin","eips.ethereum","etherscan.io","bscscan.com","diligence.consensys","blog.alphafinance.io","pinksale.finance","smartcontracts.tools","eth.wiki","unicrypt.network"]
  return blockList.findIndex(item => url.search(item)!=-1) != -1
}

module.exports = () => {
  setIntervalAsync(async () => {
    try {
      const tokens = await Token.find();
      for(let token of tokens) {
        if(token['network'] === 'ethereum'){
          let url = `https://api.etherscan.com/api?module=contract&action=getsourcecode&address=${token['address']}&apikey=${ethScanAPIKey}`;
          let status;
          try{
            status = await axios.get(url);
          } catch( err ) {
            console.log("error in etherscan", err)
            continue
          }
          if( status.data['result'][0]['ABI'] === "Contract source code not verified"){
            token['isVerified'] = false;
          } else {
            token['isVerified'] = true;
          }
          let codeSrc = status.data['result'][0]["SourceCode"];
          const socialURL = ["t.me", "youtube.com", "twitter.com", "medium.com"];
          if(codeSrc === undefined || codeSrc === null){
            continue;
          }
          const matchData = codeSrc.match(
            /(https?:\/\/.).([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
          );
          if (matchData?.length > 0) {
            matchData?.forEach((data) => {
              if ( isBlockList(data) ){
                return
              } else if (data.search(socialURL[0]) != -1) {
                token['telegram'] = data;
              } else if (data.search(socialURL[2]) != -1) {
                token['twitter'] = data;
              } else if (data.search(socialURL[3]) != -1) {
                token['medium'] = data;
              } else {
                token['website'] = data;
              }
            });
          }
          // Commented for testing purpose

          let enableTrading = await checkInUniswap(token['address']);
          token['status'] = enableTrading ? "LIVE" : "DEPLOYED";
          token.save();

        } else {
          let url = `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${token['address']}&apikey=${bscScanAPIKey}`;
          let status;
          try{
            status = await axios.get(url);
          } catch(err){
            console.log("error in bscscan", err);
            continue
          }
          if( status.data['result'][0]['ABI'] === "Contract source code not verified"){
            token['isVerified'] = false;
          } else {
            token['isVerified'] = true;
          }
          let codeSrc = status.data['result'][0]["SourceCode"];
          const socialURL = ["t.me", "youtube.com", "twitter.com", "medium.com"];

          if(codeSrc === undefined || codeSrc === null){
            continue;
          }
          const matchData = codeSrc.match(
            /(https?:\/\/.).([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
          );
          if (matchData?.length > 0) {
            matchData?.forEach((data) => {
              if ( isBlockList(data) ){
                return
              } else if (data.search(socialURL[0]) != -1) {
                token['telegram'] = data;
              } else if (data.search(socialURL[2]) != -1) {
                token['twitter'] = data;
              } else if (data.search(socialURL[3]) != -1) {
                token['medium'] = data;
              } else {
                token['website'] = data;
              }
            });
          }

          // commented for testing purpose

          let enableTrading = await checkInPancake(token['address']);
          token['status'] = enableTrading ? "LIVE" : "DEPLOYED";
          token.save();
        }
      }
    } catch(error) {
      console.log(error)
    }
  }, 5000);
};