const express=require("express")
const router=express.Router();
const bookingController=require("../controller/booking")

router.post("/booking",bookingController.addbooking);
router.get("/booking/:id",bookingController.getBooking);
module.exports=router;