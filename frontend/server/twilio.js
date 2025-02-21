require("dotenv").config();
const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, message) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to, // Receiver's phone number
        });

        console.log("✅ SMS Sent:", response.sid);
        return response;
    } catch (error) {
        console.error("❌ Error sending SMS:", error);
    }
};

module.exports = sendSMS;
