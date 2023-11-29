import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SdService } from '../sd.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-qt-review',
  templateUrl: './qt-review.component.html',
  styleUrls: ['./qt-review.component.scss']
})
export class QtReviewComponent implements OnInit{

  @ViewChild(MatSort) sort:MatSort;
  pageName='qt-review';
  pageData:any;
  ff0001:any;
  requestNoID:any;
  resviewCommentsDisplayColumn:string[]=['createdby','ff0003','ff0005','comments'];
  qtListDisplayColumn:string[]=['ff0005','ff0006','ff0018','ff0007','ff0009','ff0010','ff0011','ff0012','ff0019','ff0013','ff0015','ff0016','ff0017']
  constructor(public router:ActivatedRoute,public sdService:SdService){}
  ngOnInit(): void {
    this.router.queryParams.subscribe((params:any)=>{
      console.log(params)
      this.pageData ={
        pageName:'qt-review',
        requestNo:params.uc0001,
        version:params.ff0007 +"."+params.ff0008+"."+params.ff0009+"."+params.ff0010,
        comments:params.comments
      }
      this.ff0001=params.uc0001;
       
    })
    if(this.ff0001){
      this.onReviewData();
      //this.onQTList();
      this.onGetRequestNo();
     // this.onQTIndexList();
    }
  }
  headerData:any;
  getHeaderData(event:any){
    console.log(event)
    this.headerData=event;
  }
  reviewCommentsData:any;
  dataSource:any;
  onReviewData(){
    this.sdService.onReviewData(this.ff0001).subscribe((data:any)=>{
       this.reviewCommentsData=data.data;
       this.dataSource=new MatTableDataSource(this.reviewCommentsData);
       this.dataSource.sort=this.sort;
    
    })
  }
  qtItemListdataSource:any;
  onQTList(){
    this.sdService.onQTList(this.requestNoID).subscribe((data:any)=>{
      console.log(data)
      //this.qtItemListdataSource=data;
      this.qtItemListdataSource=new MatTableDataSource(data.data);
    })
  }
  onRequestVersion(row){
    return row.ff0005 +"."+row.ff0006+"."+row.ff0007+"."+row.ff0008;
  }
  onGetRequestNo(){
    this.sdService.getResquestNoID(this.pageData.requestNo).subscribe((data:any)=>{
      console.log(data)
      this.requestNoID=data.data[0].uc0001;
      if( this.requestNoID){
        this.onQTList()
        this.onQTIndexList();
      }
    })
  }
  indexList:any
  onQTIndexList(){
    this.sdService.getQTIndexList(this.requestNoID).subscribe((data:any)=>{
      console.log(data)
      this.indexList=data.data[0];
      if( this.indexList){

      }
    })
  }
}
