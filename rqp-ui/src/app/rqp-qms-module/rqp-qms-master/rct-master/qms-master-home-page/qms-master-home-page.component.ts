import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qms-master-home-page',
  templateUrl: './qms-master-home-page.component.html',
  styleUrls: ['./qms-master-home-page.component.scss']
})
export class QmsMasterHomePageComponent {
  constructor(private router:Router){
    
  }
  onRctMaster() {
    this.router.navigate(['/qms/qms-rct-home-page'])

  }

}
