const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const admin = require("./firebase.js");
const sendSMS = require("./twilio");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

const customerroutes = require("./routes/customer");
const routesroute = require("./routes/route");
const bookingroute = require("./routes/booking");

app.use(bookingroute);
app.use(routesroute);
app.use(customerroutes);

const DBURL = "mongodb+srv://admin:admin@tedbus.vqk1yid.mongodb.net/?retryWrites=true&w=majority&appName=tedbus";
mongoose.connect(DBURL)
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.error('Mongodb connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello , Ted bus is working');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

// Send Push Notification
app.post("/send-notification", async (req, res) => {
    const { title, body, token } = req.body;

    const message = {
        notification: {
            title: title,
            body: body,
        },
        token: token,
    };

    try {
        await admin.messaging().send(message);
        res.status(200).send("Notification sent successfully!");
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).send("Failed to send notification");
    }
});

// Send SMS Notification
app.post("/send-sms", async (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
        return res.status(400).json({ error: "Phone number and message are required" });
    }

    try {
        const response = await sendSMS(phone, message);
        res.status(200).json({ success: true, response });
    } catch (error) {
        console.error("Error sending SMS:", error);
        res.status(500).json({ error: "Failed to send SMS" });
    }
});
