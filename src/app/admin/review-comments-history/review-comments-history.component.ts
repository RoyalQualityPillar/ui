import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef,Inject } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
export interface userData {
  userData: any;
}
@Component({
  selector: 'app-review-comments-history',
  templateUrl: './review-comments-history.component.html',
  styleUrls: ['./review-comments-history.component.scss']
})
export class ReviewCommentsHistoryComponent implements OnInit{
  @ViewChild('htmlData') htmlData!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ReviewCommentsHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
    ) {}

    data:any;
  ngOnInit() {
    this.data=this.userData.userData
    console.log(this.data)

  }
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Business-unit-info.pdf');
    });
  }

}
