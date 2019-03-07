const express = require('express');
const router = express.Router();
const checkAuth = require("../middleWare/check-auth");
const OrdersControllers = require('../controllers/orders');


router.get('/' ,  checkAuth , OrdersControllers.Orders_Get_all_orders);

router.post('/',checkAuth, OrdersControllers.Orders_Create_Order);

router.get('/:orderID',checkAuth, OrdersControllers.Orders_get_single_order)

router.delete('/:orderID',checkAuth, OrdersControllers.Orders_delete_order)
module.exports=router;