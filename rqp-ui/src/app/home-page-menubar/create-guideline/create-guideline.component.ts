import { Component,OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {MessageService} from '../../service/message.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { AttachmentPreviewComponent } from '../attachment-preview/attachment-preview.component';

@Component({
  selector: 'app-create-guideline',
  templateUrl: './create-guideline.component.html',
  styleUrls: ['./create-guideline.component.scss']
})
export class CreateGuidelineComponent {

  
  GuideLines: FormGroup;
  constructor(public fb: FormBuilder,
    public messageService:MessageService,
    public dialog: MatDialog,){

    this.GuideLines = this.fb.group({
      documentName:['',Validators.required],
      documentNumber:['',Validators.required],
      category:['',Validators.required],
      subCategory:['',Validators.required],
      attachment:['',Validators.required],
    })
  }
  pdfSrc1:any;
  pdfSrc2:any;
  onFileSelected1(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file)
    const reader = new FileReader();
    reader.onload=()=>{
      this.pdfSrc1=reader.result as string;
    };
    reader.readAsArrayBuffer(file)
  }
onFileSelected2(event:Event){
  const file = (event.target as HTMLInputElement).files[0];
  console.log(file)
  const reader = new FileReader();
  reader.onload=()=>{
    this.pdfSrc2=reader.result as string;
  };
  reader.readAsArrayBuffer(file)
  }

  onPreview1(type:any){
    const dialogRef = this.dialog.open(AttachmentPreviewComponent, {
      minWidth: "80%",
      data:{ data:this.pdfSrc1},
    });
    
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
     console.log(dialogResult);
    }
      
    }); 
  }
  
  onPreview2(type:any){
    const dialogRef = this.dialog.open(AttachmentPreviewComponent, {
      minWidth: "80%",
      data:{ data:this.pdfSrc2},
    });
    
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
     console.log(dialogResult);
    }
      
    }); 
  }
}
