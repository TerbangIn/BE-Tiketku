const { information } = require('../models')

const getInformation = async (req, res) => {
  data = await information_flight.findAll({
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

const getIdInformation = async (req, res) => {
  try {
    const id = req.params.id
    const data = await information_flight.findByPk(id)

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

const postInformation = async (req, res) => {
  try {
    const datas = req.body

    const data = await information_flight.create({
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

const updateInformation = async (req, res) => {
  try {
    const datas = req.body
    const id = req.params.id

    const dataId = await information_flight.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    await information_flight.update({
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

const deleteInformation = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await information_flight.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    await information_flight.destroy({
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
  getInformation,
  getIdInformation,
  postInformation,
  updateInformation,
  deleteInformation
}