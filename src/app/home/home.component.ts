import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppService } from '../services/app.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private appService: AppService
  ) {
  }

  public onClickNav(){
    this.router.navigate(['rs/retrieval/traffic'])
  }

}
