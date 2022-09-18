const express = require('express')
const router = express.Router()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const tokensController = require('../controllers/tokensController')

router.get("/", tokensController.getNewTokens)
router.post("/:address", tokensController.getToken)

module.exports = router;