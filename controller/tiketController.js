const { tiket } = require('../models')

const getTiket = async (req, res) => {
    data = await tiket.findAll({
        order: [["id", "Asc"]],
        include: ["seat", "flight", "passenger"]
    })

    try {
        if (data.length) {
            return res.status(200).json({
                status: "success",
                data: data
            })
        } else {
            return res.status(500).json({
                status: "Data tidak ada",
                data: []
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "success",
            message: error.message
        })
    }
}

const getIdTiket = async (req, res) => {
    try {
        const id = req.params.id
        const data = await tiket.findByPk(id)

        // TODO: Validasi apakah id ada
        if (data === null) {
            return res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

const postTiket = async (req, res) => {
    try {
        const datas = req.body

        const data = await tiket.create({
            datas
        })

        res.status(201).json({
            status: 'success',
            data
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}

const updateTiket = async (req, res) => {
    try {
        const datas = req.body
        const id = req.params.id

        const dataId = await tiket.findOne({where:{id}})
        

        // TODO: Validasi apakah id ada
        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }else{
            await tiket.update({
                "transaction_id" : datas.transaction_id,
                "passenger_id" : datas.passenger_id,
                "price" : datas.prices,
                "type_of_class" : datas.type_of_class,
                "type_of_passenger" : datas.type_of_passengere,
                "flight_id" : datas.flight_id,
                "seat_id" : datas.seat_id
            }, {
                where: {
                    id : id
                }
            })
            res.status(200).json({
                status: 'success',
                message: `Data dengan index ${datas} telah berhasil terupdate`,
                data: dataId
            })
        }

        
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

const deleteTiket = async (req, res) => {
    try {
        const id = req.params.id

        const dataId = await tiket.findByPk(id)

        // TODO: Validasi apakah id ada
        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }

        await tiket.destroy({
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

module.exports = {
    getTiket,
    getIdTiket,
    postTiket,
    updateTiket,
    deleteTiket
}