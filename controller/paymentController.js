const { payment } = require('../models')

const getPayment = async (req, res) => {
  data = await payment.findAll({
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

const getIdPayment = async (req, res) => {
  try {
    const id = req.params.id
    const data = await payment.findByPk(id)

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

const postPayment = async (req, res) => {
  try {
    const datas = req.body

    const data = await payment.create({
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
}

const updatePayment = async (req, res) => {
  try {
    const { name, code, ...rest } = req.body
    const id = req.params.id

    const dataId = await payment.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    const namePayment = await payment.findOne({
      where: {
        name
      }
    })

    if (namePayment !== null && namePayment.dataValues.id === Number(id)) {
      return res.status(404).json({
        status: 'failed',
        message: `Nama ${name} sudah ada`
      })
    }

    const codePayment = await payment.findOne({
      where: {
        code
      }
    })

    if (codePayment !== null && codePayment.dataValues.id === Number(id)) {
      return res.status(404).json({
        status: 'failed',
        message: `Code ${code} sudah ada`
      })
    }

    await payment.update({
      name,
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

const deletePayment = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = await payment.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(404).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    await payment.destroy({
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
  getPayment,
  getIdPayment,
  postPayment,
  updatePayment,
  deletePayment
}