import amqp from "amqplib";

const RABBITMQ_URL = "amqp://localhost";

export class RabbitMQ {
  private static connection: amqp.Connection;
  private static channel: amqp.Channel;

  static async connect() {
    try {
      this.connection = await amqp.connect(RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
      console.log("✅ Connecté à RabbitMQ");
    } catch (error) {
      console.error("❌ Erreur de connexion à RabbitMQ :", error);
    }
  }

  static async sendToQueue(queue: string, message: object) {
    if (!this.channel) throw new Error("RabbitMQ non connecté");

    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    console.log(`📤 Message envoyé à '${queue}':`, message);
  }

  static async consumeFromQueue(queue: string, callback: (msg: any) => void) {
    if (!this.channel) throw new Error("RabbitMQ non connecté");

    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        console.log(`📥 Message reçu de '${queue}':`, content);
        callback(content);
        this.channel.ack(msg);
      }
    });
  }
}
