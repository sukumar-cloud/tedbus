const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Path to your downloaded JSON key

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-database-url.firebaseio.com",
});

module.exports = admin;
