import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../services/app.services';
import { AppSwal } from '../../services/app.swals';

@Component({
  selector: 'app-common-setting',
  templateUrl: './common-setting.component.html',
  styleUrl: './common-setting.component.scss'
})
export class CommonSettingComponent {

  constructor(
      private modalService: NgbModal,
      private router: Router,
      private appService: AppService
    ){

    }
  public navigatePage(){
    this.router.navigateByUrl("pages/page-management");
  }

}
