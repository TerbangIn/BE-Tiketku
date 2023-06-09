const router = require('express').Router()
const { notFound } = require('../controller/notFoundController')
const auth = require('../middleware/auth')
const Transaksi = require('./transaksi')
const User = require('./user')
const Airport = require('./airport')
const Flight = require('./flight')
router.use('/api/v1/transaksi', auth, Transaksi)
router.use('/api/v1/user', User)
router.use('/api/v1/airport', Airport)
router.use('/api/v1/flight', Flight)
router.use(notFound)

module.exports = router