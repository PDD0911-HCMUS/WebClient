import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.services';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AppSwal } from '../../services/app.swals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = '';
  password = '';

  apiRoot: any;

  register = 'user/register'

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
  }

  onLogin() {
    // gọi AuthService.login(...) rồi navigate
    console.log(this.username, this.password);
    this.router.navigateByUrl('home')
  }
}
