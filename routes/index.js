const router = require('express').Router()
const { notFound } = require('../controller/notFoundController')
const auth = require('../middleware/auth')
const Transaksi = require('./transaksi')
const User = require('./user')

router.use('/api/v1/transaksi', auth, Transaksi)
router.use('/api/v1/user', User)
router.use(notFound)

module.exports = router