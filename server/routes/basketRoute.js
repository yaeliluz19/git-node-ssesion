const express = require("express")
const router = express.Router()
const BasketController = require("../controller/basketController");

const verifyJWT = require("../middleware/verifyJWT")
router.use(verifyJWT)

router.get("/", BasketController.getAllCart)
router.post("/:sweetId", BasketController.addNewProd)
router.delete("/", BasketController.deleteProduct)
router.put("/", BasketController.updateQuantityOfProduct)

module.exports = router 
