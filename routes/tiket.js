const router = require('express').Router()
const auth = require('../middleware/auth')
const tiketController = require('../controller/tiketController')
const checkRole = require('../middleware/checkRole')

router.get("/", tiketController.getData)

module.exports = router