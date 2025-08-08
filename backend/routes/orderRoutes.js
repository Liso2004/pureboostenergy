const express = require("express");
const router = express.Router();
const { placeOrder, getOrdersByUser, getOrderDetails } = require("../controllers/orderController");

//place a order 
router.get("/",placeOrder);

//get order by user 
router.get("/:user/:user_id",getOrdersByUser);

//get order by details 
router.get("/:order_id",getOrderDetails);

module.exports = router;