import { Component, Input, OnInit } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { subMinutes } from 'date-fns';
// import * as moment from 'moment';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  @Input() event: EventInput | undefined;

  event_parsed: EventInput | undefined;

  constructor(public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
    this.event_parsed = { ... this.event };

    if (this.event?.allDay) {
      // v1 1.25MB bundle size
      // this.event_parsed.start = moment(this.event.start).subtract(1, 'hours').toDate()
      // this.event_parsed.end = moment(this.event.end).subtract(61, 'minutes').toDate()

      // v2 906.69kB bundle size
      // if (this.event.start != undefined && this.event.end != undefined) {
      //   this.event_parsed.start = subMinutes(new Date(this.event.start.toString()), 60)
      //   this.event_parsed.end = subMinutes(new Date(this.event.end.toString()), 61)
      // }

      // v3 905.66kB bundle size
      if (this.event.start != undefined && this.event.end != undefined) {
        this.event_parsed.start = new Date(this.event.start.toString())
        this.event_parsed.end = new Date(this.event.end.toString())
        this.event_parsed.start = this.event_parsed.start.setMinutes(this.event_parsed.start.getMinutes() - 60)
        this.event_parsed.end = this.event_parsed.end.setMinutes(this.event_parsed.end.getMinutes() - 61)
      }
    }

  }

  onDismiss() {
    this.activeModal.close();
  }
}
