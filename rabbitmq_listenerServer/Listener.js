const amqp = require("amqplib");
const axios = require("axios");

async function convertToCoord(address) {
    try {
        const searchText = encodeURIComponent(address);

        return await axios.get(`https://rsapi.goong.io/geocode?address=${searchText}&api_key=NdHC0NcH8Om0kgYqIwrmdALpmlANLlST3CLWW45M`);
    } catch (error) {
        console.log(error);
    }
}

async function consumeMessages() {
    const connection = await amqp.connect("amqps://qgkfypdz:bpDTputLB1EzSTiB0N5Of_OvINBuX8Yq@armadillo.rmq.cloudamqp.com/qgkfypdz");
    const channel = await connection.createChannel();

    await channel.assertExchange("address-coord", "direct");

    const q = await channel.assertQueue("coordConverter");

    await channel.bindQueue(q.queue, "address-coord", "toCoord");

    channel.consume(q.queue, async (msg) => {
        const data = JSON.parse(msg.content);

        const res = await convertToCoord(data.address);

        if (res.data.results) {
            const coordinate = { latitude: res.data.results[0].geometry.location.lat, longitude: res.data.results[0].geometry.location.lng };
            console.log(coordinate);
            // api create booking
            // api create address-coord
            channel.ack(msg);
        }
    });
}

consumeMessages();
