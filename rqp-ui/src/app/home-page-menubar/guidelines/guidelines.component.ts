import { Component,OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {MessageService} from '../../service/message.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { CreateGuidelineComponent } from '../create-guideline/create-guideline.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.scss']
})
export class GuidelinesComponent {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: false})paginator!: MatPaginator;
  GuideLines: FormGroup;
  guidelinesData:any;
  allLifeCycleisplayedColumns: string[] = ['documentName','documentNumber','category','subCategory','attachment1','attachment2'];
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


  pdfSrc:any;
  onFileSelected(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file)
    const reader = new FileReader();
    reader.onload=()=>{
      this.pdfSrc=reader.result as string;
    };
    reader.readAsArrayBuffer(file)
  }
onCreateGuidelinesPOPUP(){
    console.log('working')
    console.log(this.pdfSrc)
    const dialogRef = this.dialog.open(CreateGuidelineComponent, {
      minWidth: "80%",
      data:{},
    });
    
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
     console.log(dialogResult);
    }
      
    }); 
  }
}
