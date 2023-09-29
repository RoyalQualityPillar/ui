import { Component,AfterViewInit,ViewChild,OnInit,ViewEncapsulation,ElementRef,Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialogRef, MAT_DIALOG_DATA} from  '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-lov-dialog',
  templateUrl: './lov-dialog.component.html',
  styleUrls: ['./lov-dialog.component.scss']
})
export class LovDialogComponent implements OnInit {

  @ViewChild("tableWrapper", { static: true }) tableWrapper: ElementRef;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: false})paginator!: MatPaginator;

  dialogColumns:any
  dialogData:any;
  selectedData:any;
  lovName:any;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public refDialog :MatDialogRef<LovDialogComponent>,) { }
  
    ngOnInit() {
      this.dialogColumns = this.data.dialogColumns;
      this.dialogData = this.data.dialogData;
      this.lovName=this.data.lovName;
    }
    onSelectedChange(val)
    {
      console.log(val)
      this.selectedData = val;
      this.refDialog.close({data:this.selectedData});
    }
    closePopUp()
    {
      this.refDialog.close();
    }

}
