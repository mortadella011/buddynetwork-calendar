import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCopyComponent } from './confirm-copy.component';

describe('ConfirmCopyComponent', () => {
  let component: ConfirmCopyComponent;
  let fixture: ComponentFixture<ConfirmCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCopyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
