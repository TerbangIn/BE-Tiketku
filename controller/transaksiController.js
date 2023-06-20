const { transaction } = require('../models')
const { v4: uuidv4 } = require('uuid');

const createTransaksi = async (req, res) => {
    try {
        const request = req.body.user_id
        const data = await transaction.create({
            id: uuidv4(),
            status: "Unpaid",
            user_id: request,
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
            include: ["ticket"]
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
            datas
        }, {
            where: {
                id
            }
        })
        res.status(200).json({
            status: 'success',
            message: `Data dengan index ${id} telah berhasil terupdate`
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