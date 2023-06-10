const router = require('express').Router()
const auth = require('../middleware/auth')
const tiketController = require('../controller/tiketController')
const checkRole = require('../middleware/checkRole')

router.get("/", auth, checkRole(["admin", "user"]), tiketController.getTiket)
router.get("/:id", auth, checkRole(["admin", "user"]), tiketController.getIdTiket)
router.post("/", auth, checkRole(["admin"]), tiketController.postTiket)
router.put("/:id", auth, checkRole(["admin"]), tiketController.updateTiket)
router.delete("/:id", auth, checkRole(["admin"]), tiketController.deleteTiket)

module.exports = router