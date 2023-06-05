const router = require('express').Router()
const Transaksi = require('./transaksi')

router.use('/api/v1/transaksi',Transaksi)
router.use('/',(req,res) => {
    res.status(201).json({
        status: 'success',
        data: "Hellow World"
    })
})


module.exports = router