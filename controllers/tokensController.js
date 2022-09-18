const axios = require("axios");
const Token = require("../models/TokenModel");

const getNewTokens = (req, res) => {
  // var network = req.query.network;
  // Token.find({network})
  Token.find()
    .sort({timestamp: 'desc'})
    .limit(300)
    .then((tokens) => {
      res.status(200).json(tokens)
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

const getToken = (req, res) => {
  let address = req.params.address;
  Token.find({ address: address })
    .then(token => {
      res.status(200)
      res.json(token)
    })
    .catch(error => {
      console.log(error)
    })
};

module.exports = {
  getNewTokens,
  getToken,
};
