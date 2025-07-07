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

  topics: any = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private appService: AppService
  ) {

    this.topics = [
      {url: "/perception/reltr-ssg", topic: "Scene Graph Generation", logo: "./assets/logo-sgg.webp"},
      {url: "/perception/reltr-ssg", topic: "Region Generation", logo: "./assets/logo-rg.webp"},
      {url: "/perception/reltr-ssg", topic: "Object Detection", logo: "./assets/logo-detr.webp"},
      {url: "retrieval/retrieval-iresg", topic: "Retrieval Based on Scence Graph V2", logo: "./assets/logo-rs.webp"},
      {url: "retrieval/retrieval-IRESGCL", topic: "Retrieval Based on Scence Graph", logo: "./assets/logo-rs.webp"},
    ]
  }

  public navigateTo(url: string){
    this.router.navigateByUrl(url)
  }

}
