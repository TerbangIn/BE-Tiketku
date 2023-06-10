const router = require('express').Router()
const Transaksi = require('../controller/transaksiController')
const auth = require('../middleware/auth')
const checkRole = require('../middleware/checkRole')

router.get('/', auth, checkRole(["admin", "user"]), Transaksi.getTransaksi)
router.get('/1', Transaksi.findData)


module.exports = router