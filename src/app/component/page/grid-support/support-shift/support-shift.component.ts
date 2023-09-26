import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import * as bootstrap from 'bootstrap';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { registerLocaleData } from '@angular/common';
import localeTh from '@angular/common/locales/th';

registerLocaleData(localeTh);

@Component({
  selector: 'app-support-shift',
  templateUrl: './support-shift.component.html',
  styleUrls: ['./support-shift.component.css']
})
export class SupportShiftComponent {
  calendarPlugins = [dayGridPlugin];
  newEventTitle = '';
  selectedDate: any;
  isPopupVisible = false;
  events: any[] = [];
  eventLocations: string[] = ['สถานที่ 1', 'สถานที่ 2', 'สถานที่ 3']; 
  newEventLocation: string = '';
  newEventStartDate: Date | null = null; 
  newEventEndDate: Date | null = null; 

  @ViewChild(FullCalendarComponent) fullCalendar!: FullCalendarComponent;

  calendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin], 
    locale: 'th',
    events: (arg: any, successCallback: any, failureCallback: any) => {
        successCallback(this.events);
    }
};

  handleDateClick(event: any) {
    this.selectedDate = event.dateStr;
    this.newEventStartDate = new Date(this.selectedDate); 
    this.openModal();
  }

  addEvent() {
    if (this.newEventTitle && this.newEventStartDate && this.newEventEndDate) {
        const newEvent = {
            title: this.newEventTitle,
            start: this.newEventStartDate, 
            end: this.newEventEndDate,
            location: this.newEventLocation 
        };
        this.events.push(newEvent);

        this.newEventTitle = '';
        this.newEventStartDate = null;
        this.newEventEndDate = null;
        this.newEventLocation = '';
        this.fullCalendar.getApi().refetchEvents();
        this.hideModal();
    }
  }

  openModal() {
    let modalElement = document.getElementById('eventModal') as Element;
    let modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  hideModal() {
    let modalElement = document.getElementById('eventModal') as HTMLElement;
    let modal = new bootstrap.Modal(modalElement);
    modal.hide();
  }
}
