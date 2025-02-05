import amqp from "amqplib";
import { Message } from "../workers/article.worker";
import * as dotenv from "dotenv";

dotenv.config();

export class RabbitMQ {
  private static connection: amqp.Connection;
  private static channel: amqp.Channel;

  static async connect() {
    try {
      this.connection = await amqp.connect(`amqp://${process.env.RABBITMQ_NAME}:${process.env.RABBITMQ_PASSWORD}@localhost`);
      this.channel = await this.connection.createChannel();
      console.log("✅ Connexion à RabbitMQ établie");

      // Configuration des exchanges et queues après connexion
      await this.setupExchangesAndQueues();
    } catch (error) {
      console.error("❌ Erreur de connexion à RabbitMQ :", error);
    }
  }

  static async setupExchangesAndQueues() {
    const exchange = "cqrs_exchange";
    await this.channel.assertExchange(exchange, "direct", { durable: true });

    // Déclaration des queues pour CQRS
    await this.channel.assertQueue("history_queue", { durable: true });
    await this.channel.assertQueue("log_queue", { durable: true });

    // Bind des queues à l'exchange
    await this.channel.bindQueue("history_queue", exchange, "history");
    await this.channel.bindQueue("log_queue", exchange, "logs");

    console.log("✅ Exchanges et queues configurés");
  }

  static async publishToExchange(
    exchange: string,
    routingKey: string,
    message: Message
  ) {
    try {
      console.log(
        `📤 Message envoyé à RabbitMQ :`,
        JSON.stringify(message, null, 2)
      );

      const msgBuffer = Buffer.from(JSON.stringify(message));
      await this.channel.publish(exchange, routingKey, msgBuffer);
      console.log(
        `📢 Message publié sur l'échange "${exchange}" avec la clé "${routingKey}" :`,
        message
      );
    } catch (error) {
      console.error("❌ Erreur lors de la publication du message :", error);
    }
  }

  static async consumeFromExchange(
    queue: string,
    callback: (message: Message) => void
  ) {
    try {
      console.log("Consommation depuis la queue :", queue);
      await this.channel.consume(queue, (msg) => {
        if (msg) {
          const messageContent = JSON.parse(msg.content.toString());
          callback(messageContent);
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      console.error("❌ Erreur lors de la consommation des messages :", error);
    }
  }

  static async publishLog(message: string) {
    const logMessage = {
      timestamp: new Date().toISOString(),
      message: message,
    };
    await this.publishToExchange("cqrs_exchange", "logs", logMessage);
    console.log("📤 Log envoyé à RabbitMQ :", logMessage);
  }

  static async consumeLogs() {
    await this.consumeFromExchange("log_queue", (message) => {
      console.log("📥 Log reçu : ", message);
    });
  }

  static async closeConnection() {
    try {
      await this.channel.close();
      await this.connection.close();
      console.log("🔒 Connexion à RabbitMQ fermée");
    } catch (error) {
      console.error(
        "❌ Erreur lors de la fermeture de la connexion RabbitMQ :",
        error
      );
    }
  }
}
