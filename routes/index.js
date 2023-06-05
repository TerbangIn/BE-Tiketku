const router = require('express').Router()
const Transaksi = require('./transaksi')
const User = require('./user')

router.use('/api/v1/transaksi', Transaksi)
router.use('/api/v1/user', User)

module.exports = router