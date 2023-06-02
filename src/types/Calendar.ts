export enum DayMarkerType {
  Highlight,
  Dot,
  HighlightAndDot,
}

export type DayMarker =
  | {
      type: DayMarkerType.Highlight | DayMarkerType.Dot;
      color: string;
    }
  | {
      type: DayMarkerType.HighlightAndDot;
      highlightColor: string;
      dotColor: string;
    };
