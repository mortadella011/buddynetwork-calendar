import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CalendarApi, CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import { map } from 'rxjs';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import listPlugin from '@fullcalendar/list';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { GoogleEvent } from 'src/app/interfaces/google-event';
import { FullCalendarComponent } from '@fullcalendar/angular';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  pageBreak: number = 576;

  calendarOptions: CalendarOptions = {};
  events: EventInput[] = [];
  calendarApi: CalendarApi | undefined = undefined;
  width: number;

  constructor(
    private calendarService: CalendarService,
    private modalService: NgbModal,
  ) {
    this.width = window.innerWidth;
  }

  eventClickHandler(info: EventClickArg) {

    info.jsEvent.preventDefault(); // do not upen urls
    let event = this.events.filter(el => el.id == info.event.id)[0]


    const modalRef = this.modalService.open(EventDetailComponent, { size: "lg" });
    modalRef.componentInstance.event = event;
  }

  ngOnInit(): void {
    this.width = window.innerWidth;

    this.calendarOptions = {
      // initialView: this.width < this.pageBreak ? 'listMonth' : 'dayGridMonth',
      initialView: 'dayGridMonth',
      firstDay: 1,
      // locale: 'en',
      themeSystem: 'bootstrap5',
      plugins: [dayGridPlugin, listPlugin, timeGridPlugin, bootstrap5Plugin],
      headerToolbar: this.width < this.pageBreak ? {
        left: 'title',
        center: '',
        right: 'prev,next dayGridMonth,listMonth',
      } :
        {
          left: 'title',
          center: '',
          right: 'prev,next today dayGridMonth,listMonth',
        },
      buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        list: 'List'
      },
      eventClick: (info) => this.eventClickHandler(info),
      height: "auto",
      stickyHeaderDates: false,
      views: {
        dayGridMonth: {
          eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          },
          displayEventTime: false
        },

        listMonth: {
          eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            separator: '  -  ',
          },
        }

      }
    };

    this.events = [];
    this.getData().subscribe();


  }

  ngAfterViewInit(): void {
    if (this.calendarComponent == undefined)
      return;

    this.calendarApi = this.calendarComponent.getApi();
  }




  @HostListener('window:resize', ['$event'])
  onWindowResize() {

    if (this.calendarApi == undefined)
      return;

    this.width = window.innerWidth;

    if (this.width <= this.pageBreak) {
      // this.calendarApi.changeView('listMonth')
      this.calendarOptions.headerToolbar = {
        left: 'title',
        center: '',
        right: 'prev,next dayGridMonth,listMonth',
      };
      this.calendarApi.updateSize()
    }
    else {
      // this.calendarApi.changeView('dayGridMonth');
      this.calendarOptions.headerToolbar = {
        left: 'title',
        center: '',
        right: 'prev,next today dayGridMonth,listMonth',
      };

    }
  }

  getData() {
    return this.calendarService.getAllEvents()
      .pipe(map(googleEvents => this.insertGoogleEvents(googleEvents, "Buddynetwork", "var(--bs-green)")));

  }

  insertGoogleEvents(googleEvents: GoogleEvent[], name: string, color: string) {
    googleEvents.forEach(event => {
      this.events.push({
        id: event.id,
        title: event.summary,
        start: new Date(event.start.dateTime || event.start.date),
        end: new Date(event.end.dateTime || event.end.date),
        allDay: event.start.date ? true : false,
        // url: undefined,
        location: event.location,
        description: event.description,
        attachments: event.attachments || [],
        extendedProps: (event.extendedProperties || {}).shared || {},
        // extendedProps: {
        //   shared: {
        //     "calendar_name": name,
        //     "creator": event.creator.email
        //   }
        // },
        backgroundColor: color,
        color: '#ffffff',
        borderColor: color,
      });


    });
  }


}
