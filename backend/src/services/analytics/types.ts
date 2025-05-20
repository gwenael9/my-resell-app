export enum EventType {
  CLICK = "CLICK",
  PAGE_VIEW = "PAGE_VIEW",
  SCROLL = "SCROLL",
  SEARCH = "SEARCH",
}

export interface AnalyticsEvent {
  type: EventType;
  path: string;
  timestamp: number;
  data?: Record<string, any>;
}

export interface AnalyticsQueueItem {
  event: AnalyticsEvent;
  processed: boolean;
  processedAt?: Date;
}
