import { RdKafka } from "@confluentinc/kafka-javascript";
import { kafkaConfig, ANALYTICS_TOPIC } from "../../config/kafka.config";

interface DeliveryReport {
  topic: string;
  key: Buffer;
  value: Buffer;
}

class KafkaService {
  private static instance: KafkaService;
  private producer: RdKafka.Producer | null = null;

  private constructor() {}

  public static getInstance(): KafkaService {
    if (!KafkaService.instance) {
      KafkaService.instance = new KafkaService();
    }
    return KafkaService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.producer) return;

    this.producer = new RdKafka.Producer(kafkaConfig);

    return new Promise((resolve, reject) => {
      if (!this.producer) return reject(new Error("Producer not initialized"));

      this.producer
        .on("ready", () => {
          console.log("Kafka producer is ready");
          resolve();
        })
        .on("delivery-report", (err, report) => {
          if (err) {
            console.warn("Error producing message:", err);
          } else {
            const { topic, key, value } = report;
            console.log(
              `Message delivered to topic ${topic}: key = ${key} value = ${value}`
            );
          }
        })
        .on("event.error", (err) => {
          console.error("Kafka producer error:", err);
          reject(err);
        });

      this.producer.connect();
    });
  }

  public async produceMessage(key: string, value: any): Promise<void> {
    if (!this.producer) {
      throw new Error("Producer not initialized");
    }

    const valueBuffer = Buffer.from(JSON.stringify(value));
    const keyBuffer = Buffer.from(key);

    this.producer.produce(ANALYTICS_TOPIC, -1, valueBuffer, keyBuffer);
  }

  public async disconnect(): Promise<void> {
    if (!this.producer) return;

    return new Promise((resolve) => {
      this.producer?.flush(10000, () => {
        this.producer?.disconnect();
        this.producer = null;
        resolve();
      });
    });
  }
}

export default KafkaService;
