import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QmsMasterService {

  private API_URL=environment.apiBaseURL
  constructor(private http:HttpClient ) { }
  getAllRCTTableData(size:any,index:any){
    let queryParams=`?pageIndex=${index}&size=${size}`
    const ALLSALEPRODUCTURL=this.API_URL+"qms/rct-master/get-all"+queryParams
   return this.http.post(ALLSALEPRODUCTURL,'')
  }

  getActiveRCTTableData(size:any,index:any){
    let queryParams=`?pageIndex=${index}&size=${size}`
    const ALLSALEPRODUCTURL=this.API_URL+"qms/rct-master/get-max-all"+queryParams
   return this.http.post(ALLSALEPRODUCTURL,'')
  }
  
  getUserProfileFilterData(body){
    let fetchProfileListUrlAll=this.API_URL+"qms/qms-master/search";
    return this.http.post(fetchProfileListUrlAll,body,)
  }}


