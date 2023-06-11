const router = require('express').Router()
const auth = require('../middleware/auth')
const flightController = require('../controller/flightController')
const checkRole = require('../middleware/checkRole')

router.get("/", flightController.getFlight)
router.get("/:id", auth, checkRole(["admin", "user"]), flightController.getIdFlight)
router.post("/", auth, checkRole(["admin"]), flightController.postFlight)
router.put("/:id", auth, checkRole(["admin"]), flightController.updateFlight)
router.delete("/:id", auth, checkRole(["admin"]), flightController.deleteFlight)

module.exports = router