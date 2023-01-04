import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { ConfirmCopyComponent } from './components/confirm-copy/confirm-copy.component';
import { FaqComponent } from './components/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventDetailComponent,
    HeaderComponent,
    SanitizeHtmlPipe,
    ConfirmCopyComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
