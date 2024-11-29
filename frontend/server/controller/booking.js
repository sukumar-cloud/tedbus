const Booking=require("../models/booking");

exports.addbooking=async(req,res)=>{
    const booking =await Booking.create(req.body);
    console.log(booking);
    res.send(booking);
}

exports.getBooking =async(req,res)=>{
    let {id}=req.params;
    const booking=await Booking.find().lean().exec();
    let filteredBookings=booking.filter((booking)=>booking.customerId.toString()== id);
    res.send(filteredBookings)
}