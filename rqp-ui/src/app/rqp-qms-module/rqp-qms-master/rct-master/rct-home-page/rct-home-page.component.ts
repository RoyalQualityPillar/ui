import { Component } from '@angular/core';

@Component({
  selector: 'app-rct-home-page',
  templateUrl: './rct-home-page.component.html',
  styleUrls: ['./rct-home-page.component.scss']
})
export class RctHomePageComponent {
  selectedTab=0;
  tableData:any
  tabChanged(tabChangeEvent: any) {
    this.selectedTab = tabChangeEvent.index;
    if (this.selectedTab == 0) {
     
    } else if (this.selectedTab == 1) {
      
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.tableData.filter = filterValue;
  }

}
