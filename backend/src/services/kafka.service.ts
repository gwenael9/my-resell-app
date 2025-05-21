import { Kafka, Producer, Consumer, EachMessagePayload } from "kafkajs";
import { TOPICS, KafkaTopic } from "../kafka/kafka.config";
import { EventType } from "../kafka/kafka.type";

class KafkaService {
  private static instance: KafkaService;
  private kafka: Kafka;
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;

  private constructor() {
    this.kafka = new Kafka({
      clientId: "analytics-service",
      brokers: ["kafka:29092"],
    });
  }

  public static getInstance(): KafkaService {
    if (!KafkaService.instance) {
      KafkaService.instance = new KafkaService();
    }
    return KafkaService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.producer) return;

    this.producer = this.kafka.producer({
      allowAutoTopicCreation: true,
      transactionTimeout: 30000,
    });

    await this.producer.connect();
    console.log("Kafka producer is ready");
  }

  private getTopicForEventType(type: EventType): KafkaTopic {
    switch (type) {
      case EventType.CLICK:
        return TOPICS.CLICK_EVENTS;
      case EventType.SCROLL:
        return TOPICS.SCROLL_EVENTS;
      case EventType.PAGE_VIEW:
        return TOPICS.PAGE_VIEW_EVENTS;
      default:
        throw new Error(`Unknown event type: ${type}`);
    }
  }

  public async produceMessage(
    key: string,
    value: any,
    eventType: EventType
  ): Promise<void> {
    if (!this.producer) {
      throw new Error("Producer not initialized");
    }

    const topic = this.getTopicForEventType(eventType);
    await this.producer.send({
      topic,
      messages: [
        {
          key,
          value: JSON.stringify(value),
        },
      ],
    });
  }

  public async disconnect(): Promise<void> {
    if (!this.producer) return;
    await this.producer.disconnect();
    this.producer = null;
  }

  public async initializeConsumer(): Promise<void> {
    if (this.consumer) return;

    this.consumer = this.kafka.consumer({
      groupId: "analytics-test-group",
      allowAutoTopicCreation: true,
    });

    await this.consumer.connect();
    console.log("Kafka consumer is ready");
  }

  public async subscribeToTopics(topics: KafkaTopic[]): Promise<void> {
    if (!this.consumer) {
      throw new Error("Consumer not initialized");
    }

    await this.consumer.subscribe({
      topics,
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        const { topic, message } = payload;
        console.log("Message received:", {
          topic,
          key: message.key?.toString(),
          value: message.value?.toString(),
        });
      },
    });
  }

  public async disconnectConsumer(): Promise<void> {
    if (!this.consumer) return;
    await this.consumer.disconnect();
    this.consumer = null;
  }
}

export default KafkaService;
