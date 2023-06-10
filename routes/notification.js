const router = require('express').Router()
const auth = require('../middleware/auth')
const notificationController = require('../controller/notificationController')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin", "user"]), notificationController.getNotification)
router.get("/:id", auth, checkRole(["admin", "user"]), notificationController.getIdNotification)
router.post("/", auth, checkRole(["admin"]), notificationController.postNotification)
router.put("/:id", auth, checkRole(["admin"]), notificationController.updateNotification)
router.delete("/:id", auth, checkRole(["admin"]), notificationController.deleteNotification)

module.exports = router