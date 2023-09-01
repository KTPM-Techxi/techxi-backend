const amqp = require("amqplib");
const cfg = require("../../common/config").loadConfig();

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message to the exchange with a routing key

class rabbitmq_sender {
    channel;

    async createChannel() {
        const connection = await amqp.connect(cfg.rabbitmq_url);
        this.channel = await connection.createChannel();
    }

    async publishMessage(bookingObject) {
        if (!this.channel) {
            await this.createChannel();
        }
        const routingKey = "toCoord";
        const exchangeName = "address-coord";
        await this.channel.assertExchange(exchangeName, "direct");

        const data = bookingObject;
        await this.channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data)));
    }
}

module.exports = rabbitmq_sender;
