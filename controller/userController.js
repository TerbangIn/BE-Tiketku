const { user } = require('../models')

const getUser = async (req, res) => {
  try {
    let data = await user.findAll()

    return res.status(200).json({
      status: 'success',
      data
    })
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: err.message,
    })
  }
}

module.exports = {
  getUser
}