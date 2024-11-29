const Route=require("../models/route");
const Bus=require("../models/bus");
const Booking=require("../models/booking");

exports.getoneroute = async(req,res) => {
    let departure = req.params.departure;
    let arrival= req.params.arrival;
    let date= req.params.date;

    // console.log(departure,arrival,date)
    let routes=await Route.find().lean().exec();
    let route=routes.find((route)=>{
        return(
            route.departureLocation.name.toLowerCase() ==departure.toLowerCase() &&
            route.arrivalLocation.name.toLowerCase() == arrival.toLowerCase()
        );
    });
    let buses=await Bus.find();
    let matchedbuses=buses.filter((bus)=>{
        return bus.routes.toString()=== route._id.toString();
    })

    const booking =await Booking.find().lean().exec();
    const busidwithseatobj={}
    for (let i=0;i<matchedbuses.length;i++){
        let currentbusseats=[]
        const busbooking=booking.filter((booking)=>{
            return(
                booking.departureDetails.date===date &&
                booking.busId.toString() === matchedbuses[i]._id.toString()
            );
        });
    busbooking.forEach((booking)=>{
        currentbusseats=[...currentbusseats,...booking.seats];
    });
    busidwithseatobj[matchedbuses[i]._id.toString()]=currentbusseats;
    }
    res.send({route:route,matchedBuses:matchedbuses,busidwithseatobj})

};