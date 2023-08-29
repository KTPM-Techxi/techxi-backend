const admin = require("firebase-admin");
const serviceAccount = require("../../techxi-firebase-admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const fcmSendData = async (fcmToken, data) => {
    admin
        .messaging()
        .send({
            token: fcmToken,
            data: data
        })
        .then((res) => {
            console.log("Successfully sent message:", res);
        })
        .catch((error) => {
            console.log("Error sending message:", error);
        });
};

module.exports = {fcmSendData}