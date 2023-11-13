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
  selection =new SelectionModel<any>(true,[])
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: false})paginator!: MatPaginator;
  activeLifeCycleisplayedColumns:string[] = ['action','aUC0001','aFF0001','aFF0002','aFF0003','aFF0008','aFF0009','aFF0010','aFF0011','aFF0012','aFF0013','bFF0010','bFF0011','bFF0012','bFF0013'];
  constructor(public fb: FormBuilder,
    private sdService:SdService,
    public messageService:MessageService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<StockListComponent>,
              @Inject(MAT_DIALOG_DATA) public userData: userData){

    }
    dialogData:any;
    ngOnInit(): void {
      this.dialogData=this.userData
      this.selectedUnitCode=this.dialogData.data;
      
    }
   ngAfterViewInit(){
    this.onLoadTableData()
   }
    tableData:any;
    dataSource:any;
    isLoading=false;
    size:any;
    pageIndex:any;
    selectedUnitCode:any;
    datalength=0;
    onLoadTableData(){
      this.isLoading = true;
      this.size = GlobalConstants.size;
      this.dataSource = null;
      this.pageIndex = 0;
      this.sdService.getStockList(this.selectedUnitCode,this.pageIndex,this.size).subscribe((data: any) => {
        this.isLoading=false;
        this.dataSource=data.data;
        this.datalength=this.dataSource.length;
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;

      })
    }
    selectedData:any;
    onSelectedChange(val) {
      this.selectedData = val;
      this.dialogRef.close({ data: this.selectedData });
    }
    handleKeyPress(val:any){
      console.log(this.selection.selected)
     
    }
    cureentSelectedRow:any;
    selectedRowData:any;
    onSubmit(){
      this.cureentSelectedRow=this.selection.selected;
      if(this.cureentSelectedRow.length==1){
        this.selectedRowData=this.cureentSelectedRow[0];
      }else if(this.cureentSelectedRow.length>1){
        let arrayLength=this.cureentSelectedRow.length-1;
        this.selectedRowData=this.cureentSelectedRow[arrayLength]
      }else{
        //do nothing
            this.dialog.open(MessageDialogComponent, {
              width:"400px",
              data: { 'message': "Please select any row", 'heading': "Error Information" }
            });
            return
          
      }
     this.redirectToList()
    
    }
    redirectToList(){
    }
    selectedId:any;
    setSelectedId(id:any){
      // if(target.checked){
        this.selectedId=id;
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

    isAllSelected(){
      const numSelected =this.selection.selected.length;
      const nomRows =this.tableData.length;
      return numSelected === nomRows;
    }
    masterToggle(){
      this.isAllSelected()?
      this.selection.clear():
      this.tableData.data.forEach(row =>this.selection.select(row));
    }

    onSelectedRow(){
      //console.log(this.selection.selected);
      if(this.selection.selected.length<1){
      this.dialog.open(MessageDialogComponent, {
        width:"400px",
        data: { 'message': "Please select any row", 'heading': "Error Information" }
      });
      return;
    }else{
      this.dialogRef.close({ data: this.selection.selected});
    }
    }
    applyFilter(filterValue:any){
      filterValue =filterValue.trim();
      filterValue=filterValue.toLowerCase();
      this.tableData.filter=filterValue;
    }
}
