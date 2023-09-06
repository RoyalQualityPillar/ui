import { Component,OnInit,AfterViewInit,Inject,ViewChild,ElementRef,ViewChildren,QueryList   } from '@angular/core';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MessageService} from '../../../service/message.service';
import { AdminService } from 'src/app/admin/admin.service';
import {GlobalConstants} from '../../../common/global-constants';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
export interface userData {
  tableData:any;
}

@Component({
  selector: 'app-selected-user-list',
  templateUrl: './selected-user-list.component.html',
  styleUrls: ['./selected-user-list.component.scss']
})
export class SelectedUserListComponent implements OnInit  {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: false})paginator!: MatPaginator;
  userDisplayedColumns: string[] = ['userId','firstName', 'lastName'];
  tableData:any;
  constructor(
    private adminService:AdminService,
    public dialog: MatDialog,
    private messageService:MessageService,
    public dialogRef: MatDialogRef<SelectedUserListComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData){}
    
    ngOnInit(): void {
      this.onLoadTableData();
    }

    onLoadTableData(){
      console.log(this.userData.tableData)
      this.tableData = new MatTableDataSource(this.userData.tableData.useridList);
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;
    }
}
