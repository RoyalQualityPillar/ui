import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MessageService } from 'src/app/service/message.service';
import * as moment from 'moment';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { QmsService } from '../../qms.service';
export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-nci-initiator',
  templateUrl: './nci-initiator.component.html',
  styleUrls: ['./nci-initiator.component.scss']
})
export class NciInitiatorComponent {
  EventForm: FormGroup;
  constructor(public router: ActivatedRoute, private qmsService: QmsService, public fb: FormBuilder, public dialog: MatDialog,
    private lifeCycleDataService: LifeCycleDataService, private messageService: MessageService,
    private toolbarService: ToolbarService) {
      
      this.EventForm = this.fb.group({
        severityEvent:[''],
        severityEvent1:[''],
        severityEvent2:[''],
        severityEvent3:[''],
        severityEvent4:['']
      })
    }
  isLoading=false;
  pageData:any;
  eventClassification:any=[{
    value1:'',
    value2:'',
    value3:'',
    lineList:[{}]
  }
    
  ];
  ngOnInit(): void { 
    this.pageData = {
      pageName: 'qms',
    }
  }
  headerData: any;
  getHeaderData(pageData: any) {
    console.log(pageData);
    this.headerData = pageData;
  }
  addLineItem(item: any): void {
    item.lineList.push({
      value4: '',
      value5: ''
    });
    console.log(this.eventClassification)
  }
  addNewRow(){
    this.eventClassification.push({
      value1: '',
      value2: '',
      value3: '',
      lineList: [{}]
    });
  }
  deleteTodo(idx:any){

  }
  openSeverityEventLov(){

  }
  isEven(index: number): boolean {
    return index % 2 === 0;
  }
  addRemoveRow(){
    
  }
}
