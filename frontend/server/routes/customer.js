const express=require("express")
const router=express.Router();
const customercontroller=require("../controller/customer")

router.post("/customer",customercontroller.addnewcustomer)

module.exports=router;