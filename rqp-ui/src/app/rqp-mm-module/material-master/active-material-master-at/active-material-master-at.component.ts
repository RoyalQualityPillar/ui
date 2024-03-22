import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { downloadCanvasArea } from 'bk-export';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { AdminService } from 'src/app/rqp-admin-module/admin-data/admin.service';
import { MaterialMasterService } from '../material-master.service';
import { AllMaterialMasterAtComponent } from '../all-material-master-at/all-material-master-at.component';

export interface userData {
  userData: any;
  type: any;
  tableData: any;
}

@Component({
  selector: 'app-active-material-master-at',
  templateUrl: './active-material-master-at.component.html',
  styleUrls: ['./active-material-master-at.component.scss']
})
export class ActiveMaterialMasterAtComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  isLoading = false
  constructor(public adminService: AdminService,
    private materialService: MaterialMasterService,
    public dialogRef: MatDialogRef<AllMaterialMasterAtComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
  ) { }

  data: any;
  ngOnInit() {
    console.log(this.userData.tableData.uc0001)
    console.log(this.userData.type)
    this.onSearch()
  }
  onSearch() {
    this.isLoading = true;
    this.materialService.onLoadUpdatePage(this.userData.tableData.uc0001).subscribe((data: any) => {
      console.log(data);
      this.data = data.data;
      this.isLoading = false;
    })
  }


  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    downloadCanvasArea(DATA, 'unit')
  }
  onChangeStatus(data: any) {
    return changeStatusByCode(data);
  }
}
