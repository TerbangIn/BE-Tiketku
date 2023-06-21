const Joi = require('joi')
const { passenger } = require('../models')

const getPassenger = async (req, res) => {
    data = await passenger.findAll({
        order: [["id", "Asc"]]
    })

    try {
        if (data.length) {
            return res.status(200).json({
                status: "success",
                data: data
            })
        } else {
            return res.status(200).json({
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

const getIdPassenger = async (req, res) => {
    try {
        const id = req.params.id
        const data = await passenger.findByPk(id)

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

const postPassenger = async (req, res) => {
    const schema = Joi.object({
        title: Joi.valid("Tn.", "Mr.", "Mrs."),
        first_name: Joi.string().required(),
        last_name: Joi.optional(),
        date_of_birth: Joi.date().required(),
        country: Joi.string().required(),
        identity_number: Joi.string().min(8).required(),
        identity_number_of_country: Joi.string().required(),
        expired_date: Joi.date().greater('now').required()
    })

    const val = schema.validate(req.body)

    if (!(val.error)) {
        const datas = val.value

        const data = await passenger.create({
            ...datas
        })

        try {
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

const updatePassenger = async (req, res) => {
    const id = req.params.id

    const dataId = await passenger.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
        res.status(404).json({
            status: 'failed',
            message: `Data dengan id ${id}, tidak ditemukan`
        })
    }

    const schema = Joi.object({
        title: Joi.valid("Tn.", "Mr.", "Mrs."),
        first_name: Joi.string().required(),
        last_name: Joi.optional(),
        date_of_birth: Joi.date().required(),
        country: Joi.string().required(),
        identity_number: Joi.string().min(8).required(),
        identity_number_of_country: Joi.string().required(),
        expired_date: Joi.date().greater('now').required()
    })

    const val = schema.validate(req.body)

    if (!(val.error)) {
        const datas = val.value

        await passenger.update({
            ...datas
        }, {
            where: {
                id
            }
        })

        try {
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
    } else {
        const message = val.error.details[0].message
        res.status(400).json({
            status: "failed",
            message
        })
    }
}

const deletePassenger = async (req, res) => {
    try {
        const id = req.params.id

        const dataId = await passenger.findByPk(id)

        // TODO: Validasi apakah id ada
        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }

        await passenger.destroy({
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
    getPassenger,
    getIdPassenger,
    postPassenger,
    updatePassenger,
    deletePassenger
}