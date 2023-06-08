const router = require('express').Router()
const auth = require('../middleware/auth')
const userController = require('../controller/userController')
const checkRole = require('../middleware/checkRole')

router.get("/", userController.getUsers)
router.get("/:id", auth, checkRole(["admin"]), userController.getIdUser)
router.post("/register", userController.postUser)
router.post("/login", userController.login)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router