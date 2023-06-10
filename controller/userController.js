const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { user } = require('../models/')

const getUsers = async (req, res) => {
  const data = await user.findAll()

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

const getIdUser = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const id = req.params.id
    const data = await user.findByPk(id)

    // TODO: Validasi apakah id ada
    if (data !== null) {
      res.status(200).json({
        status: 'success',
        data
      })
    } else {
      res.status(500).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const postUser = async (req, res) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().label("email"),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,}$/, "password").required(),
    phone_number: Joi.string().pattern(/^(^\+62\s?|^0)(\d{10,14})$/, "No Telp").required().label("No Telp"),
    role: Joi.valid("admin", "user")
  })

  const val = schema.validate(req.body)

  if (!(val.error)) {
    // try {
    const { first_name, password, role, ...rest } = val.value

    const hashPassword = bcrypt.hashSync(password, 10)

    // TODO: name sudah ada
    const Name = await user.findOne({
      where: {
        first_name
      }
    })

    if (Name !== null) {
      return res.status(500).json({
        status: 'failed',
        message: `Nama ${first_name} sudah ada`
      })
    }
    // minimal password

    const data = await user.create({
      first_name,
      ...rest,
      password: hashPassword,
      role
    })

    res.status(201).json({
      status: `Anda berhasil register sebagai ${role}`,
      data
    })
    // } catch (error) {
    //   res.status(400).json({
    //     status: "failed",
    //     message: error.message
    //   })
    // }
  } else {
    const message = val.error.details[0].message
    res.status(400).json({
      status: "failed",
      message
    })
  }
}

const updateUser = async (req, res) => {
  const id = req.params.id

  const dataId = await user.findByPk(id)

  // TODO: Validasi apakah id ada
  if (dataId === null) {
    res.status(500).json({
      status: 'failed',
      message: `Data dengan id ${id}, tidak ditemukan`
    })
  }

  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().label("email"),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,}$/, "password").required(),
    no_telp: Joi.string().pattern(/^(^\+62\s?|^0)(\d{10,14})$/, "No Telp").required().label("No Telp"),
    role: Joi.valid("admin", "user")
  })

  const val = schema.validate(req.body)

  if (!(val.error)) {
    // console.log(val);
    // try {
    const { name, password, ...rest } = val.value
    const hashPassword = bcrypt.hashSync(password, 10)

    const Name = await user.findOne({
      where: {
        name: name
      }
    })
    const userId = await user.findOne({
      where: {
        id
      }
    })

    // TODO: Validasi apakah name sudah ada
    if (Name !== null && Name === userId) {
      return res.status(400).json({
        status: 'failed',
        message: `name ${name} sudah ada`
      })
    }

    await user.update({
      password: hashPassword,
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
    // } catch (err) {
    //   res.status(400).json({
    //     status: 'success',
    //     message: err.message
    //   })
    // }
  } else {
    // console.log(val);
    const message = val.error.details[0].message
    res.status(400).json({
      status: "failed",
      message
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id

    const dataId = user.findByPk(id)

    // TODO: Validasi apakah id ada
    if (dataId === null) {
      res.status(500).json({
        status: 'failed',
        message: `Data dengan id ${id}, tidak ditemukan`
      })
    }

    await user.destroy({
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const users = await user.findOne({
      where: {
        email
      }
    })

    if (!users) {
      return res.status(500).json({
        status: 'failed',
        message: `Data dengan email ${email}, tidak ditemukan`
      })
    }

    // console.log(bcrypt.compareSync(password, users.password), password, users.password);
    if (users && bcrypt.compareSync(password, users.password)) {
      const token = jwt.sign({
        id: users.id,
        email: users.email,
        role: users.role
      }, process.env.JWT_SIGNATURE_KEY)

      res.status(200).json({
        status: `Anda berhasil login sebagai ${users.role}`,
        data: {
          users,
          token
        }
      })
    } else {
      res.status(409).json({
        status: "failed",
        message: `Periksa kembali email dan password anda`
      })
    }

  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}

module.exports = {
  getUsers,
  getIdUser,
  postUser,
  updateUser,
  deleteUser,
  login
}