import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rqp-sd-home-page',
  templateUrl: './rqp-sd-home-page.component.html',
  styleUrls: ['./rqp-sd-home-page.component.scss']
})
export class RqpSdHomePageComponent {

  constructor(private router:Router){

  }
  onAllAssignment(){
   this.router.navigate(['/sd/all-quotation-home-page'])
  }
}
