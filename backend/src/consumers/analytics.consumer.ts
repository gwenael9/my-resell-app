import KafkaService from "../services/kafka.service";
import AnalyticsService from "../services/analytics.service";
import { TOPICS } from "../kafka/kafka.config";
import { EventType } from "../kafka/kafka.type";

class AnalyticsConsumer {
  private static instance: AnalyticsConsumer;
  private kafkaService: KafkaService;
  private analyticsService: AnalyticsService;

  private constructor() {
    this.kafkaService = KafkaService.getInstance();
    this.analyticsService = AnalyticsService.getInstance();
  }

  public static getInstance(): AnalyticsConsumer {
    if (!AnalyticsConsumer.instance) {
      AnalyticsConsumer.instance = new AnalyticsConsumer();
    }
    return AnalyticsConsumer.instance;
  }

  public async start(): Promise<void> {
    try {
      // Initialiser le consommateur Kafka
      await this.kafkaService.initializeConsumer();

      // S'abonner à tous les topics d'analytics
      await this.kafkaService.subscribeToTopics([
        TOPICS.CLICK_EVENTS,
        TOPICS.SCROLL_EVENTS,
        TOPICS.PAGE_VIEW_EVENTS,
      ]);

      console.log("Analytics Consumer démarré avec succès");
    } catch (error) {
      console.error("Erreur lors du démarrage du consommateur:", error);
      throw error;
    }
  }

  public async stop(): Promise<void> {
    try {
      await this.kafkaService.disconnectConsumer();
      console.log("Analytics Consumer arrêté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'arrêt du consommateur:", error);
      throw error;
    }
  }

  // Méthodes pour accéder aux statistiques
  public getClickEvents(): any[] {
    return this.analyticsService.getEventsByType(EventType.CLICK);
  }

  public getScrollEvents(): any[] {
    return this.analyticsService.getEventsByType(EventType.SCROLL);
  }

  public getPageViewEvents(): any[] {
    return this.analyticsService.getEventsByType(EventType.PAGE_VIEW);
  }

  public getEventsByUser(userId: string): any[] {
    return this.analyticsService.getEventsByUser(userId);
  }

  public getEventCounts(): Record<EventType, number> {
    return {
      [EventType.CLICK]: this.analyticsService.getEventCountByType(
        EventType.CLICK
      ),
      [EventType.SCROLL]: this.analyticsService.getEventCountByType(
        EventType.SCROLL
      ),
      [EventType.PAGE_VIEW]: this.analyticsService.getEventCountByType(
        EventType.PAGE_VIEW
      ),
    };
  }
}

export default AnalyticsConsumer;
