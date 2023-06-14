const router = require('express').Router()
const auth = require('../middleware/auth')
const userController = require('../controller/userController')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin"]), userController.getUsers)
router.get("/:id", auth, checkRole(["admin", "user"]), userController.getIdUser)
router.post("/register", userController.postUser)
router.post("/login", userController.login)
router.put('/:id', auth, checkRole(["admin", "user"]), userController.updateUser)
router.delete('/:id', auth, checkRole(["admin", "user"]), userController.deleteUser)
router.post("/otp/:id",auth,checkRole(["user","admin"]),userController.otp);

module.exports = router