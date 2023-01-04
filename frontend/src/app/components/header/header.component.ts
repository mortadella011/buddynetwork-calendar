import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from 'src/app/services/calendar.service';
import { ConfirmCopyComponent } from '../confirm-copy/confirm-copy.component';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private calendarService: CalendarService,
    private modalService: NgbModal
  ){

  }

  getDownloadLink():string{
    return this.calendarService.getDownloadLink();
  }

  copyLinkToClipboard(){
    navigator.clipboard.writeText(this.calendarService.getDownloadLink());
    const modalRef = this.modalService.open(ConfirmCopyComponent, { size: "sm" });
  }

  openFAQ(){
    const modalRef = this.modalService.open(FaqComponent, { size: "lg" });
  }
}
