export enum EventType {
  CLICK = "CLICK",
  PAGE_VIEW = "PAGE_VIEW",
  SCROLL = "SCROLL",
  SEARCH = "SEARCH",
}

export interface AnalyticsRequestBody {
  events: Array<{
    type: EventType;
    path: string;
    timestamp: number;
    data?: Record<string, any>;
  }>;
}

export interface ClickEventData {
  elementId?: string;
  elementClass?: string;
  elementText?: string;
  coordinates?: {
    x: number;
    y: number;
  };
}

export interface ScrollEventData {
  scrollDepth: number;
  scrollDirection: "up" | "down";
  scrollSpeed: number;
}

export interface PageViewEventData {
  previousPath?: string;
  timeSpent?: number;
  referrer?: string;
}
