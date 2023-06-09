const router = require('express').Router()
const auth = require('../middleware/auth')
const airportController = require('../controller/airportController')
const checkRole = require('../middleware/checkRole')

router.get("/", airportController.getData)

module.exports = router