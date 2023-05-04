const router = require('express').Router();
const tokenChecker = require('./jwtVerify');
const orderController = require('../controllers/order');

//place an order
router.post('/placeOrder',tokenChecker,orderController.placeOrder);

//cancelOrder
router.post('/cancelOrder/:orderId',tokenChecker,orderController.cancelOrder);

//myOrders
router.get('/myOrders',tokenChecker,orderController.myOrders);

//getAllOrders
router.get('/',tokenChecker,orderController.getAllOrders);

//getOrder
router.get('/:orderId',tokenChecker,orderController.getOrder);




module.exports = router;