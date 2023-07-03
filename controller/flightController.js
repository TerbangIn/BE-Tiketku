const { flight } = require('../models')
const axios = require('axios')
const { Op } = require("sequelize")
const getFlight = async (req, res) => {
    data = await flight.findAll({
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
        return res.status(400).json({
            status: "success",
            message: error.message
        })
    }
}

const filterFlight = async (req, res) => {
    try {
        let from = req.body.from
        let to = req.body.to
        let category = req.body.category
        let day = new Date(req.body.date)
        let nextday = new Date(req.body.date)
        nextday.setDate(nextday.getDate() + 1)

        if (category == 'economy') {
            let data = await flight.findAll({
                include: { all: true, nested: true },
                where: {
                    [Op.and]: {
                        '$source.country$': from,
                        '$destination.country$': to,
                        'departure_date': {
                            [Op.and]: {
                                [Op.gte]: day,
                                [Op.lte]: nextday
                            }
                        },
                        'economy_class_price': {
                            [Op.ne]: null
                        }
                    }
                }
            })

            return res.status(200).json({
                status: "success",
                data: data
            })
        } else if (category == 'premium economy') {
            let data = await flight.findAll({
                include: { all: true, nested: true },
                where: {
                    [Op.and]: {
                        '$source.country$': from,
                        '$destination.country$': to,
                        'departure_date': {
                            [Op.and]: {
                                [Op.gte]: day,
                                [Op.lte]: nextday
                            }
                        },
                        'premium_price': {
                            [Op.ne]: null
                        }
                    }
                }
            })

            return res.status(200).json({
                status: "success",
                data: data
            })
        } else if (category == 'first class') {
            let data = await flight.findAll({
                include: { all: true, nested: true },
                where: {
                    [Op.and]: {
                        '$source.country$': from,
                        '$destination.country$': to,
                        'departure_date': {
                            [Op.and]: {
                                [Op.gte]: day,
                                [Op.lte]: nextday
                            }
                        },
                        'first_class_price': {
                            [Op.ne]: null
                        }
                    }
                }
            })

            return res.status(200).json({
                status: "success",
                data: data
            })
        } else if (category === 'bussiness') {
            let data = await flight.findAll({
                include: { all: true, nested: true },
                where: {
                    [Op.and]: {
                        '$source.country$': from,
                        '$destination.country$': to,
                        'departure_date': {
                            [Op.and]: {
                                [Op.gte]: day,
                                [Op.lte]: nextday
                            }
                        },
                        'business_class_price': {
                            [Op.ne]: null
                        }
                    }
                }
            })

            return res.status(200).json({
                status: "success",
                data: data
            })
        } else {

            return res.status(400).json({
                status: "success",
                data: data
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: "success",
            message: error.message
        })
    }
}

const getIdFlight = async (req, res) => {
    try {
        const id = req.params.id

        const data = await flight.findByPk(id,
            {
                include: { all: true, nested: true }
            }
        )

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

const postFlight = async (req, res) => {
    try {
        const datas = req.body

        const data = await flight.create({
            ...datas
        })

        res.status(201).json({
            status: 'Data flight berhasil ditambahkan',
            data
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}

const updateFlight = async (req, res) => {
    try {
        const datas = req.body
        const id = req.params.id

        const dataId = await flight.findByPk(id)

        // TODO: Validasi apakah id ada
        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }

        await flight.update({
            ...datas
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

const deleteFlight = async (req, res) => {
    try {
        const id = req.params.id

        const dataId = await flight.findByPk(id)

        // TODO: Validasi apakah id ada
        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }

        await flight.destroy({
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
    getFlight,
    getIdFlight,
    postFlight,
    updateFlight,
    deleteFlight,
    filterFlight
}