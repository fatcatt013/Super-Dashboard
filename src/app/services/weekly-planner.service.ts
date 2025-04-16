import { Injectable } from '@angular/core';
import { IWeeklyPlannerEvent } from '../store/interfaces/weeklyPlanner.interface';

@Injectable({
  providedIn: 'root',
})
export class WeeklyPlannerService {
  events: Array<IWeeklyPlannerEvent> = [];
  slotInterval = 30;
  startHour = 0;
  endHour = 24;

  constructor() {}

  init(data: { events: IWeeklyPlannerEvent[] }) {
    this.events = data.events;
  }

  getEventsForDay(day: string): IWeeklyPlannerEvent[] {
    return this.events.filter((event) => event.day === day);
  }

  getTimeSlotIndex(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);

    return (
      (hours - this.startHour) * (60 / this.slotInterval) +
      minutes / this.slotInterval
    );
  }

  getEventStyles(event: IWeeklyPlannerEvent): any {
    const startIndex = this.getTimeSlotIndex(event.startTime);
    const endIndex = this.getTimeSlotIndex(event.endTime);
    const top = startIndex * 20; // 20px per time slot
    const height = (endIndex - startIndex) * 20;

    return {
      'top.px': top,
      'height.px': height,
      'background-color': event.color,
      color: this.getContrastColor(event.color),
    };
  }

  private getContrastColor(hexColor: string): string {
    // Simple contrast color calculation
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }
}
