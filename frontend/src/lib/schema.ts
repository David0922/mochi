export interface Event {
  day?: number;
  days?: [number];
  start: string;
  end: string;
  startDate?: Date;
  endDate?: Date;
  title?: string;
  details?: string;
  offset?: number;
  maxOffset?: number;
}
