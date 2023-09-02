const admin = require("firebase-admin");
const serviceAccount = require("../../techxi-firebase-admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const fcm = "ebn-kw66R7K6twNLeIkPdZ:APA91bF0O0TknIaGqF4F1uC_KDXIK2tLhQ3ycd3Lyw1ZXgJYXc3ek4kXQWk1v8AAkRv8Lg3OIIm2RQRFGjSDLO5DrRIJQqNwHj2LlL00UiEIaTp5h90OX4gSagI4rj4gifV-RTzSVcU";
const fcmSendData = async (fcmToken = fcm, data) => {
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

module.exports = { fcmSendData };
