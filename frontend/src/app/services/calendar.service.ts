import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleEvent } from '../interfaces/google-event';
import { environment } from 'src/environment';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private http: HttpClient
    ) { }

    getAllEvents(){
      const url = environment.apiBaseUrl + '/calendar/events';
      return this.http.get<GoogleEvent[]>(url);
    }

    getDownloadLink(): string{
      return environment.apiBaseUrl + '/calendar/ics';
    }
}
