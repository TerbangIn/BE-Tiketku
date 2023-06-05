const router = require('express').Router()
const Transaksi = require('../controller/transaksiController')

router.get('/', Transaksi.testData)
router.get('/1',Transaksi.findData)


module.exports = router