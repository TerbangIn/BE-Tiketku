const router = require('express').Router()
const auth = require('../middleware/auth')
const userController = require('../controller/userController')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin"]), userController.getUsers)
router.get("/:id", auth, checkRole(["admin", "user"]), userController.getIdUser)
router.get("/search/", auth, checkRole(["admin", "user"]), userController.getIdEmail)
router.post("/register", userController.postUser)
router.post("/login", userController.login)
router.put('/:id', auth, checkRole(["admin", "user"]), userController.updateUser)
router.delete('/:id', auth, checkRole(["admin", "user"]), userController.deleteUser)
router.post("/otp",userController.otp);
router.post("/verify", userController.verify)
router.post("/forget-password", userController.verifyForgetPassword)


module.exports = router