const router = require('express').Router()
const Transaction = require('../controller/transactionController')
const auth = require('../middleware/auth')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin", "user"]), Transaction.getTransaction)
router.get("/:id", auth, checkRole(["admin", "user"]), Transaction.getIdTransaction)
router.post("/payment/:id", Transaction.getSnapRedirect)
router.get('/payment/success', Transaction.midtransCallback)
router.post('/payment/success', Transaction.midtransCallback)
router.post("/", auth, checkRole(["admin", "user"]), Transaction.postTransaction)
router.put("/:id", auth, checkRole(["admin"]), Transaction.updateTransaction)
router.delete("/:id", auth, checkRole(["admin"]), Transaction.deleteTransaction)


module.exports = router
