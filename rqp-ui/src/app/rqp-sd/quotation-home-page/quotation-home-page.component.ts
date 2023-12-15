import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SdService } from '../sd.service';
import { StockListComponent } from '../stock-list/stock-list.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { elements } from 'chart.js';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import * as moment from 'moment';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import {MessageService} from '../../service/message.service';
import { ESignatureComponent } from '../sd-common/e-signature/e-signature.component';
import { ToolbarService } from 'src/app/service/toolbar.service';

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
  selector: 'app-quotation-home-page',
  templateUrl: './quotation-home-page.component.html',
  styleUrls: ['./quotation-home-page.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class QuotationHomePageComponent implements OnInit{
  QuotationForm:FormGroup;
  HeaderForm:FormGroup;
  ViewDetailForm:FormGroup;
  isReadonly=true;
  pageData:any;
  constructor(public fb:FormBuilder,
              private sdService:SdService,
              private lifeCycleDataService:LifeCycleDataService,
              public dialog: MatDialog,
              private toolbarService:ToolbarService,
              public messageService:MessageService){
                this.HeaderForm=this.fb.group({
                  oucode:['',Validators.required],
                  lc0001:['',Validators.required],
                  lc0002:['',Validators.required],
                  lc0003:['',Validators.required],
                })
                this.ViewDetailForm=this.fb.group({
                  orgUnitCode:['',Validators.required],
                  salesUnitCode:['',Validators.required]
                })
                this.QuotationForm=this.fb.group({
                  uc0001:[''],
                  ff0001:[''],
                  ff0002:[''],
                  quotationValidDate:[''],
                  deliveryDate:[''],
                  paymentTermsCode:[''],
                  productCode:[''],
                  productName:[''],
                  quantity:[''],
                  ff0008:[''],
                  gethSNCode:[''],
                  rate:[''],
                  discountPercentage:[''],
                  discount:[''],
                  ff0013:[''],
                  ff0014:[''],
                  gst:[''],
                  comments:[''],
                  nextStage:['']
                })
              }

  companyInfoBody:any;
  orgUnitCode:any;
  salesUnitCode:any;
  isLoading=false;
  isValueSelected=false;
  nextStageListData:any;
  headerRequestBody:any;
  ngOnInit(): void {
   this.pageData={
    pageName:'homePage',
   }
   this.headerRequestBody=this.lifeCycleDataService.getSelectedRowData();
    this.companyInfoBody={
      orgUnitCode:'',
      salesUnitCode:''
    }
    // this.sdService.getHeaderData(headerRequestBody).subscribe((data)=>{
    //   console.log(data)
   // })
    // this.QuotationForm.controls['discountPercentage'].disable();
    // this.QuotationForm.controls['discount'].disable();
    // this.QuotationForm.controls['ff0013'].disable();
    this.onLoadInputFieldValue();
    this.onLoadNextStageData()
  }
  onLoadNextStageData(){
    let body:any;
    body={
      lcNumber:this.headerRequestBody.lifeCycleCode,
      //lcStage:this.headerRequestBody.stage
        lcStage:this.toolbarService.currentStage
    }
    this.sdService.getNextStageList(body).subscribe((data:any)=>{
      this.nextStageListData=data.data.nstage;
    })
  }
  headerData:any;
  getHeaderData(event:any){
    console.log(event)
    this.headerData=event;
    this.ViewDetailForm.controls['orgUnitCode'].setValue(event.unitcode)
  }
  onLoadInputFieldValue(){
    this.isLoading =true;
    this.sdService.getInputValue().subscribe((data:any)=>{
      console.log(data);
      this.orgUnitCode=data.data.buUnitList;
      this.salesUnitCode=data.data.suUnitList;
      this.isLoading =false;
    })
  }
  addNewRow(){
    const dialogRef=this.dialog.open(StockListComponent,{
      minWidth:"80%",
      data:{type:'List',data:this.ViewDetailForm.controls['orgUnitCode'].value}
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result!=true){
      if(result.data.length>0){
      this.addSelectedRows(result);
      }
    }
    }) 
  }
  stockList=[];
  addSelectedRows(selectedRow:any){
  selectedRow.data.forEach(elements =>{
    this.stockList.push(
      { 'ff0020':elements.aUC0001,
        'productCode':elements.aFF0002,
        'productName':elements.aFF0003,
        'quantity':elements.bFF0010,
        'productNumber':elements.aFF0001,
        'gethSNCode':elements.aFF0010,
        'rate':elements.aFF0008,
        //'sumOfTotalDisc':num,
      });
  })
  }
  deleteTodo(id: number) {
    this.stockList.splice(id, 1);
    this.stockList = [...this.stockList];
    console.log(id +"silindi");
    this.onCalTotalValue()
}
  discoutAmount:number;
  totalDisAmt=0;
  afterDisAmt=0;
  totalAmt=0;
  totalGst=0;
  onCalTotalValue(){
    let totalDiscountAmount=0;
    let afterDiscountAmount=0;
    let totalAmountWithGST=0;
    let totalGstAmount=0;
    console.log(this.stockList)
    this.stockList.forEach(ele =>{
      if(ele.discountedRate>0){
        totalDiscountAmount=totalDiscountAmount+ele.discountedRate
      }
      if(ele.ff0013>0){
        afterDiscountAmount=afterDiscountAmount+ele.ff0013
      }
      if(ele.finalPrice>0){
        totalAmountWithGST=totalAmountWithGST+ele.finalPrice
      }
      if(ele.gstAmount){
        totalGstAmount=totalGstAmount+ele.gstAmount
      }
    })
    this.totalGst=totalGstAmount;
    console.log(this.totalGst)
    console.log(totalDiscountAmount)
    this.QuotationForm.controls['quantity'].setValue(totalDiscountAmount);
    this.totalDisAmt=totalDiscountAmount;
    this.QuotationForm.controls['ff0008'].setValue(afterDiscountAmount);
    this.afterDisAmt=afterDiscountAmount
    this.QuotationForm.controls['ff0013'].setValue(totalAmountWithGST);
    this.totalAmt=totalAmountWithGST;
    this.setGSTData(this.unitCodeData)
  }
  isProductInfoSuccess=false;
  onViewDetails(){//todo
    if(this.ViewDetailForm.value){
  if(this.ViewDetailForm.controls['orgUnitCode'].value!='' && this.ViewDetailForm.controls['salesUnitCode'].value!=''){

  this.checkUnitCode()
    }
  }

  }
  unitCodeData:any;
  checkUnitCode(){
    this.sdService.getUnitCodeDetail(this.ViewDetailForm.controls['orgUnitCode'].value,this.ViewDetailForm.controls['salesUnitCode'].value).subscribe((data:any)=>{
      console.log(data);
      this.unitCodeData=data.data.content;
      this.setGSTData(this.unitCodeData)
    })
  }
  SGST:any;
  CGST:any;
  IGST:any;
  setGSTData(data){
   if(data[0].ff0013 == data[1].ff0013){
    this.CGST=this.totalGst/2
    this.SGST=this.totalGst/2
    this.IGST=0;
   }else{
    this.IGST=this.totalGst;
    this.SGST=0;
    this.CGST=0;
   }
  }
  /**************** VALIDATION ********************************************/
  onChangeSGST(){
   let sgst:number= this.QuotationForm.controls['gethSNCode'].value;
   let cgst:number= this.QuotationForm.controls['rate'].value;
   let totalGst:number=sgst+cgst;
   this.QuotationForm.controls['discountPercentage'].setValue(totalGst)
   this.QuotationForm.controls['discount'].setValue(totalGst)
  }

  onChangeCGST(){
    let sgst= this.QuotationForm.controls['gethSNCode'].value;
    let cgst= this.QuotationForm.controls['rate'].value;
    let totalGst=sgst+cgst;
    this.QuotationForm.controls['discountPercentage'].setValue(totalGst)
    this.QuotationForm.controls['discount'].setValue(totalGst)
  }

  /****************************************** VALIDATION *******************************/
  onCalAllFieldAmount(idx){
    if(this.stockList[idx].quantity!=null){
      if(Number.isNaN(this.stockList[idx].discount) || this.stockList[idx].discount==undefined){
        this.stockList[idx].discount=0;
      }
      if(Number.isNaN(this.stockList[idx].discountPercentage) || this.stockList[idx].discountPercentage==undefined){
        this.stockList[idx].discountPercentage=0;
      }
      if(Number.isNaN(this.stockList[idx].rate) ||  this.stockList[idx].rate == undefined){
        this.stockList[idx].rate=0;
      }
      if(Number.isNaN(this.stockList[idx].ff0013) ||  this.stockList[idx].ff0013 == undefined){
        this.stockList[idx].ff0013=0;
      }
      if(Number.isNaN(this.stockList[idx].gstAmount) ||  this.stockList[idx].gstAmount == undefined){
        this.stockList[idx].gstAmount=0;
      }
      if(Number.isNaN(this.stockList[idx].gst) ||  this.stockList[idx].gst == undefined){
        this.stockList[idx].gst=0;
      }
      this.stockList[idx].discount=((this.stockList[idx].rate)*(this.stockList[idx].discountPercentage)/100);
      this.stockList[idx].discountedRate=(this.stockList[idx].discount *  this.stockList[idx].quantity)
      this.stockList[idx].ff0013=(((this.stockList[idx].rate)*(this.stockList[idx].quantity))-((this.stockList[idx].discount)*(this.stockList[idx].quantity)));
      this.stockList[idx].gstAmount=(((this.stockList[idx].ff0013)*(this.stockList[idx].gst))/100);
      this.stockList[idx].finalPrice=(this.stockList[idx].ff0013 + this.stockList[idx].gstAmount);
      this.onCalTotalValue();
     }
  }
  onChangeDiscountAmount(idx){ 
    if(this.stockList[idx].discountPercentage!=null){
      this.stockList[idx].discount=((this.stockList[idx].rate)*(this.stockList[idx].discountPercentage)/100);
      this.stockList[idx].discountedRate=(this.stockList[idx].discount *  this.stockList[idx].quantity)
      this.onChangeAfterDiscount(idx)
    }
  }
  onChangeAfterDiscount(idx){
    if(Number.isNaN(this.stockList[idx].quantity)){
      this.stockList[idx].quantity=1;
    }
    if(Number.isNaN(this.stockList[idx].discount)){
      this.stockList[idx].discount=0;
    }
    if(Number.isNaN(this.stockList[idx].gstAmount) ||  this.stockList[idx].gstAmount == undefined){
      this.stockList[idx].gstAmount=0;
    }
    this.stockList[idx].ff0013=(((this.stockList[idx].rate)*(this.stockList[idx].quantity))-((this.stockList[idx].discount)*(this.stockList[idx].quantity)))
    this.stockList[idx].finalPrice=(this.stockList[idx].ff0013 + this.stockList[idx].gstAmount);
    this.onCalTotalValue();
  }

  onChangeQTY(idx){
    if(this.stockList[idx].quantity!=null){
      if(Number.isNaN(this.stockList[idx].discount) || this.stockList[idx].discount==undefined){
        this.stockList[idx].discount=0;
      }
      if(Number.isNaN(this.stockList[idx].discountPercentage) || this.stockList[idx].discountPercentage==undefined){
        this.stockList[idx].discountPercentage=0;
      }
      if(Number.isNaN(this.stockList[idx].rate)){
        this.stockList[idx].rate=0;
      }
      if(Number.isNaN(this.stockList[idx].ff0013)){
        this.stockList[idx].ff0013=0;
      }
      if(Number.isNaN(this.stockList[idx].gstAmount) ||  this.stockList[idx].gstAmount == undefined){
        this.stockList[idx].gstAmount=0;
      }
      this.stockList[idx].discount=((this.stockList[idx].rate)*(this.stockList[idx].discountPercentage)/100);
      this.stockList[idx].discountedRate=(this.stockList[idx].discount *  this.stockList[idx].quantity)
      this.stockList[idx].ff0013=(((this.stockList[idx].rate)*(this.stockList[idx].quantity))-((this.stockList[idx].discount)*(this.stockList[idx].quantity)))
      this.stockList[idx].finalPrice=(this.stockList[idx].ff0013 + this.stockList[idx].gstAmount);
      this.onCalTotalValue();
     }
  }
  onChangeGST(idx){
    if(this.stockList[idx].gst!=null){
      if(Number.isNaN(this.stockList[idx].ff0013) || this.stockList[idx].ff0013==undefined){
        this.stockList[idx].ff0013=0;
      }
      this.stockList[idx].gstAmount=(((this.stockList[idx].ff0013)*(this.stockList[idx].gst))/100);
      this.stockList[idx].finalPrice=(this.stockList[idx].ff0013 + this.stockList[idx].gstAmount);
      this.onCalTotalValue()
    }
  }

  /************************************* LOV ***********************************************/
  displayedColumns:any;
  selectedDialogData:any;
  openOrgUnitCodeLov(){
    this.displayedColumns = [
      { field: 'buunitcode', title: 'Code' },
      { field: 'buunitname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Organization Unit Code",
        dialogColumns: this.displayedColumns,
        dialogData: this.orgUnitCode,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.isValueSelected=true;
        this.ViewDetailForm.controls['orgUnitCode'].setValue(result.data.buunitcode);
        this.onViewDetails();
      }
    })
  }
  isPlantCodeSuccess:boolean
  onChangeOrgUnitCode(){
    if ( this.ViewDetailForm.controls['orgUnitCode'].value == '') {
      this.ViewDetailForm.controls['orgUnitCode'].setValue('')
    } else {
      let currentPlantCodeValue =  this.ViewDetailForm.controls['orgUnitCode'].value
      this.isPlantCodeSuccess = false;
      this.orgUnitCode.forEach(elements => {
        if (elements.buunitcode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
          this.onViewDetails();
        }
      })
      if (this.isPlantCodeSuccess == false) {
        this.ViewDetailForm.controls['orgUnitCode'].setErrors({'incorrect':true})
        this.openOrgUnitCodeLov();
      }
    }
  }
  openSalesUnitLov(){
    this.displayedColumns = [
      { field: 'suunitcode', title: 'Code' },
      { field: 'suunitname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Sales Unit Code",
        dialogColumns: this.displayedColumns,
        dialogData: this.salesUnitCode,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
       // this.isValueSelected=true;
        this.ViewDetailForm.controls['salesUnitCode'].setValue(result.data.suunitcode);
        this.onViewDetails();
      }
    })
  }
  onChangeSalesUnitCode(){
    if ( this.ViewDetailForm.controls['salesUnitCode'].value == '') {
      this.ViewDetailForm.controls['salesUnitCode'].setValue('')
    } else {
      let currentPlantCodeValue =  this.ViewDetailForm.controls['salesUnitCode'].value
      this.isPlantCodeSuccess = false;
      this.orgUnitCode.forEach(elements => {
        if (elements.suunitcode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
          this.onViewDetails();
        }
      })
      if (this.isPlantCodeSuccess == false) {
        this.ViewDetailForm.controls['salesUnitCode'].setErrors({'incorrect':true})
        this.openSalesUnitLov();
      }
    }
  }
  openNextStageLov(){
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Stage",
        dialogColumns: this.displayedColumns,
        dialogData: this.nextStageListData,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.QuotationForm.controls['nextStage'].setValue(result.data.stage)
      }
    })
  }
  onChangeNextStage(){}
  buRequestBody={
    auc0001:'',
    buc0001:''
  }
  onGetBuInfo(){
    this.sdService.getBuInfo(this.buRequestBody).subscribe((data)=>{
    })

  }
  getBuInfo
  /***********************************SAVE UPDATE API *************************************/
  onSaveUpdate(btnStatus:any){
    console.log(btnStatus)
    if( this.QuotationForm.controls['nextStage'].value=='' ||this.QuotationForm.controls['nextStage'].value==undefined ){
      this.QuotationForm.controls['nextStage'].setValue(0)
    }
    let quotationDate=this.QuotationForm.controls['quotationValidDate'].value
    let requestBody:any;
    requestBody={
      quationItemList:this.stockList,
      lcRequest: {
        unitCode: this.headerData.unitcode,
        moduleCode: this.headerData.modulecode,
        departmentCode: this.headerData.departmentcode,
        lcrqNumber: '',
        lcNumber: this.headerData.lcnum,
        lcStage: this.headerData.stage,
        lcRole: this.headerData.role,
        stage2: 0,
        createdBy: this.headerData.createdby,
        comments: this.QuotationForm.controls['comments'].value
      },
      saleUnitCode: this.ViewDetailForm.controls['salesUnitCode'].value,
      quotationValidDate:moment(this.QuotationForm.controls['quotationValidDate'].value).format('DD-MM-YYYY HH:mm:ss.SSS'),
      deliveryDate: moment(this.QuotationForm.controls['deliveryDate'].value).format('DD-MM-YYYY HH:mm:ss.SSS'),
      paymentTermsCode: this.QuotationForm.controls['paymentTermsCode'].value,
      //subTotalAmount: 1000000,
      discountAmount: this.totalDisAmt,
      discountedSubTotalAmount: this.afterDisAmt,
      sgst: this.SGST,
      cgst: this.CGST,
      igst: this.IGST,
      totalGST: this.totalGst,
      finalTotalAmount: this.totalAmt,
      orderStatus: this.headerData.modulecode,
      quotationStage: this.headerData.modulecode,
    }
    if(btnStatus==1){
      requestBody.isItDraft=false;
    }else{
      requestBody.isItDraft=true;
    }
    console.log(requestBody)
    this.isLoading=true;
    this.sdService.onSaveUpdate(requestBody).subscribe((data:any)=>{
     // console.log(data)
      if(data.errorInfo !=null){
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      }else{
        this.messageService.sendSnackbar('success','"Quatation info Record inserted successfully');
      }
      this.isLoading=false;
    })
  }

  /*************************************ONSUBMIT ******************************************/
  onSubmit(btnStatus:any){
    console.log(btnStatus)
    const dialogRef = this.dialog.open(ESignatureComponent, {
      height: "300px",
      width: "600px",
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        if(this.selectedDialogData){
          this.onSaveUpdate('1')
        }
      }
    })
  }
  onSaveConfirmation(btnStatus:any){
    console.log(btnStatus)
    const dialogRef = this.dialog.open(ESignatureComponent, {
      height: "300px",
      width: "600px",
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        if(this.selectedDialogData){
          this.onSaveUpdate('0')
        }
      }
    })
  }
  onSubmitConfirmApi(){
    //todo
  }
}
