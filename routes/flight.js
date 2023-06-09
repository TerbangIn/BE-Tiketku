const router = require('express').Router()
const auth = require('../middleware/auth')
const flightController = require('../controller/flightController')
const checkRole = require('../middleware/checkRole')

router.get("/", flightController.getData)

module.exports = router