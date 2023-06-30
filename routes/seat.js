const router = require('express').Router()
const auth = require('../middleware/auth')
const seatController = require('../controller/seatController')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin", "user"]), seatController.getSeat)
router.get("/:id", auth, checkRole(["admin", "user"]), seatController.getIdSeat)
router.post("/", auth, checkRole(["admin"]), seatController.postSeat)
router.put("/:id", auth, checkRole(["admin", "user"]), seatController.updateSeat)
router.delete("/:id", auth, checkRole(["admin"]), seatController.deleteSeat)

module.exports = router