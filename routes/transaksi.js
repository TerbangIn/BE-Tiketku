const router = require('express').Router()
const Transaksi = require('../controller/transaksiController')
const auth = require('../middleware/auth')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin", "user"]), Transaksi.getTransaksi)
router.get("/:id", auth, checkRole(["admin", "user"]), Transaksi.getIdTransaksi)
router.post("/", auth, checkRole(["admin"]), Transaksi.createTransaksi)
router.put("/:id", auth, checkRole(["admin"]), Transaksi.updateTransaksi)
router.delete("/:id", auth, checkRole(["admin"]), Transaksi.deleteTransaksi)


module.exports = router