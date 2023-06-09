const router = require('express').Router()
const auth = require('../middleware/auth')
const passengerController = require('../controller/passengerController')
const checkRole = require('../middleware/checkRole')

router.get("/", passengerController.getData)

module.exports = router