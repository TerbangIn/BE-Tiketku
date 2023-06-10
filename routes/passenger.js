const router = require('express').Router()
const auth = require('../middleware/auth')
const passengerController = require('../controller/passengerController')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin", "user"]), passengerController.getPassenger)
router.get("/:id", auth, checkRole(["admin", "user"]), passengerController.getIdPassenger)
router.post("/", auth, checkRole(["admin"]), passengerController.postPassenger)
router.put("/:id", auth, checkRole(["admin"]), passengerController.updatePassenger)
router.delete("/:id", auth, checkRole(["admin"]), passengerController.deletePassenger)

module.exports = router