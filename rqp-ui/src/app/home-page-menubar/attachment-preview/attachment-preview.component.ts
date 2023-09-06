import { Component,OnInit,ViewChild,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
export interface userData {
  fileURL: any;
}
@Component({
  selector: 'app-attachment-preview',
  templateUrl: './attachment-preview.component.html',
  styleUrls: ['./attachment-preview.component.scss']
})
export class AttachmentPreviewComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<AttachmentPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
    ) {}
    pdfSrc:any;
  ngOnInit(): void {
    console.log(this.userData)
    this.pdfSrc=this.userData
  }


}
