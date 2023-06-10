const router = require('express').Router()
const auth = require('../middleware/auth')
const airportController = require('../controller/airportController')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin", "user"]), airportController.getAirport)
router.get("/:id", auth, checkRole(["admin", "user"]), airportController.getIdAirport)
router.post("/", auth, checkRole(["admin"]), airportController.postAirport)
router.put("/:id", auth, checkRole(["admin"]), airportController.updateAirport)
router.delete("/:id", auth, checkRole(["admin"]), airportController.deleteAirport)

module.exports = router