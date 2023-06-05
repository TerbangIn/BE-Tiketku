const router = require('express').Router()
const User = require('../controller/userController')

router.get('/', User.getUser)


module.exports = router