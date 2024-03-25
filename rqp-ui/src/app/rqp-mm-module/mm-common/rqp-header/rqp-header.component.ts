import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SdService } from 'src/app/rqp-sd-module/sd.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ToolbarService } from 'src/app/service/toolbar.service';

@Component({
  selector: 'app-rqp-header',
  templateUrl: './rqp-header.component.html',
  styleUrls: ['./rqp-header.component.scss']
})
export class RqpHeaderComponent implements OnInit {
  @Output() headerData = new EventEmitter<any>();
  // @Output() requestNo = new EventEmitter<any>();
   @Input() pageData:any;
   HeaderForm:FormGroup;
   isReadonly=true;
   constructor(public fb:FormBuilder,
               private sdService:SdService,
               private toolbarService:ToolbarService,
               private lifeCycleDataService:LifeCycleDataService,
               ){
       this.HeaderForm=this.fb.group({
         unitcode:[''],
         lcnum:[''],
         modulecode:[''],
         stage:[''],
         departmentcode:[''],
         role:[''],
         createdby:[''],
         requestNo:[''],
         version:['']
 
       })
   }
   headerRequestBody:any
   headerDetail:any;
   ngOnInit(): void {
     console.log('working');
     console.log(this.pageData)
     console.log(this.pageData.pageName)
     this.headerRequestBody=this.lifeCycleDataService.getSelectedRowData();
     if(this.pageData.pageName=='qt-review' || 'qtUpdateDetail' ){
       this.HeaderForm.controls['requestNo'].setValue(this.pageData.requestNo);
     this.HeaderForm.controls['version'].setValue(this.pageData.version);
   
     }
   
   let body:any;
    body={
     createdBy:this.headerRequestBody.userId,
     lcNumber:this.headerRequestBody.lifeCycleCode,
     //lcStage:this.headerRequestBody.stage
     lcStage:this.toolbarService.currentStage
   }
   if(body.lcStage==undefined || body.lcStage==''){
     body.lcStage=this.lifeCycleDataService.allQtHomePageStageValue;
   }
   this.sdService.getHeaderData(body).subscribe((data:any)=>{
     this.headerDetail=data.data[0];
     this.isReadonly=true;
     this.HeaderForm.controls['unitcode'].setValue(this.headerDetail.unitcode);
     this.HeaderForm.controls['lcnum'].setValue(this.headerDetail.lcnum);
     this.HeaderForm.controls['modulecode'].setValue(this.headerDetail.modulecode);
     this.HeaderForm.controls['departmentcode'].setValue(this.headerDetail.departmentcode);
     this.HeaderForm.controls['role'].setValue(this.headerDetail.role);
     this.HeaderForm.controls['stage'].setValue(this.headerDetail.stage);
     this.HeaderForm.controls['createdby'].setValue(this.headerDetail.createdby);
     if(this.pageData.pageName=='qt-review' || 'qtUpdateDetail' ){
     this.headerDetail.requestNo=this.pageData.requestNo;
     this.headerDetail.version=this.pageData.version
     }
     this.headerData.emit(this.headerDetail)
     
 
   })
 }
}
