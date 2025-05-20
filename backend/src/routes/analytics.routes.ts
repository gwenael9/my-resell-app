import { Router, RequestHandler } from "express";
import { EventType } from "../services/analytics/types";

const router = Router();

interface AnalyticsRequestBody {
  events: Array<{
    type: EventType;
    path: string;
    timestamp: number;
    data?: Record<string, any>;
  }>;
}

const analyticsHandler: RequestHandler = async (req, res, next) => {
  try {
    const { events } = req.body as AnalyticsRequestBody;

    if (!Array.isArray(events)) {
      res.status(400).json({ error: "Events must be an array" });
      return;
    }
    console.log("eveeent", events);
  } catch (error) {
    next(error);
  }
};

router.post("/analytics", analyticsHandler);

export default router;
