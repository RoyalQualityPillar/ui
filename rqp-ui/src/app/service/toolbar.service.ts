import { Injectable } from '@angular/core';
import {tableData} from '../../assets/data';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  data:any;
  tableData:any;
  public isLogin='loginFaild'
  constructor() { 
    this.data=tableData.tableData;
  }

   getData(){
  return this.tableData;
   }
   setTableData(data:any){
     this.tableData=data
   }
  
}
