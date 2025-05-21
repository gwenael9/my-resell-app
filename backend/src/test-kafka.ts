import KafkaService from "./services/kafka.service";
import { TOPICS } from "./kafka/kafka.config";
import { EventType } from "./kafka/kafka.type";

async function testKafka() {
  const kafkaService = KafkaService.getInstance();

  try {
    // Initialiser le producer
    await kafkaService.initialize();
    console.log("Producer initialized");

    // Initialiser le consumer
    await kafkaService.initializeConsumer();
    console.log("Consumer initialized");

    // S'abonner à tous les topics
    await kafkaService.subscribeToTopics(Object.values(TOPICS));
    console.log("Subscribed to all topics");

    // Envoyer un message de test
    const testMessage = {
      timestamp: Date.now(),
      path: "/test",
      userId: "test-user",
      elementId: "test-button",
      elementClass: "test-class",
      elementText: "Test Button",
      coordinates: { x: 100, y: 200 },
    };

    await kafkaService.produceMessage(
      `test-${Date.now()}`,
      testMessage,
      EventType.CLICK
    );
    console.log("Test message sent");

    // Attendre 5 secondes pour voir les messages
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    // Nettoyer
    // await kafkaService.disconnect();
    // await kafkaService.disconnectConsumer();
    console.log("Cleanup completed");
  }
}

testKafka();
