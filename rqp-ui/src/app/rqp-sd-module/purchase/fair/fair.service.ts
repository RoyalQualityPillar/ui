import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FairService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getReviewerData(f0001: any, f0009: any,createdby :any, pageIndex: any, size: any) {
    const queryParams = `?FF0001=${f0001}&FF0009=${f0009}&createdby=${createdby }&pageIndex=${pageIndex}&size=${size}`;
    const reviwerURL = this.API_URL + 'gm/gmur-record/todo-all' + queryParams;
    return this.http.get(reviwerURL);
  }
}
