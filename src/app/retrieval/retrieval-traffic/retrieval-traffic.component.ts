import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.services';
@Component({
  selector: 'app-retrieval-traffic',
  templateUrl: './retrieval-traffic.component.html',
  styleUrl: './retrieval-traffic.component.scss'
})
export class RetrievalTrafficComponent {
  title = 'WebClient';
  public CopyText: any;

  public dataRespone: any;

  isData = false;
  isLoading: boolean = false;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private appService: AppService
  ) {
  }

  // public open(modal: any): void {
  //   this.modalService.open(modal);
  // }

  async onClickSearch(){
    this.isLoading = true;
    this.isData = false;
    console.log(this.CopyText);
    const result = await this.appService.doGET('rev/'+ this.CopyText, null);
    result.subscribe(
      (r) => {
        this.dataRespone = r;
        this.isData = true;
        this.isLoading = false;
        console.log(this.dataRespone.Data);
      }
    );
  }

  getRows(images: any[]): any[][] {
    const rows = [];

    for (let i = 0; i < images.length; i += 3) {
      rows.push(images.slice(i, i + 3));
    }

    return rows;
  }

  public onClickClear(){
    this.CopyText = "";
  }

  public onClickClearRes(){
    this.isData = false;
  }
}
