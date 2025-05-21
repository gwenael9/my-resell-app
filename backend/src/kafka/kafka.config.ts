// export const kafkaConfig = {
//   "bootstrap.servers": process.env.KAFKA_BOOTSTRAP_SERVERS || "localhost:9092",
//   "client.id": "analytics-producer",
//   acks: "all",
//   retries: 3,
// };

export const TOPICS = {
  CLICK_EVENTS: "analytics-clicks",
  SCROLL_EVENTS: "analytics-scrolls",
  PAGE_VIEW_EVENTS: "analytics-page-views",
} as const;

export type KafkaTopic = (typeof TOPICS)[keyof typeof TOPICS];
