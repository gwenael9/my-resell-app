import {
  Router,
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import KafkaService from "../services/kafka.service";
import { TOPICS } from "../kafka/kafka.config";
import {
  AnalyticsRequestBody,
  ClickEventData,
  EventType,
  PageViewEventData,
  ScrollEventData,
} from "../kafka/kafka.type";

const router = Router();

const analyticsHandler: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { events } = req.body as AnalyticsRequestBody;

    console.log("eveeeeeent", events);

    if (!Array.isArray(events)) {
      res.status(400).json({ error: "Events must be an array" });
      return;
    }

    const kafkaService = KafkaService.getInstance();

    // Envoyer chaque événement à Kafka
    for (const event of events) {
      try {
        const baseMessage = {
          timestamp: event.timestamp,
          path: event.path,
          userId: req.user?.id || "unknown",
        };

        let message;
        switch (event.type) {
          case EventType.CLICK:
            message = {
              ...baseMessage,
              ...(event.data as ClickEventData),
            };
            break;
          case EventType.SCROLL:
            message = {
              ...baseMessage,
              ...(event.data as ScrollEventData),
            };
            break;
          case EventType.PAGE_VIEW:
            message = {
              ...baseMessage,
              ...(event.data as PageViewEventData),
            };
            break;
          default:
            console.warn(`Unknown event type: ${event.type}`);
            continue;
        }

        console.log("messaaaaaageeeeeee", message);

        console.log(`Sending message to Kafka for event type: ${event.type}`);
        await kafkaService.produceMessage(
          `${event.type}-${Date.now()}`,
          message,
          event.type
        );
        console.log(`Successfully sent message for event type: ${event.type}`);
      } catch (eventError) {
        console.error(
          `Failed to process event of type ${event.type}:`,
          eventError
        );
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Analytics handler error:", error);
    next(error);
  }
};

router.post("/analytics", analyticsHandler);

export default router;
