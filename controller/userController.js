require('dotenv').config()
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { user } = require('../models')
const nodemailer = require('nodemailer')

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 567,
  secure: false, // true for 465, false for other ports
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnAuthorized: true
  }
})
const getUsers = async (req, res) => {
  const data = await user.findAll({
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

const getIdEmail = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const email = req.query.email

     const data = await user.findOne({
      where : {
         email 
       }
    })

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


const getIdUser = async (req, res) => {
  try {
    // const { name, price, stock } = req.body
    const id = req.params.id
    const data = await user.findByPk(id, {
      include: { all: true, nested: true }
    })

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
    first_name: Joi.string().min(2).required().label("Full Name"),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().label("email"),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,}$/, "password").required(),
    phone_number: Joi.string().pattern(/^(^\+62\s?|^0)(\d{10,14})$/, "No Telp").required().label("No Telp"),
    role: Joi.valid("admin", "user")
  })

  const val = schema.validate(req.body)

  if (!(val.error)) {
    try {
      const { email, password, role, ...rest } = val.value

      const hashPassword = bcrypt.hashSync(password, 10)

      // TODO: email sudah ada
      const Email = await user.findOne({
        where: {
          email
        }
      })

      if (Email !== null) {
        return res.status(500).json({
          status: 'failed',
          message: `Email ${email} sudah ada`
        })
      }
      // minimal password

      const data = await user.create({
        email,
        ...rest,
        password: hashPassword,
        role
      })

      let generatedOTP = () => {
        let digit = '0123456789'
        let OTP = ''
        for (let i = 1; i <= 6; i++) {
          OTP += digit[Math.floor(Math.random() * 10)];
        }
        return OTP;
      }

      let otp = generatedOTP()

      await user.update({
        otp: otp,
        expiration_time: AddMinutesToDate(new Date(), 10)
      }, {
        where: {
          email
        }
      })
      // transporter.verify().then(console.log).catch(console.error);
      const mailData = {
        from: process.env.EMAIL,
        to: email,
        subject: `OTP For Verify`,
        text: `This is Your OTP`,
        html: `<b> ${otp} </b>`
      }
      await transporter.sendMail(mailData, async (err, info) => {
        if (err) {
          res.status(400).json({
            status: "failed",
            message: err.message
          })
        }
        res.status(201).json({
          status: `Anda berhasil register sebagai ${role ?? "user"}. Silahkan verify otp kamu`,
          data
        })
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

const verifyForgetPassword = async (req, res) => {
  try {
    const { email, otp, password, confirm_password } = req.body
    const users = await user.findOne({ where: { email } })

    if (users && users.otp === otp) {
      if (password === confirm_password) {
        const hashPassword = bcrypt.hashSync(password, 10)
        await user.update({
          password: hashPassword
        }, {
          where: {
            email
          }
        })
        res.status(200).json({
          status: 'success',
          message: `Berhasil Mengganti Password`
        })
      } else {
        res.status(409).json({
          status: "failed",
          message: "Password tidak sesuai"
        })
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "Email dan otp tidak sesuai"
      })
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
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
    first_name: Joi.string().min(2).required().label("Full Name"),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required().label("email"),
    phone_number: Joi.string().pattern(/^(^\+62\s?|^0)(\d{10,14})$/, "No Telp").required().label("No Telp"),
    role: Joi.valid("admin", "user")
  })

  const val = schema.validate(req.body)

  if (!(val.error)) {
    try {
      const { email, ...rest } = val.value

      const Email = await user.findOne({
        where: {
          email
        }
      })
      // const userId = await user.findOne({
      //   where: {
      //     id
      //   }
      // })

      // console.log(Email.dataValues === userId.dataValues);
      // TODO: Validasi apakah email sudah ada
      if (Email !== null && Email.dataValues.id === Number(id)) {
        return res.status(400).json({
          status: 'failed',
          message: `Email ${email} sudah ada`
        })
      }

      await user.update({
        email,
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
        status: 'success',
        message: err.message
      })
    }
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

const otp = async (req, res) => {
  try {
    const email = req.body.email

    const Email = await user.findOne({
      where: {
        email
      }
    })

    if (Email === null) {
      return res.status(500).json({
        status: 'failed',
        message: `Email ${email} tidak ada`
      })
    }

    let generatedOTP = () => {
      let digit = '0123456789'
      let OTP = ''
      for (let i = 1; i <= 6; i++) {
        OTP += digit[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }

    let otp = generatedOTP()

    await user.update({
      otp: otp,
      expiration_time: AddMinutesToDate(new Date(), 10)
    }, {
      where: {
        email
      }
    })
    const dataId = await user.findOne({ where: { email } })
    // transporter.verify().then(console.log).catch(console.error);
    const mailData = {
      from: process.env.EMAIL,
      to: email,
      subject: `OTP For Verify`,
      text: `This is Your OTP`,
      html: `<b> ${otp} </b>`
    }
    // console.log(process.env.EMAIL)
    await transporter.sendMail(mailData, async (err, info) => {
      if (err) {
        res.status(400).json({
          status: "failed",
          message: err.message
        })
      }
      res.status(200).json({
        status: 'success',
        message: info.response
      })
    })


  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message
    })
  }
}

const verify = async (req, res) => {
  try {
    const { email, otp } = req.body
    const users = await user.findOne({ where: { email } })
    if (users) {
      if ((users.otp === otp) && (Date.parse(users.expiration_time) > Date.parse(new Date()))) {
        await user.update({
          verified: true
        }, {
          where: {
            email: email
          }
        })
        res.status(200).json({
          status: 'success',
          message: `Anda Berhasil Verifikasi`
        })
      } else {
        res.status(409).json({
          status: "failed",
          message: "Periksa kembali otp anda"
        })
      }
    } else {
      res.status(500).json({
        status: "failed",
        message: "Email tidak terdaftar"
      })
    }
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
      if (users.verified) {
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
        res.status(400).json({
          status: "failed",
          message: `Silahkan verify akun anda`
        })
      }
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
  login,
  otp,
  verify,
  getIdEmail,
  verifyForgetPassword
}
