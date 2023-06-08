const { user } = require('../models')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const getUsers = async (req, res) => {
  try {
    const data = await user.findAll()

    if (data.length) {
      return res.status(200).json({
        status: "success",
        data
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
      res.status(404).json({
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
  try {
    const { name, password, role, ...rest } = req.body

    const hashPassword = bcrypt.hashSync(password, 10)

    // TODO: name sudah ada

    // Cara 1
    // const data = await user.findAll()
    // const Name = data.find(el => el.name === name);

    // Cara 2
    const Name = await user.findOne({
      where: {
        name
      }
    })

    if (Name !== null) {
      return res.status(404).json({
        status: 'failed',
        message: `Nama ${name} sudah ada`
      })
    }
    // minimal password

    const newUsers = await user.create({
      name,
      ...rest,
      password: hashPassword,
      role
    })

    res.status(201).json({
      status: `Anda berhasil register sebagai ${role}`,
      data: newUsers
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message
    })
  }
}

const updateUser = async (req, res) => {
  const { name, password } = req.body
  const id = req.params.id

  const dataId = await user.findByPk(id)

  // TODO: Validasi apakah id ada
  if (dataId === null) {
    res.status(404).json({
      status: 'failed',
      message: `Data dengan id ${id}, tidak ditemukan`
    })
  }

  const schema = Joi.object({
    name: Joi.required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().label("email"),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,}$/, "password").required(),
    no_telp: Joi.required().label("No Telp"),
    role: Joi.valid("admin", "user")
  })

  const val = schema.validate(req.body)

  if (!(val.error)) {
    console.log(val);
    const { password, ...rest } = val.value
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
      res.status(404).json({
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
      return res.status(404).json({
        status: 'failed',
        message: `email ${email} tidak ditemukan`
      })
    }

    console.log(bcrypt.compareSync(password, users.password), password, users.password);
    if (users && bcrypt.compareSync(password, users.password)) {
      const token = jwt.sign({
        id: users.id,
        email: users.email,
        role: users.role
      }, process.env.JWT_SIGNATURE_KEY)
      // name sudah ada
      // minimal password

      res.status(200).json({
        status: `Anda berhasil login sebagai ${users.role}`,
        data: {
          users,
          token
        }
      })
    } else {
      res.status(500).json({
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