const Joi = require('joi')
const { tiket } = require('../models')

const getTiket = async (req, res) => {
    data = await tiket.findAll({
        order: [["id", "Asc"]],
        include: { all: true, nested: true }
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
        const data = await tiket.findByPk(id, {
            include: { all: true, nested: true }
        })

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
    const schema = Joi.object({
        seat_id: Joi.number().integer().required().label("ID seat"),
        flight_id: Joi.number().integer().required().label("ID Flight"),
        passenger_id: Joi.number().integer().required().label("ID Passenger"),
        transaction_id: Joi.number().integer().required().label("ID Transaction"),
        type_of_class: Joi.valid("Economy Class", "Business Class", "First Class", "Premium Class").required().label("Type Class Flight"),
        type_of_passenger: Joi.valid("Adult", "Child", "Baby").required().label("Type Passenger"),
        price: Joi.number().required()
    })

    const val = schema.validate(req.body)

    if (!(val.error)) {
        try {
            const datas = val.value

            const data = await tiket.create({
                ...datas
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
    } else {
        const message = val.error.details[0].message
        res.status(400).json({
            status: "failed",
            message
        })
    }
}

const updateTiket = async (req, res) => {
    try {
        const datas = req.body
        const id = req.params.id

        const dataId = await tiket.findOne({ where: { id } })


        // TODO: Validasi apakah id ada
        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        } else {
            await tiket.update({
                ...datas
            }, {
                where: {
                    id: id
                }
            })
            res.status(200).json({
                status: 'success',
                message: `Data dengan index ${id} telah berhasil terupdate`,
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