import { EventType } from "../kafka/kafka.type";

interface AnalyticsData {
  timestamp: number;
  userId: string;
  data: any;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private analyticsData: Map<EventType, AnalyticsData[]>;

  private constructor() {
    this.analyticsData = new Map();
    Object.values(EventType).forEach((type) => {
      this.analyticsData.set(type, []);
    });
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  public storeEvent(type: EventType, userId: string, data: any): void {
    const eventData: AnalyticsData = {
      timestamp: Date.now(),
      userId,
      data,
    };

    const events = this.analyticsData.get(type) || [];
    events.push(eventData);
    this.analyticsData.set(type, events);
  }

  public getEventsByType(type: EventType): AnalyticsData[] {
    return this.analyticsData.get(type) || [];
  }

  public getEventsByUser(userId: string): AnalyticsData[] {
    const allEvents: AnalyticsData[] = [];
    this.analyticsData.forEach((events) => {
      const userEvents = events.filter((event) => event.userId === userId);
      allEvents.push(...userEvents);
    });
    return allEvents;
  }

  public getEventCountByType(type: EventType): number {
    return this.analyticsData.get(type)?.length || 0;
  }

  public clearEvents(): void {
    this.analyticsData.forEach((_, type) => {
      this.analyticsData.set(type, []);
    });
  }
}

export default AnalyticsService;
