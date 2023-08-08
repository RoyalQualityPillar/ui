import { Component,OnInit,AfterViewInit,Inject,ViewChild,ElementRef,ViewChildren,QueryList   } from '@angular/core';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MessageService} from '../../../service/message.service';
import { AdminService } from 'src/app/service/admin.service';
import {GlobalConstants} from '../../../common/global-constants';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
export interface userData {
  type:any;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit  {
  @ViewChild("tableWrapper", { static: true }) tableWrapper: ElementRef;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  userDisplayedColumns: string[] = ['action','userId','firstName', 'lastName'];
  AddedUserdisplayedColumns: string[] = ['action','userId','firstName', 'lastName'];
  isLoading=false;
  size:any;
  dataSource:any;
  pageIndex:any;
  data1:any;
  selectedTab=0;
  tableData:any;
  currentApiResLength:any;
  constructor(
    private adminService:AdminService,
    public dialog: MatDialog,
    private messageService:MessageService,
    public dialogRef: MatDialogRef<UserListComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData){}

    ngOnInit(): void {
      this.onLoadUserList();
    }
    ngAfterViewInit() {
      this.onLoadUserList();
    }
    finalList=[];
    onLoadUserList(){
      this.isLoading=true;
      this.size=GlobalConstants.size;
      this.dataSource=null;
      this.pageIndex=0;
      this.adminService.getUserProfileList(this.size,this.pageIndex,this.selectedTab).subscribe((data: any) => {
        console.log(data)
        console.log(data.data.content)
        this.data1=data.data.content;
        this.currentApiResLength=this.data1.length
        this.isLoading=false;
        this.data1.forEach(element =>{
          let newDataList={
            'userId':element.userId,
            'firstName':element.firstName,
            'lastName':element.lastName,
          }
          this.finalList.push(newDataList)
        })
        this.tableData = new MatTableDataSource(this.finalList);
        this.tableData.paginator = this.paginator.toArray()[0];
        this.tableData.sort = this.sort.toArray()[0];
      })
    }
    //Pagination
pageChanged(event){
  console.log(event)
  if(this.currentApiResLength==GlobalConstants.size){
    if(event.length-((event.pageIndex+1)*(event.pageSize))==0||(event.length<event.pageSize)){
      this.onPaginationCall();
    }
  }
}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  console.log(filterValue)
  this.tableData.filter = filterValue;
  console.log(this.tableData)
  console.log(this.tableData)
}
onPaginationCall(){
  //todo
}
addStatus=true;
removeStatus=false;
removedTableData:any[]=[];
removedTable:any;
onUser(row:any){
  console.log(row)
  if(this.tableData.length == 1){
    console.log("inside tableData null");
    this.addStatus=false;
  }
  this.removeStatus=true;
  this.removedTableData.push(row)
  this.finalList.splice(this.finalList.indexOf(row),1);

  this.tableData = new MatTableDataSource(this.finalList);
  this.tableData.paginator = this.paginator.toArray()[0];
  this.tableData.sort = this.sort.toArray()[0];

  this.removedTable = new MatTableDataSource(this.removedTableData);
  this.removedTable.paginator = this.paginator.toArray()[1];
  this.removedTable.sort = this.sort.toArray()[1];
}
onUserRemove(row:any){
  if(this.removedTableData.length ==1){
    console.log("inside remove null");
    this.removeStatus=false
  }
  this.finalList.push(row);
  this.removedTableData.splice(this.removedTableData.indexOf(row),1);
   
  this.tableData = new MatTableDataSource(this.finalList);
  this.tableData.paginator = this.paginator.toArray()[0];
  this.tableData.sort = this.sort.toArray()[0];

  this.removedTable = new MatTableDataSource(this.removedTableData);
  this.removedTable.paginator = this.paginator.toArray()[1];
  this.removedTable.sort = this.sort.toArray()[1];

}
addAllUser(){
  this.removedTableData=this.finalList.concat(this.removedTableData);
  this.finalList= [];
  this.tableData = new MatTableDataSource(this.finalList);
  this.tableData.paginator = this.paginator.toArray()[0];
  this.tableData.sort = this.sort.toArray()[0];

  this.removedTable = new MatTableDataSource(this.removedTableData);
  this.removedTable.paginator = this.paginator.toArray()[1];
  this.removedTable.sort = this.sort.toArray()[1];
  this.addStatus = false;
  this.removeStatus = true;
}
removeAllUser(){
  this.finalList=this.removedTableData.concat(this.finalList);
  this.removedTableData= [];

  this.tableData = new MatTableDataSource(this.finalList);
  this.tableData.paginator = this.paginator.toArray()[0];
  this.tableData.sort = this.sort.toArray()[0];

  this.removedTable = new MatTableDataSource(this.removedTableData);
  this.removedTable.paginator = this.paginator.toArray()[1];
  this.removedTable.sort = this.sort.toArray()[1];
  this.addStatus = true;
  this.removeStatus = false;
}
onSave(){
  let mainTableData=this.finalList;
  let removeTableData=this.removedTableData;
  this.dialogRef.close({data:removeTableData})
  
}
}
