import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weekly-planner',
  templateUrl: './weekly-planner.component.html',
  styleUrls: ['./weekly-planner.component.scss']
})
export class WeeklyPlannerComponent implements OnInit {
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  timeSlots: string[] = [];

  slotInterval = 30;
  startHour = 0;
  endHour = 24;

  // Track the hovered indices for day and time
  hoveredDayIndex: number | null = null;
  hoveredTimeIndex: number | null = null;

  ngOnInit(): void {
    this.generateTimeSlots();
  }

  generateTimeSlots(): void {
    const slots = [];
    for (let h = this.startHour; h < this.endHour; h++) {
      for (let m = 0; m < 60; m += this.slotInterval) {
        const hourStr = h.toString().padStart(2, '0');
        const minuteStr = m.toString().padStart(2, '0');
        slots.push(`${hourStr}:${minuteStr}`);
      }
    }
    this.timeSlots = slots;
  }

  // When hovering over a cell, record its day and time indices
  setHover(dayIndex: number, timeIndex: number): void {
    this.hoveredDayIndex = dayIndex;
    this.hoveredTimeIndex = timeIndex;
  }

  // Clear the hover state when the mouse leaves the cell
  clearHover(): void {
    this.hoveredDayIndex = null;
    this.hoveredTimeIndex = null;
  }
}
