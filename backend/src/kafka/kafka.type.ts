export enum EventType {
  CLICK = "CLICK",
  PAGE_VIEW = "PAGE_VIEW",
  SCROLL = "SCROLL",
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
  /** ID de l'élément cliqué */
  elementId?: string;
  /** Classe CSS de l'élément cliqué */
  elementClass?: string;
  /** Texte contenu dans l'élément cliqué */
  elementText?: string;
  /** Coordonnées du clic dans la page */
  coordinates?: {
    /** Position horizontale du clic */
    x: number;
    /** Position verticale du clic */
    y: number;
  };
}

export interface ScrollEventData {
  /** Profondeur de défilement en pourcentage (0-100) */
  scrollDepth: number;
  /** Direction du défilement */
  scrollDirection: "up" | "down";
  /** Vitesse de défilement en pixels par seconde */
  scrollSpeed: number;
}

export interface PageViewEventData {
  /** Chemin de la page précédente */
  previousPath?: string;
  /** Temps passé sur la page en secondes */
  timeSpent?: number;
  /** URL de la page d'origine (si l'utilisateur vient d'un autre site) */
  referrer?: string;
}
