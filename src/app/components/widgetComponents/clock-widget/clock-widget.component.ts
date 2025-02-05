import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { RedmineService } from 'src/app/services/redmine.service';

@Component({
  selector: 'app-clock-widget',
  templateUrl: './clock-widget.component.html',
  styleUrls: ['./clock-widget.component.scss']
})
export class ClockWidgetComponent implements OnDestroy {
  // The timer (in seconds)
  elapsedTime = 0;
  // Subscription for our interval timer
  timerSubscription!: Subscription;
  // Whether the timer is currently running
  isRunning = false;
  // The start time for the current running timer
  startTime!: Date;
  // A log of time entries
  timeEntries: { start: Date, end: Date, duration: number }[] = [];

  constructor(private readonly redmine: RedmineService){}


  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer(): void {
    if (this.isRunning) { return; }
    this.isRunning = true;
    this.startTime = new Date();
    // Every second update the elapsed time
    this.timerSubscription = interval(1000).subscribe(() => {
      this.elapsedTime++;
    });
  }

  stopTimer(): void {
    if (!this.isRunning) { return; }
    this.isRunning = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    const endTime = new Date();
    const duration = this.elapsedTime; // seconds tracked
    // Add an entry to our log
    this.timeEntries.push({ start: this.startTime, end: endTime, duration });
  }

  resetTimer(): void {
    // Only allow reset when the timer is not running.
    if (this.isRunning) { return; }
    this.elapsedTime = 0;
  }

  /**
   * Format seconds as HH:MM:SS.
   */
  formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
