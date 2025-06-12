import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.services';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AppSwal } from '../../services/app.swals';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  username = '';
  password = '';
  password_confirm = '';

  apiRoot: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private appService: AppService,
    private appSwal: AppSwal
  ) {

    this.apiRoot = appService.apiRoot;
    this.setDefault();
  }

  setDefault() {
    this.username = '';
    this.password = '';
    this.password_confirm = '';
  }

  onRegister() {
    // gọi AuthService.login(...) rồi navigate
    console.log(this.username, this.password, this.password_confirm);
    // this.router.navigateByUrl('home')
  }

}
