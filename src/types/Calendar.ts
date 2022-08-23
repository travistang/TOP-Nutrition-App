export enum DayMarkerType {
    Highlight,
    Dot,
}

export type DayMarker = {
    type: DayMarkerType;
    color: string;
};