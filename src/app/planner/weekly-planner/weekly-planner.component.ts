import { Component, OnInit } from '@angular/core';
import { WeeklyPlannerService } from 'src/app/services/weekly-planner.service';
import { IWeeklyPlannerEvent } from 'src/app/store/interfaces/weeklyPlanner.interface';

@Component({
  selector: 'app-weekly-planner',
  templateUrl: './weekly-planner.component.html',
  styleUrls: ['./weekly-planner.component.scss'],
})
export class WeeklyPlannerComponent implements OnInit {
  days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  timeSlots: string[] = [];

  //MOCKS
  events: IWeeklyPlannerEvent[] = [
    {
      id: 1,
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      color: '#2196F3',
      text: 'Team Meeting',
    },
    {
      id: 2,
      day: 'Wednesday',
      startTime: '14:00',
      endTime: '16:00',
      color: '#4CAF50',
      text: 'Project Workshop',
    },
    {
      id: 3,
      day: 'Friday',
      startTime: '11:30',
      endTime: '12:30',
      color: '#E91E63',
      text: 'Lunch Break',
    },
  ];

  // Track the hovered indices for day and time
  hoveredDayIndex: number | null = null;
  hoveredTimeIndex: number | null = null;

  constructor(public plannerService: WeeklyPlannerService) {}

  ngOnInit(): void {
    this.plannerService.init({ events: this.events });
    this.generateTimeSlots();
  }

  generateTimeSlots(): void {
    const slots = [];
    // Changed to h <= endHour to include final hour
    for (
      let h = this.plannerService.startHour;
      h <= this.plannerService.endHour;
      h++
    ) {
      // Handle last hour differently to avoid 24:30 etc.
      const maxMinutes = h === this.plannerService.endHour ? 0 : 60;
      for (let m = 0; m < maxMinutes; m += this.plannerService.slotInterval) {
        const hourStr = (h === 24 ? 0 : h).toString().padStart(2, '0');
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
