import { Component,OnInit,Inject,ViewChild  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GuidelinesService } from '../guidelines.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import {CookieService} from 'ngx-cookie-service';
import { BusinessUnitService } from '../../business-unit/business-unit.service'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { AdminService } from 'src/app/rqp-admin-module/admin-data/admin.service';
import { MessageService } from 'src/app/service/message.service';

export interface userData {
  userData: any;
  type:any;
  tableData:any;
}

@Component({
  selector: 'app-guidelines-create-update',
  templateUrl: './guidelines-create-update.component.html',
  styleUrls: ['./guidelines-create-update.component.scss']
})
export class GuidelinesCreateUpdateComponent implements OnInit  {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator,{static: false})paginator!: MatPaginator;
  isReadOnly=true;
  isUpdate=false;
  DepartmentMaster: FormGroup;
  orgList:any;
  buTypeList:any;
  unitList:any;
  formData:any;
  isLoading=false;
  statusList:any;
  displayedColumns:any;
  selectedDialogData:any;
  isStatusSuccess=false;
  isPlantCodeSuccess=false;

  constructor(public fb: FormBuilder,
    private adminService: AdminService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private guidelinesService: GuidelinesService,
    private businessUnitService: BusinessUnitService,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<GuidelinesCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData) {
    this.DepartmentMaster = this.fb.group({
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      createdby: [''],
      status: [''],
      comments: ['']
    })
  }
  selectedDataList={
    docNos:'',
    docNames:'',
    categoryTypes:'',
    attachement:File,
  }
  ngOnInit(): void {
    console.log('wor')
    this.onLoadStatusDropDown();
    this.onloadDropDown();
    if (this.userData.type == 'Update') {
      this.isReadOnly = true;
      this.isUpdate = true;
      this.onLoadFormValue();
    } else {
      this.isReadOnly = false;
      this.isUpdate = false;
    }
  }
  categoryList:any;
  categorySubList:any
  fileCayegory:any;
  onloadDropDown() {
    this.isLoading = true;
    this.guidelinesService.getDropDownList().subscribe((data: any) => {
      this.categoryList = data.data.categoryList;
      this.categorySubList = data.data.subCategoryList;
      this.fileCayegory = data.data.fileCategoryList;
      this.isLoading = false;
    })
  }
  onLoadStatusDropDown() {
    this.isLoading = true;
    this.adminService.getDropDownList().subscribe((data: any) => {
      this.statusList = data.data.statusInfo;
      this.isLoading = false;
    })
  }
  onLoadFormValue(){
    this.isLoading = true;
    this.guidelinesService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
      this.formData = data.data;
      this.isLoading = false;
      this.setFormValue();
    })
  }
  setFormValue(){
    this.DepartmentMaster.controls['uc0001'].setValue(this.formData.uc0001)
    this.DepartmentMaster.controls['ff0001'].setValue(this.formData.ff0001)
    this.DepartmentMaster.controls['status'].setValue(this.formData.status)
    this.DepartmentMaster.controls['comments'].setValue(this.formData.comments)
  }
  onUpdate(){
    // this.isLoading = true;
    // this.guidelinesService.onCreate(this.DepartmentMaster.value).subscribe((data: any) => {
    //   if (data.errorInfo != null) {
    //     this.isLoading = false;
    //     this.dialog.open(MessageDialogComponent, {
    //       data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
    //     });
    //   } else {
    //     this.isLoading = false;
    //     this.messageService.sendSnackbar('success', 'Record Updated Successfully');
    //     this.dialogRef.close();
    //   }
    // })
  }
  
  onCreate(){
    this.isLoading = true;
    this.DepartmentMaster.controls['createdby'].setValue(this.cookieService.get('userId'))
    let docNos =[];
    let docNames=[];
    let categoryTypes=[];
    let attachement=[]
    this.UserRoleTable.forEach(element=>{
      docNos.push(element.docNos);
      docNames.push(element.docNames);
      categoryTypes.push(element.categoryTypes);
      attachement.push(element.attachement);
    })
    console.log(docNos)
    console.log(docNames)
    console.log(categoryTypes)
    console.log(attachement)
    this.guidelinesService.onCreate(docNos,docNames,categoryTypes,attachement,this.DepartmentMaster.value).subscribe((data: any) => {
      if (data.errorInfo != null) {
        this.isLoading = false;
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      } else {
        this.isLoading = false;
        this.messageService.sendSnackbar('success', 'Record Created Successfully');
        this.dialogRef.close();
      }
    })
  }
  onClear(){
  this.DepartmentMaster.reset();
  }
  openSubCategoryCodeLOV(){
    this.displayedColumns = ['catCode', 'catName']
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Sub Category",
        dialogColumns: this.displayedColumns,
        dialogData: this.categorySubList,
        lovName: 'uploadSubCategoryList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['subCategory'].setValue(this.selectedDialogData.catCode)
      }
    }) 
  }
  openCategoryLOV(){
    this.displayedColumns = ['subCatCode', 'subCatName']
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Category",
        dialogColumns: this.displayedColumns,
        dialogData: this.categoryList,
        lovName: 'uploadCategoryList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['category'].setValue(this.selectedDialogData.subCatCode)
      }
    }) 
  }
  openBusinessUnitCodeLOV() {
    this.displayedColumns = ['unitCode', 'unitName']
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Business Unit",
        dialogColumns: this.displayedColumns,
        dialogData: this.unitList,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['bucode'].setValue(this.selectedDialogData.unitCode)
      }
    })
  }
    
  onChangePlantCode() {
    if (this.DepartmentMaster.controls['bucode'].value == '') {
      this.DepartmentMaster.controls['bucode'].setValue('')
    } else {
      let currentPlantCodeValue = this.DepartmentMaster.controls['bucode'].value;
      this.isPlantCodeSuccess = false;
      this.unitList.forEach(elements => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      })
      if (this.isPlantCodeSuccess == false) {
        this.DepartmentMaster.controls['bucode'].setErrors({ 'incorrect': true })
        this.openBusinessUnitCodeLOV();
      }
    }
  }
  openStatusLOV() {
    this.displayedColumns = ['code', 'description']
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Status",
        dialogColumns: this.displayedColumns,
        dialogData: this.statusList,
        lovName: 'statusList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['status'].setValue(this.selectedDialogData.code)
      }
    })
  }
    
  onChangeStatus() {
    if (this.DepartmentMaster.controls['status'].value == '') {
      this.DepartmentMaster.controls['status'].setValue('')
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['status'].value;
      this.statusList.forEach(elements => {
        if (elements.code == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      })
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['status'].setErrors({ 'incorrect': true })
        this.openStatusLOV();
      }
    }
  }
  selectedFiles:any;
  attachmentName:any;
  testfile:any;
  fileToUpload:File|null=null;
  handleFileInput(event:any){
  this.selectedFiles=event.target.files;
  console.log(this.selectedFiles[0].name);
  this.attachmentName=this.selectedFiles[0].name
  const target =event.target as HTMLInputElement;
  this.fileToUpload=(target.files as FileList)[0]
  this.testfile=this.selectedFiles.item(0)
  }
  UserRoleTable:any[]=[]
  tableData:any;
  AddedUserdisplayedColumns: string[] =['docNos','docNames','categoryTypes','attachmentName']
  onCreateSelectedDataList(){
    this.UserRoleTable.push({
      docNos:this.selectedDataList.docNos,
      docNames:this.selectedDataList.docNames,
      categoryTypes:this.selectedDataList.categoryTypes,
      attachement:this.selectedFiles.item(0),
      attachmentName:this.attachmentName
    })
    console.log(this.UserRoleTable);
    this.tableData = new MatTableDataSource(this.UserRoleTable);
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }
}




