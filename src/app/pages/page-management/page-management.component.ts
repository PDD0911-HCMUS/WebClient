import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.services';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AppSwal } from '../../services/app.swals';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-page-management',
  templateUrl: './page-management.component.html',
  styleUrl: './page-management.component.scss'
})
export class PageManagementComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  apiRoot: any;
  public dataRespone: any;
  isData = false;
  isLoading: boolean = false;
  displayedColumns: string[] = ['tools', 'position', 'name', 'weight', 'symbol'];
  pages: any[] = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private appService: AppService,
    private appSwal: AppSwal
  ) {

    this.apiRoot = appService.apiRoot;
    this.getAllPages();
  }

  async getAllPages(){
    const result = await this.appService.doGET('/page/getall', null);
    result.subscribe(
      (r) => {
        this.dataRespone = r;
        console.log(this.dataRespone.Data);
        // this.pages = this.dataRespone.Data;
        this.pages = ELEMENT_DATA;
        this.pages.forEach((element: any) => {
          console.log(element);
        });
        this.isData = true;
        this.isLoading = false;
        return this.pages;
      }
    );
  }

  async deletePage(index: number){
    console.info(this.pages[index]);
    return;
  }

  async editPage(index: number){
    console.info(this.pages[index]);
    return;
  }

}
