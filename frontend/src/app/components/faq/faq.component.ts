import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FaqComponent {

  constructor(public activeModal: NgbActiveModal){}

  onDismiss(){
    this.activeModal.close();
  }

}
