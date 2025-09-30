
const express =require("express")
const router =express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const{ getProducts,decreaseStockQuantity,increaseStockQuantity,deleteProducts,createProducts,getproduct , getProductsUnderthreshold} =require("../controller/productcontroller")

router.route("/products").get(getProducts);
router.route("/product")
.post(createProducts)

//With req.params.id
router.route("/product/:id")
.delete(deleteProducts)
.get(getproduct)

//Increase Endpoint
router.route("/product/increase/:id/:stock_quantity")
.put(increaseStockQuantity)

//DecreaseEndpoint
router.route("/product/decrease/:id/:stock_quantity")
.put(decreaseStockQuantity)

router.route("/products/threshold/")
.get(getProductsUnderthreshold)
//products Below Threshold
router.route("/products/threshold/:threshold")
.get(getProductsUnderthreshold)


module.exports = router;