const router = require('express').Router()
const Transaksi = require('../controller/transaksiController')

router.get('/', Transaksi.getTransaksi)
router.get('/1',Transaksi.findData)


module.exports = router