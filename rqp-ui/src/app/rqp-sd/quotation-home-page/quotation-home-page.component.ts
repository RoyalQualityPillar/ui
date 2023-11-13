import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SdService } from '../sd.service';
import { StockListComponent } from '../stock-list/stock-list.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { elements } from 'chart.js';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

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
  constructor(public fb:FormBuilder,
              private sdService:SdService,
              public dialog: MatDialog,){
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
                  ff0003:[''],
                  ff0004:[''],
                  ff0005:[''],
                  ff0006:[''],
                  ff0007:[''],
                  ff0008:[''],
                  ff0009:[''],
                  ff0010:[''],
                  ff0011:[''],
                  ff0012:[''],
                  ff0013:[''],
                  ff0014:[''],
                  ff0015:[''],
                  comments:['']
                
                })
              }

  companyInfoBody:any;
  orgUnitCode:any;
  salesUnitCode:any;
  isLoading=false;
  isValueSelected=false;
  ngOnInit(): void {
    this.companyInfoBody={
      orgUnitCode:'',
      salesUnitCode:''

    }
    // this.QuotationForm.controls['ff0011'].disable();
    // this.QuotationForm.controls['ff0012'].disable();
    // this.QuotationForm.controls['ff0013'].disable();
    this.onLoadInputFieldValue();
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
      { 'ff0005':elements.aFF0002,
        'ff0006':elements.aFF0003,
        'ff0007':elements.bFF0010,
        'ff0018':elements.aFF0001,
        'ff0009':elements.aFF0010,
        'ff0010':elements.aFF0008,
        //'sumOfTotalDisc':num,
      });
  })
  }
  discoutAmount:number;
  totalDisAmt=0;
  afterDisAmt=0;
  totalAmt=0;
  onCalTotalValue(){
    let totalDiscountAmount=0;
    let afterDiscountAmount=0;
    let totalAmountWithGST=0;
    console.log(this.stockList)
    this.stockList.forEach(ele =>{
      if(ele.totalDiscount>0){
        totalDiscountAmount=totalDiscountAmount+ele.totalDiscount
      }
      if(ele.ff0013>0){
        afterDiscountAmount=afterDiscountAmount+ele.ff0013
      }
      if(ele.ff0017>0){
        totalAmountWithGST=totalAmountWithGST+ele.ff0017
      }
    })
    console.log(totalDiscountAmount)
    this.QuotationForm.controls['ff0007'].setValue(totalDiscountAmount);
    this.totalDisAmt=totalDiscountAmount;
    this.QuotationForm.controls['ff0008'].setValue(afterDiscountAmount);
    this.afterDisAmt=afterDiscountAmount
    this.QuotationForm.controls['ff0013'].setValue(totalAmountWithGST);
    this.totalAmt=totalAmountWithGST
  }
  isProductInfoSuccess=false;
  onViewDetails(){//todo
    if(this.ViewDetailForm.value){
  if(this.ViewDetailForm.controls['orgUnitCode'].value!='' && this.ViewDetailForm.controls['salesUnitCode'].value!=''){

  this.checkUnitCode()
    }
  }

  }
  checkUnitCode(){
    this.sdService.getUnitCodeDetail(this.ViewDetailForm.controls['orgUnitCode'].value,this.ViewDetailForm.controls['salesUnitCode'].value).subscribe((data=>{
      console.log(data);
    }))
  }
  /**************** VALIDATION ********************************************/
  onChangeSGST(){
   let sgst:number= this.QuotationForm.controls['ff0009'].value;
   let cgst:number= this.QuotationForm.controls['ff0010'].value;
   console.log(sgst)
   console.log(cgst)
   let totalGst:number=sgst+cgst;
   console.log(totalGst)
   this.QuotationForm.controls['ff0011'].setValue(totalGst)
   this.QuotationForm.controls['ff0012'].setValue(totalGst)
  }

  onChangeCGST(){
    let sgst= this.QuotationForm.controls['ff0009'].value;
    let cgst= this.QuotationForm.controls['ff0010'].value;
    let totalGst=sgst+cgst;
    this.QuotationForm.controls['ff0011'].setValue(totalGst)
    this.QuotationForm.controls['ff0012'].setValue(totalGst)
  }

  /****************************************** VALIDATION *******************************/
  onCalAllFieldAmount(idx){
    if(this.stockList[idx].ff0007!=null){
      if(Number.isNaN(this.stockList[idx].ff0012) || this.stockList[idx].ff0012==undefined){
        this.stockList[idx].ff0012=0;
      }
      if(Number.isNaN(this.stockList[idx].ff0011) || this.stockList[idx].ff0011==undefined){
        this.stockList[idx].ff0011=0;
      }
      if(Number.isNaN(this.stockList[idx].ff0010) ||  this.stockList[idx].ff0010 == undefined){
        this.stockList[idx].ff0010=0;
      }
      if(Number.isNaN(this.stockList[idx].ff0013) ||  this.stockList[idx].ff0013 == undefined){
        this.stockList[idx].ff0013=0;
      }
      if(Number.isNaN(this.stockList[idx].ff0016) ||  this.stockList[idx].ff0016 == undefined){
        this.stockList[idx].ff0016=0;
      }
      if(Number.isNaN(this.stockList[idx].ff0015) ||  this.stockList[idx].ff0015 == undefined){
        this.stockList[idx].ff0015=0;
      }
      this.stockList[idx].ff0012=((this.stockList[idx].ff0010)*(this.stockList[idx].ff0011)/100);
      this.stockList[idx].totalDiscount=(this.stockList[idx].ff0012 *  this.stockList[idx].ff0007)
      this.stockList[idx].ff0013=(((this.stockList[idx].ff0010)*(this.stockList[idx].ff0007))-((this.stockList[idx].ff0012)*(this.stockList[idx].ff0007)));
      this.stockList[idx].ff0016=(((this.stockList[idx].ff0013)*(this.stockList[idx].ff0015))/100);
      this.stockList[idx].ff0017=(this.stockList[idx].ff0013 + this.stockList[idx].ff0016);
      this.onCalTotalValue();
     }
  }
  onChangeDiscountAmount(idx){ 
    if(this.stockList[idx].ff0011!=null){
      this.stockList[idx].ff0012=((this.stockList[idx].ff0010)*(this.stockList[idx].ff0011)/100);
      this.stockList[idx].totalDiscount=(this.stockList[idx].ff0012 *  this.stockList[idx].ff0007)
      this.onChangeAfterDiscount(idx)
    }
  }
  onChangeAfterDiscount(idx){
    console.log(typeof (this.stockList[idx].ff0007))
    if(Number.isNaN(this.stockList[idx].ff0007)){
      this.stockList[idx].ff0007=1;
    }
    if(Number.isNaN(this.stockList[idx].ff0012)){
      this.stockList[idx].ff0012=0;
    }
    if(Number.isNaN(this.stockList[idx].ff0016) ||  this.stockList[idx].ff0016 == undefined){
      this.stockList[idx].ff0016=0;
    }
    this.stockList[idx].ff0013=(((this.stockList[idx].ff0010)*(this.stockList[idx].ff0007))-((this.stockList[idx].ff0012)*(this.stockList[idx].ff0007)))
    this.stockList[idx].ff0017=(this.stockList[idx].ff0013 + this.stockList[idx].ff0016);
    this.onCalTotalValue();
  }

  onChangeQTY(idx){
   // console.log(typeof this.stockList[idx].ff0012)
    if(this.stockList[idx].ff0007!=null){
      if(Number.isNaN(this.stockList[idx].ff0012) || this.stockList[idx].ff0012==undefined){
        console.log(this.stockList[idx].ff0012)
        this.stockList[idx].ff0012=0;
      }
      if(Number.isNaN(this.stockList[idx].ff0011) || this.stockList[idx].ff0011==undefined){
        this.stockList[idx].ff0011=0;
      }
      if(Number.isNaN(this.stockList[idx].ff0010)){
        this.stockList[idx].ff0010=0;
      }
      if(Number.isNaN(this.stockList[idx].ff0013)){
        this.stockList[idx].ff0013=0;
      }
      console.log(this.stockList[idx].ff0016)
      if(Number.isNaN(this.stockList[idx].ff0016) ||  this.stockList[idx].ff0016 == undefined){
        this.stockList[idx].ff0016=0;
        console.log(this.stockList[idx].ff0016)
      }
      console.log(this.stockList[idx].ff0007)
      console.log(this.stockList[idx].ff0010)
      this.stockList[idx].ff0012=((this.stockList[idx].ff0010)*(this.stockList[idx].ff0011)/100);
      this.stockList[idx].totalDiscount=(this.stockList[idx].ff0012 *  this.stockList[idx].ff0007)
      this.stockList[idx].ff0013=(((this.stockList[idx].ff0010)*(this.stockList[idx].ff0007))-((this.stockList[idx].ff0012)*(this.stockList[idx].ff0007)))
      this.stockList[idx].ff0017=(this.stockList[idx].ff0013 + this.stockList[idx].ff0016);
      this.onCalTotalValue();
     }
  }
  onChangeGST(idx){
    if(this.stockList[idx].ff0015!=null){
      if(Number.isNaN(this.stockList[idx].ff0013) || this.stockList[idx].ff0013==undefined){
        this.stockList[idx].ff0013=0;
      }
      this.stockList[idx].ff0016=(((this.stockList[idx].ff0013)*(this.stockList[idx].ff0015))/100);
      this.stockList[idx].ff0017=(this.stockList[idx].ff0013 + this.stockList[idx].ff0016);
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
        console.log(result.data)
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
        console.log(result.data)
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
}
