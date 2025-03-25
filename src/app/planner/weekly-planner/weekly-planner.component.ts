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
}
