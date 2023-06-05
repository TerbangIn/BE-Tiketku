const { transaksi } = require('../models')

const getTransaksi = async (req, res) => {
    try {
        let data = await transaksi.findAll({
            include: ["user"]
        })
        return res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        return res.status(400).json({
            status: 'failed',
            message: err.message,
        })
    }
}

const findData = async (req, res) => {
    try {
        let data = await transaksi.findAll({
            where: {
                id_user: 2
            },
            include: ["user"]
        })

        return res.status(201).json({
            status: 'success',
            data
        })
    } catch (err) {
        return res.status(400).json({
            status: 'failed',
            message: err.message,
        })
    }
}

module.exports = {
    getTransaksi,
    findData
}