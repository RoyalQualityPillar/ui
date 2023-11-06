import { Component,OnInit,ViewChild,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {MessageService} from '../../service/message.service';
import { AdminService } from 'src/app/admin/admin.service';
import {GlobalConstants} from '../../common/global-constants';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { SdService } from '../sd.service';
export interface userData {
  userData: any;
  type:any;
}


@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: false})paginator!: MatPaginator;
  activeLifeCycleisplayedColumns:string[] = ['action','userid','lcnum','stage','alluser','comments','download','esign','lcrole','print','view','status','version','createdon'];
  constructor(public fb: FormBuilder,
    private sdService:SdService,
    public messageService:MessageService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<StockListComponent>,
              @Inject(MAT_DIALOG_DATA) public userData: userData){

    }
    ngOnInit(): void {
      console.log(this.userData.userData)
      this.onLoadTableData()
    }
    tableData:any;
    dataSource:any;
    isLoading=false;
    size:any;
    pageIndex:any;
    selection = new SelectionModel<any>(true,[])
    onLoadTableData(){
      this.isLoading = true;
      this.size = GlobalConstants.size;
      this.dataSource = null;
      this.pageIndex = 0;
      this.sdService.getStockList(this.size, this.pageIndex).subscribe((data: any) => {
        console.log(data);
        this.isLoading=false;
        this.dataSource=data.data;
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;

      })
    }

    handleKeyPress(val:any){
      console.log('bharat')
      console.log(val);
      console.log(this.selection.selected)
     
    }
    cureentSelectedRow:any;
    selectedRowData:any;
    onSubmit(){
      this.cureentSelectedRow=this.selection.selected;
      if(this.cureentSelectedRow.length==1){
        console.log(this.cureentSelectedRow[0])
        this.selectedRowData=this.cureentSelectedRow[0];
          console.log(' one')
      }else if(this.cureentSelectedRow.length>1){
        console.log('more than one')
        let arrayLength=this.cureentSelectedRow.length-1;
        console.log(arrayLength)
        console.log(this.cureentSelectedRow[arrayLength]);
        this.selectedRowData=this.cureentSelectedRow[arrayLength]
      }else{
        //do nothing
        console.log('else block')
            //do nothing
            this.dialog.open(MessageDialogComponent, {
              width:"400px",
              data: { 'message': "Please select any row", 'heading': "Error Information" }
            });
            return
          
      }
     console.log(this.selectedRowData)
     this.redirectToList()
    
    }
    redirectToList(){
console.log(this.selectedRowData)
    }
    selectedId:any;
    setSelectedId(id:any){
      // if(target.checked){
        this.selectedId=id;
        
        console.log(this.selectedId)
   //   }
    }
    onReviewUserData(){
    //   console.log(this.selectedId)
    //   if(this.selectedId==undefined){
    //     this.dialog.open(MessageDialogComponent, {
    //       width:"400px",
    //       data: { 'message': "Please select any row", 'heading': "Error Information" }
    //     });
    //     return
    //   }else{
    //   const dialogRef=this.dialog.open(UpdateLifeCycleComponent,{
    //     minWidth:"80%",
    //     data:{userData:this.selectedId,type:'update_active_life_Cycle'}
    //   })
    // }
    }
}
