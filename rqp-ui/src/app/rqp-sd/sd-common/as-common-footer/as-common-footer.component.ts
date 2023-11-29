import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-as-common-footer',
  templateUrl: './as-common-footer.component.html',
  styleUrls: ['./as-common-footer.component.scss']
})
export class AsCommonFooterComponent implements OnInit{
  @Input() pageData:any;
  isReadonly:boolean;
  QuotationForm:FormGroup;
   constructor(public fb:FormBuilder,){
    this.QuotationForm=this.fb.group({
      comments:['']
    })
   }
   ngOnInit(): void {
     this.isReadonly=true;
     this.QuotationForm.controls['comments'].setValue(this.pageData.comments)
   }
}
