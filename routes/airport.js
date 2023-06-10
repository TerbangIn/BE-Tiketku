const router = require('express').Router()
const auth = require('../middleware/auth')
const airportController = require('../controller/airportController')
const checkRole = require('../middleware/checkRole')

router.get("/", airportController.getAirport)
router.get("/:id", airportController.getIdAirport)
router.post("/", airportController.postAirport)
router.put("/:id", airportController.updateAirport)
router.delete("/:id", airportController.deleteAirport)

module.exports = router