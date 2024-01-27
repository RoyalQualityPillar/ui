import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SdService } from '../../sd.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ESignatureComponent } from '../../sd-common/e-signature/e-signature.component';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MessageService } from 'src/app/service/message.service';
//import * as jspdf from 'jspdf';
import { jsPDF } from 'jspdf';
//import * as html2canvas from 'html2canvas';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-all-quotation-print-page',
  templateUrl: './all-quotation-print-page.component.html',
  styleUrls: ['./all-quotation-print-page.component.scss']
})
export class AllQuotationPrintPageComponent implements OnInit {

  @ViewChild('dynamicContent', { static: false }) dynamicContent: ElementRef;

  @ViewChild(MatSort) sort: MatSort;
  isLoading = false;
  pageName = 'qt-review';
  FooterForm: FormGroup;
  ViewDetailForm: FormGroup;
  pageData: any;
  ff0001: any;
  requestNoID: any;
  headerRequestBody: any;
  isReadonly: boolean;
  resviewCommentsDisplayColumn: string[] = ['createdby', 'ff0003', 'ff0005', 'comments'];
  qtListDisplayColumn: string[] = ['ff0005', 'ff0006', 'ff0018', 'ff0007', 'ff0009', 'ff0010', 'ff0011', 'ff0012', 'ff0019', 'ff0013', 'ff0015', 'ff0016', 'ff0017']
  constructor(public router: ActivatedRoute, public sdService: SdService, public lifeCycleDataService: LifeCycleDataService,
    public dialog: MatDialog, private fb: FormBuilder, private toolbarService: ToolbarService,
    public messageService: MessageService) {
    this.FooterForm = this.fb.group({
      nextStage: [''],
      previousStage: ['']
    });
    this.ViewDetailForm = this.fb.group({
      orgUnitCode: ['', Validators.required],
      salesUnitCode: ['', Validators.required],
      quotationNo: ['']
    });
  }
  ff0003: any;
  ngOnInit(): void {
    this.isReadonly = true;
    this.router.queryParams.subscribe((params: any) => {
      console.log(params);
      this.ff0003 = params.ff0003;
      this.pageData = {
        pageName: 'qt-review',
        requestNo: params.uc0001,
        version: params.ff0007 + "." + params.ff0008 + "." + params.ff0009 + "." + params.ff0010,
        comments: params.comments
      }
      this.ff0001 = params.uc0001;

    })
    if (this.ff0001) {
      this.onReviewData();
      //this.onQTList();
      this.onGetRequestNo();
      // this.onQTIndexList();
    }
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();

    this.onLoadNextStageData();

  }
  nextStageListData: any;
  previousStageListData: any;
  onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      lcStage: this.lifeCycleDataService.allQtHomePageStageValue
    }
    console.log(body)
    this.sdService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
      this.previousStageListData = data.data.pstage;
    })
  }
  headerData: any;
  getHeaderData(event: any) {
    console.log(event)
    this.headerData = event;
  }
  reviewCommentsData: any;
  dataSource: any;
  onReviewData() {
    this.sdService.onReviewData(this.ff0001).subscribe((data: any) => {
      this.reviewCommentsData = data.data;
      this.dataSource = new MatTableDataSource(this.reviewCommentsData);
      this.dataSource.sort = this.sort;

    })
  }
  qtItemListdataSource: any;
  onQTList() {
    this.sdService.onQTList(this.requestNoID).subscribe((data: any) => {
      console.log(data)
      //this.qtItemListdataSource=data;
      this.qtItemListdataSource = new MatTableDataSource(data.data);
    })
  }
  onRequestVersion(row) {
    return row.ff0005 + "." + row.ff0006 + "." + row.ff0007 + "." + row.ff0008;
  }
  onGetRequestNo() {
    this.sdService.getResquestNoID(this.pageData.requestNo).subscribe((data: any) => {
      console.log(data)
      this.requestNoID = data.data[0].uc0001;
      if (this.requestNoID) {
        this.onQTList()
        this.onQTIndexList();
      }
    })
  }
  indexList: any
  onQTIndexList() {
    this.sdService.getQTIndexList(this.requestNoID).subscribe((data: any) => {
      console.log(data)
      this.indexList = data.data[0];
      if (this.indexList) {
        this.ViewDetailForm.controls['orgUnitCode'].setValue(this.indexList.ff0001);
        this.ViewDetailForm.controls['salesUnitCode'].setValue(this.indexList.ff0002);
        this.ViewDetailForm.controls['quotationNo'].setValue(this.indexList.uc0001);
        this.checkUnitCode();
      }
    })
  }
  unitCodeData: any;
  checkUnitCode() {
    this.sdService.getUnitCodeDetail(this.ff0003, this.ViewDetailForm.controls['salesUnitCode'].value).subscribe((data: any) => {
      console.log(data);
      this.unitCodeData = data.data.content;
      this.setGSTData(this.unitCodeData)
    })
  }
  SGST: any;
  CGST: any;
  IGST: any;
  totalGst: any;
  setGSTData(data) {
    console.log(data)
    if (data[0].ff0013 == data[1].ff0013) {
      this.CGST = this.totalGst / 2
      this.SGST = this.totalGst / 2
      this.IGST = 0;
    } else {
      this.IGST = this.totalGst;
      this.SGST = 0;
      this.CGST = 0;
    }
  }
  displayedColumns: any;
  selectedDialogData: any;
  openNextStageLov() {
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Next Stage",
        dialogColumns: this.displayedColumns,
        dialogData: this.nextStageListData,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.FooterForm.controls['nextStage'].setValue(result.data.stage)
      }
    })
  }
  openPreviousStageLov() {
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: "500px",
      width: "600px",
      data: {
        dialogTitle: "Previous Stage",
        dialogColumns: this.displayedColumns,
        dialogData: this.previousStageListData,
        lovName: 'businessUnitList'
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        this.FooterForm.controls['previousStage'].setValue(result.data.stage)
      }
    })
  }


  onSubmit() {
    if (this.currentComments == '' || this.currentComments == null || this.currentComments == undefined) {
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': 'please add comments', 'heading': "Error Information" }
      });
      return;
    }
    const dialogRef = this.dialog.open(ESignatureComponent, {
      height: "300px",
      width: "600px",
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        if (this.selectedDialogData) {
          this.onCallSubmitApi()
        }
      }
    })
  }
  currentComments: any;
  getCommentsData(event: any) {
    console.log(event)
    this.currentComments = event
  }
  onCallSubmitApi() {

    let body = {
      lcNumber: this.headerData.lcnum,
      lcrqNumber: this.pageData.requestNo,
      lcStage: this.headerData.stage,
      lcRole: this.headerData.role,
      stage2: this.FooterForm.controls['nextStage'].value,
      createdBy: this.headerData.createdby,
      comments: this.currentComments
    }
    if (body.stage2 == '' || body.stage2 == undefined) {
      body.stage2 = 0;
    }
    console.log(body)
    this.sdService.onLcApproval(body).subscribe((data: any) => {
      console.log(data)
      if (data.errorInfo != null) {
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      } else {
        this.messageService.sendSnackbar('success', 'Record inserted successfully');
      }
      this.isLoading = false;
    },
      (error: any) => {
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': error, 'heading': "Error Information" }
        });
      })
  }
  onReject() {
    if (this.currentComments == '' || this.currentComments == null || this.currentComments == undefined) {
      this.dialog.open(MessageDialogComponent, {
        data: { 'message': 'please add comments', 'heading': "Error Information" }
      });
      return;
    }
    const dialogRef = this.dialog.open(ESignatureComponent, {
      height: "300px",
      width: "600px",
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedDialogData = result.data;
        if (this.selectedDialogData) {
          this.onCallRejectApi()
        }
      }
    })
  }
  onCallRejectApi() {
    let body = {
      lcNumber: this.headerData.lcnum,
      lcrqNumber: this.pageData.requestNo,
      lcStage: this.headerData.stage,
      lcRole: this.headerData.role,
      stage2: this.FooterForm.controls['previousStage'].value,
      createdBy: this.headerData.createdby,
      comments: this.currentComments
    }
    if (body.stage2 == '' || body.stage2 == undefined || body.stage2 == null) {
      body.stage2 = 0;
    }

    this.sdService.onLcReject(body).subscribe((data: any) => {
      if (data.errorInfo != null) {
        this.dialog.open(MessageDialogComponent, {
          data: { 'message': data.errorInfo.message, 'heading': "Error Information" }
        });
      } else {
        this.messageService.sendSnackbar('success', 'Record updated successfully');
      }
      this.isLoading = false;
    })
  }

  generatePDF() {
    const doc = new jsPDF();
    let pageCount = 1;
    const addPageHeader = () => {
      const logoImage = 'assets/logo1.png';
      const logoWidth = 20; // Adjust as needed
      const logoHeight = 10; // Adjust as needed

      // Add logo to the header
      doc.addImage(logoImage, 'PNG', 15, 10, logoWidth, logoHeight);

      // Other header content
      doc.setFontSize(16);
      doc.text('Quotation Detail', 80, 20); // Adjust as needed
      //doc.text('Page ' + pageCount, doc.internal.pageSize.width - 20, 10, { align: 'right' });
      // Add more header content as needed
    };

    //const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    addPageHeader();
    // doc.text( content.toString(),15, 40,);
    //draw first row
    doc.setFillColor(235, 238, 250);
    doc.rect(15, 24, 185, 8, "F");
    doc.setFontSize(10);
    doc.setTextColor(0, 3, 1);
    doc.setFont("helvetica", "bold");
    doc.text("Organization Unit Code :", 17, 30)
    doc.setFont("helvetica", "normal");
    doc.text(this.headerData.unitcode, 67, 30)
    doc.setFont("helvetica", "bold");
    doc.text("Life Cycle No :", 117, 30)
    doc.setFont("helvetica", "normal");
    doc.text(this.headerData.lcnum, 167, 30)
    //draw second row
    doc.setFillColor(250, 250, 250);
    doc.rect(15, 32, 185, 8, "F");
    doc.setFontSize(10);
    doc.setTextColor(0, 3, 1);
    doc.setFont("helvetica", "bold");
    doc.text("Module Code :", 17, 38)
    doc.setFont("helvetica", "normal");
    doc.text(this.headerData.modulecode, 67, 38)
    doc.setFont("helvetica", "bold");
    doc.text("Stage :", 117, 38)
    doc.setFont("helvetica", "normal");
    doc.text(this.headerData.stage.toString(), 167, 38)
    //draw third row
    doc.setFillColor(235, 238, 250);
    doc.rect(15, 40, 185, 8, "F");
    doc.setFontSize(10);
    doc.setTextColor(0, 3, 1);
    doc.setFont("helvetica", "bold");
    doc.text("Department Code :", 17, 46)
    doc.setFont("helvetica", "normal");
    doc.text(this.headerData.departmentcode, 67, 46)
    doc.setFont("helvetica", "bold");
    doc.text("Role :", 117, 46)
    doc.setFont("helvetica", "normal");
    doc.text(this.headerData.role, 167, 46)
    //draw fourth row
    doc.setFillColor(250, 250, 250);
    doc.rect(15, 48, 185, 8, "F");
    doc.setFontSize(10);
    doc.setTextColor(0, 3, 1);
    doc.setFont("helvetica", "bold");
    doc.text("User Id :", 17, 54)
    doc.setFont("helvetica", "normal");
    doc.text(this.headerData.createdby, 67, 54)
    doc.setFont("helvetica", "bold");
    doc.text("Request No :", 117, 54)
    doc.setFont("helvetica", "normal");
    doc.text(this.headerData.requestNo, 167, 54)
    //draw fifth row
    doc.setFillColor(235, 238, 250);
    doc.rect(15, 56, 185, 8, "F");
    doc.setFontSize(10);
    doc.setTextColor(0, 3, 1);
    doc.setFont("helvetica", "bold");
    doc.text("Request Version :", 17, 62)
    doc.setFont("helvetica", "normal");
    console.log(this.headerData.version)
    doc.text(this.headerData.version.toString(), 67, 62)
    // doc.setFont("helvetica", "bold");
    // doc.text("Life Cycle Number :",117,62)
    // doc.setFont("helvetica", "normal");
    // doc.text("lifeCycleValue",167,62)
    doc.save('document_with_header.pdf');

  }
  createPDFFile() {
    const doc = new jsPDF();
    const addPageHeader = () => {
      const logoImage = 'assets/logo1.png';
      const logoWidth = 20; 
      const logoHeight = 10; 
      doc.addImage(logoImage, 'PNG', 15, 10, logoWidth, logoHeight);
      doc.setFontSize(16);
      doc.text('Quotation Information', 80, 20); 
    };
    addPageHeader();
    doc.setFillColor(41, 40, 64);
    doc.rect(15, 24, 185, 8, "F");
    doc.setFontSize(12);
    doc.setTextColor(248, 247, 250);
    doc.setFont("helvetica", "bold");
    doc.text("Quotation Information", 17, 30)
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Quotation Number", 17, 38)
    doc.text(this.ViewDetailForm.controls['quotationNo'].value, 57, 38)
    // doc.line(17, 50, 150, 100); 
    const drawRectangleBox = (x, y, width, height, borderColor) => {
      // Set border color
      doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]); // RGB color
    
      // Draw the rectangle with a border
      doc.rect(x, y, width, height);
    
      // Reset border color to default (optional)
      doc.setDrawColor(0);
    };
    
    // Example rectangle box with a border
    const boxX = 15;
    const boxY = 40;
    const boxWidth = 180;
    const boxHeight = 30;
    const boxBorderColor = [0, 0, 255]; // RGB color, adjust as needed
    
    // Call the function to draw the rectangle box with a border
    drawRectangleBox(boxX, boxY, boxWidth, boxHeight, boxBorderColor);
    doc.save('document_with_header.pdf');
  }
  newPDFFile(){
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.text('Quotation Information', 80, 10); 
    const drawRectangleBox = (x, y, width, height, borderColor) => {
      doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]); 
      doc.rect(x, y, width, height);
      doc.setDrawColor(0);
    };
    const boxX = 15;
    const boxY = 12;
    const boxWidth = 180;
    const boxHeight = 22;
    const boxBorderColor = [0, 0, 255]; 
    drawRectangleBox(boxX, boxY, boxWidth, boxHeight, boxBorderColor);
    const logoImage = 'assets/logo1.png';
    const logoWidth = 55; 
    const logoHeight = 18; 
    doc.addImage(logoImage, 'PNG', 17, 15, logoWidth, logoHeight);
    drawRectangleBox(15, 34, 180, 25, boxBorderColor);
    
   // drawRectangleBox(15, 42, 90, 8, boxBorderColor);
    doc.setFillColor(162, 99, 214);
    doc.rect(15, 34, 90, 8, "F");
    doc.save('document_with_header.pdf');
  }
}

