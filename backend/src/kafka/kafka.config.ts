export const TOPICS = {
  CLICK_EVENTS: "analytics-clicks",
  SCROLL_EVENTS: "analytics-scrolls",
  PAGE_VIEW_EVENTS: "analytics-page-views",
} as const;

export type KafkaTopic = (typeof TOPICS)[keyof typeof TOPICS];
