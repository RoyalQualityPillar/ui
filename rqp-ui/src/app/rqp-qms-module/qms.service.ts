import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QmsService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getHeaderData(body: any) {
    let getHederURL = this.API_URL + 'admin/input/lcinfo';
    return this.http.post(getHederURL, body);
  }
}
