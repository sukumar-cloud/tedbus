const express=require('express')
const bodyparser=require('body-parser')
const cors =require('cors')
const mongoose=require('mongoose')

const app=express();

app.use(cors());
app.use(bodyparser.json())
const customerroutes=require("./routes/customer");
const routesroute=require("./routes/route");
const bookingroute=require("./routes/booking")
app.use(bookingroute)
app.use(routesroute)
app.use(customerroutes)

const DBURL="mongodb+srv://admin:admin@tedbus.vqk1yid.mongodb.net/?retryWrites=true&w=majority&appName=tedbus"
mongoose.connect(DBURL)
.then(()=> console.log("Mongodb connected"))
.catch(err=> console.error('Mongodb connection error:' ,err))

app.get('/',(req,res)=>{
    res.send('Hello , Ted bus is working')
})

const PORT= 5000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
