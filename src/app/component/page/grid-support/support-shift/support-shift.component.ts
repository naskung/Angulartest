import { EventService } from './../../../service/event.service';
import { ChangeDetectorRef, Component, ViewChild,ElementRef } from '@angular/core';
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
  responsibles: string[] = ['ผู้รับผิดชอบ 1', 'ผู้รับผิดชอบ 2', 'ผู้รับผิดชอบ 3'];
  selectedResponsible: string = '';
  isTabOneFilled = false; 
  selectedEvent: any = null; 
  newEventLocationTabTwo: string = '';
  newEventStartDateTabTwo: Date | null = null;
  newEventEndDateTabTwo: Date | null = null;
  minStartDate: string = '';
  maxEndDate: string = '';
  
  
  constructor(private eventService: EventService) {}


  @ViewChild(FullCalendarComponent) fullCalendar!: FullCalendarComponent;
  @ViewChild('eventModal') eventModal!: ElementRef;

  ngOnInit() {
    this.eventService.isTabOneFilled.subscribe(status => {
      this.isTabOneFilled = status;
    });
  }

  calendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin], 
    locale: 'th',
    events: (arg: any, successCallback: any, failureCallback: any) => {
        successCallback(this.events);
    }
  };

  tabOneSubmitted() {
    this.eventService.setTabOneFilled(true);
    if (this.newEventLocation && this.newEventStartDate && this.newEventEndDate) {
      this.isTabOneFilled = true;
      const newEvent = {
          title: 'Event at ' + this.newEventLocation, 
          start: this.newEventStartDate,
          end: this.newEventEndDate,
          location: this.newEventLocation,
          responsible: ''
      };
      this.events.push(newEvent);
      this.fullCalendar.getApi().refetchEvents();
    }
  }
  onLocationChange() {
    const selectedEvent = this.events.find(e => e.location === this.newEventLocationTabTwo);
    if (selectedEvent) {
      this.minStartDate = selectedEvent.start.toISOString().substring(0, 16);
      this.maxEndDate = selectedEvent.end.toISOString().substring(0, 16);
      this.newEventStartDateTabTwo = new Date(selectedEvent.start);
      this.newEventEndDateTabTwo = new Date(selectedEvent.end);
    }
  }
  tabTwoSubmitted() {
    if (this.isTabOneFilled && this.selectedResponsible && this.newEventLocationTabTwo
        && this.newEventStartDateTabTwo && this.newEventEndDateTabTwo) {
        
      const selectedEvent = this.events.find(e => e.location === this.newEventLocationTabTwo);
      if (selectedEvent) {
        if (
          this.newEventStartDateTabTwo >= selectedEvent.start &&
          this.newEventEndDateTabTwo <= selectedEvent.end
        ) {
          const updatedEvent = {
            title: `Responsible: ${this.selectedResponsible}, Start: ${this.newEventStartDateTabTwo}, End: ${this.newEventEndDateTabTwo}`,
            start: this.newEventStartDateTabTwo,
            end: this.newEventEndDateTabTwo,
            location: this.newEventLocationTabTwo,
            responsible: this.selectedResponsible,
            additionalStartDate: this.newEventStartDateTabTwo,
            additionalEndDate: this.newEventEndDateTabTwo,
          };
          this.events.push(updatedEvent);
          this.fullCalendar.getApi().refetchEvents();
        } else {
          alert("เวลาที่เลือกต้องอยู่ในช่วงเวลาที่กำหนด");
          return;
        }
      }
    }
  }
  handleDateClick(event: any) {
    this.selectedDate = event.dateStr;
    this.newEventStartDate = new Date(this.selectedDate);
    
    this.checkEventOnSelectedDate();
    this.openModal();
  }
  
  checkEventOnSelectedDate() {
    console.log('Checking event on selected date:', this.selectedDate);

    const selectedDateString = new Date(this.selectedDate).toDateString();

    const existingEvent = this.events.find(e => 
        new Date(e.start).toDateString() === selectedDateString && !!e.location
    );

    if (existingEvent) {
        console.log('Existing event found:', existingEvent);

        this.isTabOneFilled = true;
        this.newEventLocationTabTwo = existingEvent.location;
        this.newEventStartDateTabTwo = new Date(existingEvent.start);
        this.newEventEndDateTabTwo = new Date(existingEvent.end);
    } else {
        console.log('No existing event found for the selected date.');

        this.isTabOneFilled = false;
    }
  }

  addEvent() {
    if (this.isTabOneFilled) {
        this.tabTwoSubmitted();
    } else {
        this.tabOneSubmitted();
        if (this.newEventLocation && this.newEventStartDate && this.newEventEndDate) {
            this.isTabOneFilled = true;
            this.eventService.setTabOneFilled(true);
        }
    }
    this.hideModal();
  }
  
  // handleDateClick(event: any) {
  //   this.selectedDate = event.dateStr;
  //   this.newEventStartDate = new Date(this.selectedDate); 
  //   this.openModal();
  // }

  // addEvent() {
  //   if (this.newEventTitle && this.newEventStartDate && this.newEventEndDate && this.selectedResponsible) {
  //       const newEvent = {
  //           title: this.newEventTitle,
  //           start: this.newEventStartDate,
  //           end: this.newEventEndDate,
  //           location: this.newEventLocation,
  //           responsible: this.selectedResponsible 
  //       };
  //       this.events.push(newEvent);
  //       this.newEventTitle = '';
  //       this.newEventStartDate = null;
  //       this.newEventEndDate = null;
  //       this.newEventLocation = '';
  //       this.selectedResponsible = '';  
  //       this.fullCalendar.getApi().refetchEvents();
  //       this.hideModal();
  //   }
  // }

  openModal() {
    let modalElement = document.getElementById('eventModal') as Element;
    let modal = new bootstrap.Modal(modalElement);
    this.eventService.isTabOneFilled.subscribe(status => {
        this.isTabOneFilled = status;
        if (status) {
        }
    });

    modal.show();
}
  hideModal() {
    console.log('Hiding modal');
    let modal = new bootstrap.Modal(this.eventModal.nativeElement);
    modal.hide();
  }
}
