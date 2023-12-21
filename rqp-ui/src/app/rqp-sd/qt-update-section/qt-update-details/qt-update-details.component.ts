import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SdService } from '../../sd.service';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { StockListComponent } from '../../stock-list/stock-list.component';
import { MatDialog } from '@angular/material/dialog';
import { elements } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ESignatureComponent } from '../../sd-common/e-signature/e-signature.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MessageService } from 'src/app/service/message.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment';
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
  selector: 'app-qt-update-details',
  templateUrl: './qt-update-details.component.html',
  styleUrls: ['./qt-update-details.component.scss']
})
export class QtUpdateDetailsComponent implements OnInit{
  ff0001:any;
  pageData:any;
  isReadonly:boolean;
  ViewDetailForm:FormGroup;
  QuotationForm:FormGroup;
  FooterForm:FormGroup;
  isLoading:boolean;
  resviewCommentsDisplayColumn:string[]=['createdby','ff0003','ff0005','comments'];

  constructor(public router:ActivatedRoute,private sdService:SdService,public fb:FormBuilder,public dialog: MatDialog,
    private lifeCycleDataService:LifeCycleDataService,private messageService:MessageService,
    private toolbarService:ToolbarService){
    this.ViewDetailForm=this.fb.group({
      orgUnitCode:['',Validators.required],
      salesUnitCode:['',Validators.required],
      quotationNo:['']
    });
    this.FooterForm=this.fb.group({
      nextStage:['']
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
  ff0003:any;
  headerRequestBody:any;
  //pageData:any;
  isHeaderLoad=false;
  ngOnInit(): void {
    this.isReadonly=true;
    // this.pageData={
    //   pageName:'qtUpdateDetail',
    //  }
    this.router.queryParams.subscribe((params:any)=>{
      console.log(params)
      this.ff0003=params.ff0003;
      this.pageData ={
           pageName:'qtUpdateDetail',
           requestNo:params.uc0001,
           version:params.ff0007 +"."+params.ff0008+"."+params.ff0009+"."+params.ff0010,
      //   comments:params.comments
       }
      this.isHeaderLoad=true;
      this.ff0001=params.uc0001;
      console.log(this.pageData)
       
    })
    if(this.ff0001){
      //this.onReviewData();
      //this.onQTList();
      this.onGetRequestNo();
      this.onReviewData();
     // this.onQTIndexList();
    }
    this.headerRequestBody=this.lifeCycleDataService.getSelectedRowData();
  
    this.onLoadNextStageData();
  }
  headerData:any;
  getHeaderData(pageData:any){
   // console.log(pageData);
    this.headerData=pageData;
  }
  requestNoID:any;
  onGetRequestNo(){
    this.sdService.getResquestNoID(this.ff0001).subscribe((data:any)=>{
      console.log(data)
      this.requestNoID=data.data[0].uc0001;
      if( this.requestNoID){
        
        this.onQTIndexList();
        setTimeout(() => {
          this.onQTList()
        }, 1000);
      }
    })
  }
  indexList:any
  onQTIndexList(){
    this.sdService.getQTIndexList(this.requestNoID).subscribe((data:any)=>{
      console.log(data)
      this.indexList=data.data[0];
      if( this.indexList){
        this.ViewDetailForm.controls['orgUnitCode'].setValue(this.indexList.ff0001);
        this.ViewDetailForm.controls['salesUnitCode'].setValue(this.indexList.ff0002);
        this.ViewDetailForm.controls['quotationNo'].setValue(this.indexList.uc0001);
        let validDate=moment(this.indexList.ff0003).format();
        console.log(validDate)
        this.QuotationForm.controls['quotationValidDate'].setValue(validDate)
        let deliveryDate=moment(this.indexList.ff0004).format();
        this.QuotationForm.controls['deliveryDate'].setValue(deliveryDate)
        this.QuotationForm.controls['paymentTermsCode'].setValue(this.indexList.ff0005)
        this.checkUnitCode() 
      }
    })
  }
  unitCodeData:any;
  checkUnitCode(){
    this.sdService.getUnitCodeDetail(this.ff0003,this.ViewDetailForm.controls['salesUnitCode'].value).subscribe((data:any)=>{
      console.log(data);
      this.unitCodeData=data.data.content;
      this.setGSTData(this.unitCodeData)
    })
  }
  dataSource:any;
  reviewCommentsData:any;
  onReviewData(){
    this.sdService.onReviewData(this.ff0001).subscribe((data:any)=>{
       this.reviewCommentsData=data.data;
       this.dataSource=new MatTableDataSource(this.reviewCommentsData);
       //this.dataSource.sort=this.sort;
    
    })
  }
  onRequestVersion(row){
    return row.ff0005 +"."+row.ff0006+"."+row.ff0007+"."+row.ff0008;
  }
  currentComments:any;
  getCommentsData(event:any){
    console.log(event)
    this.currentComments=event
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
  qtItemListdataSource:any;
  previousList:any;
  onQTList(){
    this.sdService.onQTList(this.requestNoID).subscribe((data:any)=>{
      console.log(data)
      //this.qtItemListdataSource=data;
      //this.stockList=[...data]
      this.previousList=data.data
      this.previousList.forEach((elements)=>{
        this.stockList.push({
          'uc0001':elements.uc0001,
          'ff0020':elements.ff0020,
          'productCode':elements.ff0005,
          'productName':elements.ff0006,
          'productNumber':elements.ff0018,
          'quantity':elements.ff0007,
          'gethSNCode':elements.ff0009,
          'rate':elements.ff0010,
          'discountPercentage':elements.ff0011,
          'discount':elements.ff0012,
          'discountedRate':elements.ff0019,
          'ff0013':elements.ff0013,
          'gst':elements.ff0015,
          'gstAmount':elements.ff0016,
          'finalPrice':elements.ff0017,








        // 'productName':elements.aFF0003,
        // 'quantity':elements.bFF0010,
        // 'productNumber':elements.aFF0001,
        // 'gethSNCode':elements.aFF0010,
        // 'rate':elements.aFF0008,
        })
      })
    //  this.checkUnitCode();//
      console.log(this.unitCodeData)
      this.onCalTotalValue()
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
  SGST:any;
  CGST:any;
  IGST:any;
  
  setGSTData(data){
    console.log(data)
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
    nextStageListData:any;
    previousStageListData:any;
    onLoadNextStageData(){
      let body:any;
      body={
        lcNumber:this.headerRequestBody.lifeCycleCode,
        lcStage:this.toolbarService.currentStage
      }
      this.sdService.getNextStageList(body).subscribe((data:any)=>{
        this.nextStageListData=data.data.nstage;
        this.previousStageListData=data.data.pstage;
      })
    }
  displayedColumns:any;
  selectedDialogData:any;
  openNextStageLov(){
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Next Stage",
        dialogColumns: this.displayedColumns,
        dialogData: this.nextStageListData,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.FooterForm.controls['nextStage'].setValue(result.data.stage)
      }
    })
  }
  
  /***********************************SAVE UPDATE API *************************************/
  onSaveUpdate(btnStatus:any){
    console.log(btnStatus)
    if( this.QuotationForm.controls['nextStage'].value=='' ||this.QuotationForm.controls['nextStage'].value==undefined ){
      this.QuotationForm.controls['nextStage'].setValue(0)
    }
    let quotationDate=this.QuotationForm.controls['quotationValidDate'].value
    let requestBody:any;
    let draftValue:boolean;
    if(btnStatus==1){
      draftValue=false;
    }else{
      draftValue=true;
    }
    requestBody={
      quationItemList:this.stockList,
      lcRequest: {
        unitCode: this.headerData.unitcode,
        moduleCode: this.headerData.modulecode,
        departmentCode: this.headerData.departmentcode,
        lcrqNumber: this.headerData.requestNo,//added later
        lcNumber: this.headerData.lcnum,
        lcStage: this.headerData.stage,
        lcRole: this.headerData.role,
        stage2: 0,
        createdBy: this.headerData.createdby,
        comments: this.QuotationForm.controls['comments'].value,
        draft:draftValue
      },
      saleUnitCode: this.ViewDetailForm.controls['salesUnitCode'].value,
      quotationValidDate:moment(this.QuotationForm.controls['quotationValidDate'].value).format('DD-MM-YYYY HH:mm:ss.SSS'),
      deliveryDate: moment(this.QuotationForm.controls['deliveryDate'].value).format('DD-MM-YYYY HH:mm:ss.SSS'),
      paymentTermsCode: this.QuotationForm.controls['paymentTermsCode'].value,
      //subTotalAmount: 1000000,
      indexNo: this.ViewDetailForm.controls['quotationNo'].value,
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
    // if(btnStatus==1){
    //   requestBody.draft=false;
    // }else{
    //   requestBody.draft=true;
    // }
    console.log(requestBody)
    this.isLoading=true;
    this.sdService.onSaveUpdate(requestBody).subscribe((data:any)=>{
     // console.log(data)
      if(data.errorInfo !=null){
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      }else{
        this.messageService.sendSnackbar('success','Quatation info Record inserted successfully');
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
}

