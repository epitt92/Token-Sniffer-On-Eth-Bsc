// const { ObjectId } = require('mongoose')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const tokenSchema = new Schema({
    // _id: ObjectId,
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    decimals: {
        type: String,
        required: true
    },
    network: {
        type: String,
        required: true
    },
    transaction: {
        type: String,
        required: true
    },
    tokenType: {
        type: String,
        required: true
    },
    deployer: {
        type: String,
        required: true
    },
    youtube: {
        type: String
    },
    telegram: {
        type: String
    },
    twitter: {
        type: String
    },
    website: {
        type: String
    },
    medium: {
        type: String
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    addLiquidity: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'DEPLOYED'
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    isHoneypot: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('token', tokenSchema)