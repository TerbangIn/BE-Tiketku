const { notification } = require('../models')

const getNotification = async (req, res) => {
  data = await notification.findAll({
    order: [["id", "Asc"]],
    include: ["users"]
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

const getIdNotification = async (req, res) => {
  try {
    const id = req.params.id
    const data = await notification.findByPk(id)

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

const postNotification = async (req, res) => {
  try {
    const datas = req.body

    const data = await notification.create({
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

const updateNotification = async (req, res) => {
  try {
    const datas = req.body
    const id = req.params.id

    const dataId = await notification.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    await notification.update({
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

const deleteNotification = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await notification.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    await notification.destroy({
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
  getNotification,
  getIdNotification,
  postNotification,
  updateNotification,
  deleteNotification
}