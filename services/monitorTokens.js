
var Web3 = require('web3');
const axios = require('axios');
var eth_web3 = "ws://138.201.196.242:8546";
var bsc_web3 = "ws://138.201.196.242:8548";

// var bsc_web3 = new Web3('ws://138.201.196.242:8548');

const { setIntervalAsync } = require('set-interval-async/fixed');

const Token = require("../models/TokenModel");

const ethers = require("ethers");
// const eth_provider = new ethers.providers.AlchemyProvider();
const eth_provider = new ethers.providers.WebSocketProvider(eth_web3);
const bsc_provider = new ethers.providers.WebSocketProvider(bsc_web3);

let socket;
// const databaseURL = "mongodb+srv://admin:admin@testcluster.5pv4cpu.mongodb.net/testCollection?retryWrites=true&w=majority";
// const databaseURL = "mongodb+srv://doadmin:406K2Jjysfnt8751@db-mongodb-nyc3-17865-4f1d8e5d.mongo.ondigitalocean.com/admin";
let lastBlock = 0;
let bsc_lastBlock = 0;

const ERC20ABI =[
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol_",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]


const broadCastData = async () => {
  if (socket){
    const all = await getPairDB();
    socket.sockets.emit("ethscan:pairStatus", { data: all });
  }
}

async function checkForERC20(receipt, provider){

  try{
      const contract = new ethers.Contract(receipt.contractAddress, ERC20ABI, provider);
      const name = await contract.name();
      const symbol = await contract.symbol();
      const decimals = await contract.decimals();
      const totalSupply = await contract.totalSupply();
      const network = await provider.getNetwork();
      // const allowance = await contract.allowance('0x02ECEf057e766cdBE6BF781eADA33CDc3dde3617', '0xdf4a143359C11E10278aB74bd3f90Ff3e13a90a3');
      //if these call went through, it's most likely an ERC20 token. 
      //if not, it'll console.log an error and return

      const timestamp = (await provider.getBlock(receipt.blockNumber)).timestamp;

      Token.findOne({address: receipt.contractAddress}, async (err, tk) => {
        if(tk) {
          console.log("already existed: ", receipt.contractAddress)
          return
        }
        if(name && name.length){
          const content = `new token: ${name}(${symbol}) found. Contract address: ${receipt.contractAddress} \n`;
          let data = {
            name: name,
            address: receipt.contractAddress,
            symbol: symbol,
            decimals: decimals,
            network: network['chainId'] === 1? "ethereum" : "bsc",
            transaction: receipt.transactionHash,
            timestamp: timestamp,
            tokenType: network['chainId'] === 1? "ERC20" : "BEP20",
            deployer: receipt.from
          };
          console.log(data['network'], content)
          await Token.create(data);
      
          broadCastData()
          // fs.writeFile('./newTokenrResults.txt', content, { flag: 'a+' }, err => {console.log(err)});
        }
      })
      

  }catch(e){
  }
} 

const getPairDB = async () => {
  try {
    const items = JSON.parse(
      JSON.stringify(
        await Token.find({})
          .sort({timestamp: 'desc'})
          .limit(300)
      )
    );
    return items;
  } catch (e) {
    return [];
  }
};

async function handleReceipt(transaction, provider){
  const receipt = await provider.getTransactionReceipt(transaction.hash);
  checkForERC20(receipt, provider);
}


async function handleTransaction(transaction) {
    try{

    await provider.waitForTransaction(transaction.hash, 3).
                then(()=> {
                    
                })
            }catch(e){
                console.log(e);
            }


}


async function handleData(blockNumber, provider){
  // Emitted on every block change
  try{
    const data = await provider.getBlockWithTransactions(blockNumber);
    for (each in data.transactions){
        if(data.transactions[each].to == null){
          handleReceipt(data.transactions[each], provider);
        }
    }
  }catch(e){
    console.log(e)
  }
}

const onConnection = async (soc) => {
  console.log("socket cnnected")
  if (soc){
    soc.emit("ethscan:pairStatus", { data: await getPairDB() });
  }
};

module.exports = async function (s) {

  socket = s;
  
  //socket middleware
  socket.on('connection', onConnection);
    // Sniffing transactions and filtering for qualifying markers:
     // - Must be from the wallets we're copying
     // - Must be to the Dex router
     // - Must be Buy transaction
  

  console.log("started")
  setIntervalAsync(broadCastData, 10000);

  eth_provider.on("block", (blockNumber) => {
    if(blockNumber > lastBlock){
      lastBlock = blockNumber;
    console.log("eth:",blockNumber);
    handleData(blockNumber, eth_provider);
    } else{
      
      console.log('same block')
    }
  })
  
  bsc_provider.on("block", (blockNumber) => {
    if(blockNumber > bsc_lastBlock){
      bsc_lastBlock = blockNumber;
      console.log("bsc:",blockNumber);
      handleData(blockNumber, bsc_provider);
    } else{
      
      console.log('same block')
    }
  })
};
  
