import { Injectable } from '@angular/core';
import { IWeeklyPlannerEvent } from '../store/interfaces/weeklyPlanner.interface';

@Injectable({
  providedIn: 'root',
})
export class WeeklyPlannerService {
  events: IWeeklyPlannerEvent[] = [];
  slotInterval = 30;
  startHour = 0;
  endHour = 24;

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

  getEventStyles(event: IWeeklyPlannerEvent): object {
    const startIndex = this.getTimeSlotIndex(event.startTime);
    const endIndex = this.getTimeSlotIndex(event.endTime);

    // Use calculated height without -1 adjustment
    const top = startIndex * 20;
    const height = (endIndex - startIndex) * 20;

    return {
      'top.px': top,
      'height.px': height,
      'background-color': event.color,
      'font-size.px': 13,
      color: this.getContrastColor(event.color),
      'z-index': 2, // Explicit z-index
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
