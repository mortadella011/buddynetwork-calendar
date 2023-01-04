import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-copy',
  templateUrl: './confirm-copy.component.html',
  styleUrls: ['./confirm-copy.component.css']
})
export class ConfirmCopyComponent {

  constructor(public activeModal: NgbActiveModal){}

  onDismiss(){
    this.activeModal.close();
  }

}
