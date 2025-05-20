import apiClient from "../api";

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

export const trackEvent = async (event: AnalyticsEvent) => {
  try {
    await apiClient.post("/analytics", { events: [event] });
  } catch (error) {
    console.error("Erreur lors du tracking de l'événement:", error);
  }
};

export const trackClick = (
  elementId: string,
  additionalData?: Record<string, any>
) => {
  const event: AnalyticsEvent = {
    type: EventType.CLICK,
    path: window.location.pathname,
    timestamp: Date.now(),
    data: {
      elementId,
      ...additionalData,
    },
  };
  console.log("eveeent", event);
  trackEvent(event);
};
