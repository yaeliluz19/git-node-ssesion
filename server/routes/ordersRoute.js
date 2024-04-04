const express = require("express")
const router = express.Router()
const verifyJWT =require("../middleware/verifyJWT")

const orderController=require("../controller/orderController")

router.use(verifyJWT)

router.get("/getAllOrders",orderController.getAllOrders)
router.get("/getOrdersHistory",orderController.getOrdersHistory)
router.get("/getOrdersDone",orderController.getOrdersDone)
router.get("/getOrdersaccepted",orderController.getOrdersaccepted)
router.get("/getOrderByIdClient/:idClient",orderController.getOrderByIdClient)
router.post("/create", orderController.createOrder)
router.put("/update/:id",orderController.updateOrder)
router.put("/updateStatus/:id",orderController.updateStatus)

module.exports = router