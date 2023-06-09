const router = require('express').Router()
const { error } = require('../controller/errorController')
const { notFound } = require('../controller/notFoundController')
const auth = require('../middleware/auth')
const Transaksi = require('./transaksi')
const User = require('./user')

router.use('/api/v1/transaksi', auth, Transaksi)
router.use('/api/v1/user', User)
router.use(notFound)
router.use(error)

module.exports = router