const router = require('express').Router()
const auth = require('../middleware/auth')
const informationController = require('../controller/informationController')
const checkRole = require('../middleware/checkRole')

router.get("/", informationController.getInformation)
router.get("/:id", informationController.getIdInformation)
router.post("/", auth, checkRole(["admin"]), informationController.postInformation)
router.put("/:id", auth, checkRole(["admin"]), informationController.updateInformation)
router.delete("/:id", auth, checkRole(["admin"]), informationController.deleteInformation)

module.exports = router