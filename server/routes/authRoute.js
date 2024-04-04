const express = require("express")
const router = express.Router()

const authController = require("../controller/authController")

router.post("/login", authController.login)
router.post("/registerClient", authController.registerClient)
router.post("/registerWorker", authController.registerWorker)

module.exports = router