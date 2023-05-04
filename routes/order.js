const router = require('express').Router();
const tokenChecker = require('./jwtVerify');
const orderController = require('../controllers/order');

//place an order
//done in cartRoute

//cancelOrder
router.post('/cancelOrder/:orderId',tokenChecker,orderController.cancelOrder);

//myOrders
router.get('/myOrders',tokenChecker,orderController.myOrders);

//getAllOrders
router.get('/',tokenChecker,orderController.getAllOrders);


// orderStatus(admin will change  when delivered) To mark delivered 
router.post('/:orderId',tokenChecker,orderController.updateOrderStatus);



module.exports = router;