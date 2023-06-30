const router = require('express').Router()
const auth = require('../middleware/auth')
const flightController = require('../controller/flightController')
const checkRole = require('../middleware/checkRole')

router.get("/", flightController.getFlight)
router.get("/filter/", flightController.filterFlight)
router.get("/:id", flightController.getIdFlight)
router.post("/", auth, checkRole(["admin", "user"]), flightController.postFlight)
router.put("/:id", auth, checkRole(["admin"]), flightController.updateFlight)
router.delete("/:id", auth, checkRole(["admin"]), flightController.deleteFlight)

module.exports = router