import { AfterViewInit, Component, HostListener, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CalendarApi, CalendarOptions, EventClickInfo, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import { map } from 'rxjs';
import dayGridPlugin from '@fullcalendar/angular/daygrid';
import timeGridPlugin from '@fullcalendar/angular/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import listPlugin from '@fullcalendar/angular/list';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDetailComponent } from '../event-detail/event-detail.component';
import { CalendarService } from 'src/app/services/calendar.service';
import { GoogleEvent } from 'src/app/interfaces/google-event';



@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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

  eventClickHandler(info: EventClickInfo) {

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
      buttons: {
        today: { text: 'Today' },
        dayGridMonth: { text: 'Month' },
        listMonth: { text: 'List' },
      },
      toolbarClass: 'text-nowrap',
      toolbarTitleClass: 'fs-4 fw-normal',
      dayHeaderClass: 'fw-bold',
      eventClick: (info) => this.eventClickHandler(info),
      height: "auto",
      tableHeaderSticky: false,
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




  @HostListener('window:resize')
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
        color: color,
      });


    });
  }


}
