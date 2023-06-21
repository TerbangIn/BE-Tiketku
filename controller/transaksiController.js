const { transaction } = require('../models')
const { v4: uuidv4 } = require('uuid');

const createTransaksi = async (req, res) => {
    try {
        const request = req.body.user_id
        const data = await transaction.create({
            status: "Unpaid",
            user_id: request,
            kode_booking: Math.random().toString(36).toUpperCase().slice(2, 14),
        })

        res.status(201).json({
            status: 'Transaksi Berhasil dibuat',
            data
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}

const deleteTransaksi = async (req, res) => {
    try {
        const id = req.params.id

        const dataId = await transaction.findByPk(id)

        // TODO: Validasi apakah id ada
        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }

        await transaction.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            status: 'success',
            message: `Data dengan index ${id} telah berhasil terhapus`
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}


const getTransaksi = async (req, res) => {
    try {
        let data = await transaction.findAll({
            include: ["tiket"]
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

const updateTransaksi = async (req, res) => {
    try {
        const datas = req.body
        const id = req.params.id

        const dataId = await transaction.findByPk(id)

        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }

        await transaction.update({
            "payment_id" : datas.payment_id,
            "user_id" : datas.user_id,
            "total_price" : datas.total_price 
        }, {
            where: {
                id
            }
        })
        res.status(200).json({
            status: 'success',
            message: `Data dengan index ${dataId} telah berhasil terupdate`
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}


const getIdTransaksi = async (req, res) => {
    try {
        const id = req.params.id
        const dataId = await transaction.findByPk(id)

        if (!dataId){
            return res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }else{
            return res.status(201).json({
                status: 'success',
                dataId
            })
        }

    } catch (err) {
        return res.status(400).json({
            status: 'failed',
            message: err.message,
        })
    }
}

module.exports = {
    createTransaksi,
    getTransaksi,
    getIdTransaksi,
    deleteTransaksi,
    updateTransaksi
}