const router = require('express').Router()
const auth = require('../middleware/auth')
const seatController = require('../controller/seatController')
const checkRole = require('../middleware/checkRole')

router.get("/", seatController.getData)

module.exports = router