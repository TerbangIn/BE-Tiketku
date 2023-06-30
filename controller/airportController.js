const { airport } = require('../models')

const getAirport = async (req, res) => {
    data = await airport.findAll({
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

const getIdAirport = async (req, res) => {
    try {
        const id = req.params.id
        const data = await airport.findByPk(id)

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

const postAirport = async (req, res) => {
    try {
        const { name, code, ...rest } = req.body

        const nameAirport = await airport.findOne({
            where: {
                name
            }
        })

        if (nameAirport !== null) {
            return res.status(404).json({
                status: 'failed',
                message: `Nama ${name} sudah ada`
            })
        }

        const codeAirport = await airport.findOne({
            where: {
                code
            }
        })

        if (codeAirport !== null) {
            return res.status(404).json({
                status: 'failed',
                message: `Code ${code} sudah ada`
            })
        }

        const data = await airport.create({
            name,
            code,
            ...rest
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

const updateAirport = async (req, res) => {
    try {
        const { name, code,city, ...rest } = req.body
        const id = req.params.id

        const dataId = await airport.findByPk(id)

        // TODO: Validasi apakah id ada
        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }

        const nameAirport = await airport.findOne({
            where: {
                name
            }
        })

        if (nameAirport !== null && nameAirport.dataValues.id === Number(id)) {
            return res.status(404).json({
                status: 'failed',
                message: `Nama ${name} sudah ada`
            })
        }

        const codeAirport = await airport.findOne({
            where: {
                code
            }
        })

        if (codeAirport !== null && codeAirport.dataValues.id === Number(id)) {
            return res.status(404).json({
                status: 'failed',
                message: `Code ${code} sudah ada`
            })
        }

        await airport.update({
            name,
            city,
            code,
            ...rest
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

const deleteAirport = async (req, res) => {
    try {
        const id = req.params.id

        const dataId = await airport.findByPk(id)

        // TODO: Validasi apakah id ada
        if (dataId === null) {
            res.status(404).json({
                status: 'failed',
                message: `Data dengan id ${id}, tidak ditemukan`
            })
        }

        await airport.destroy({
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
    getAirport,
    getIdAirport,
    postAirport,
    updateAirport,
    deleteAirport
}