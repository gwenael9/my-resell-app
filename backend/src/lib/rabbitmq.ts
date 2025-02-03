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
}
