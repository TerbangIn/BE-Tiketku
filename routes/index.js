const router = require('express').Router()
const { error } = require('../controller/errorController')
const { notFound } = require('../controller/notFoundController')
const auth = require('../middleware/auth')
const Transaksi = require('./transaksi')
const User = require('./user')
const Airport = require('./airport')
const Information = require('./information')
const Flight = require('./flight')
const Seat = require("./seat")
const Passenger = require("./passenger")
const Tiket = require('./tiket')
const Notification = require('./notification')
const swagger = require('swagger-ui-express')

const swaggerDocument = require("../docs/swagger.json")

router.use("/api-docs", swagger.serve)
router.get("/api-docs", swagger.setup(swaggerDocument))
router.use('/api/v1/transaksi', auth, Transaksi)
router.use('/api/v1/user', User)
router.use('/api/v1/airport', Airport)
router.use('/api/v1/information', Information)
router.use('/api/v1/flight', Flight)
router.use('/api/v1/seat', Seat)
router.use('/api/v1/passenger', Passenger)
router.use('/api/v1/tiket', Tiket)
router.use('/api/v1/notification', Notification)
router.use(notFound)
router.use(error)

module.exports = router