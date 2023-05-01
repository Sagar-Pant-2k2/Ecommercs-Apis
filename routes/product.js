const router = require('express').Router;
router.get('/',async (req,res)=>{
    const products = await product.find();
    res.status(200).json({"products": products});
});


module.exports = router;