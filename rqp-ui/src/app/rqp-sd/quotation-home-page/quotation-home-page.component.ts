import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SdService } from '../sd.service';
import { StockListComponent } from '../stock-list/stock-list.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-quotation-home-page',
  templateUrl: './quotation-home-page.component.html',
  styleUrls: ['./quotation-home-page.component.scss']
})
export class QuotationHomePageComponent implements OnInit{

  isReadonly=true;
  constructor(public fb:FormBuilder,
              private sdService:SdService,
              public dialog: MatDialog,){
                this.QuotationForm=this.fb.group({
                  oucode:['',Validators.required],
                  lc0001:['',Validators.required],
                  lc0002:['',Validators.required],
                  lc0003:['',Validators.required],
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
  QuotationForm:FormGroup;

  ngOnInit(): void {
    this.QuotationForm.controls['ff0011'].disable();
    this.QuotationForm.controls['ff0012'].disable();
    this.QuotationForm.controls['ff0013'].disable();
  }
  addNewRow(){
    const dialogRef=this.dialog.open(StockListComponent,{
      minWidth:"80%",
      data:{type:'List'}
    })
    dialogRef.afterClosed().subscribe(result => {
      this.selectedRow=result;
      //this.addNewRow();
    }) 
  }
  selectedRow:any;
  stockList=[];
  addNewRow1(){
   console.log("selected Row"+this.selectedRow);
   if(this.stockList.length == 0){
    this.stockList=[];
   }
   this.stockList.push({});
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
}
