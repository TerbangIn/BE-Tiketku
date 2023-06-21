const router = require('express').Router()
const auth = require('../middleware/auth')
const paymentController = require('../controller/paymentController')
const checkRole = require('../middleware/checkRole')

router.get("/", paymentController.getPayment)
router.get("/:id", auth, checkRole(["admin", "user"]), paymentController.getIdPayment)
router.post("/", auth, checkRole(["admin"]), paymentController.postPayment)
router.put("/:id", auth, checkRole(["admin"]), paymentController.updatePayment)
router.delete("/:id", auth, checkRole(["admin"]), paymentController.deletePayment)

module.exports = router