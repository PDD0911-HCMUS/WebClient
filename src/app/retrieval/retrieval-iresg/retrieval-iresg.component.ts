import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.services';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AppSwal } from '../../services/app.swals';
import { MatPaginator } from '@angular/material/paginator';

interface Triplet {
  subject: string;
  relation: string;
  object: string;
}

@Component({
  selector: 'app-retrieval-iresg',
  templateUrl: './retrieval-iresg.component.html',
  styleUrl: './retrieval-iresg.component.scss'
})
export class RetrievalIRESGComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 6;
  pageIndex = 0;
  title = 'WebClient';

  public dataRespone: any;

  isData = false;
  isDataRev = false;
  isLoading: boolean = false;
  isLoadingRev: boolean = false;

  fileToUpload: File | null = null;

  triplets: Triplet[] = [];
  originalTriplets: string[] = [];

  imageObject = null;
  imageGraph = null;
  imageTriplet = null;
  tripletContent = null;

  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file

  imageSrc: string | ArrayBuffer | null = null;

  displayStyle = "none";
  displayStyleSG = "none";
  detailId = 0;

  imageRev: string[] = [];
  displayedImages: string[] = [];
  tripletRev = [];

  tripRev: string[] = [];
  apiRoot: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private appService: AppService,
    private appSwal: AppSwal
  ) {

    this.apiRoot = appService.apiRoot;
  }

  getRows(triplets: any[]): any[][] {
    const rows_triplet = [];

    for (let i = 0; i < triplets.length; i += 3) {
      rows_triplet.push(triplets.slice(i, i + 3))
    }

    return rows_triplet;
  }

  public onClickClear() {
    this.isData = false;
  }

  public onClickClearRes() {
    this.isDataRev = false;
  }

  // On file Select
  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.status = "initial";
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

  async onClickSGG() {
    this.status = 'uploading';
    this.isLoading = true;
    this.isData = false;
    if (this.file) {

      const formData = await this.appService.uploadFile(this.file)
      const result = await firstValueFrom(this.appService.doPOST('sgg/sgg-gen', formData));

      this.dataRespone = result;
      if (this.dataRespone.Data != null && this.dataRespone.Status != false) {
        this.status = 'success';
        this.isLoading = false;
        this.isData = true;
        // console.log(this.dataRespone);
        this.imageObject = this.dataRespone.Data["objectDet"];
        this.imageGraph = this.dataRespone.Data["graphDet"];
        this.imageTriplet = this.dataRespone.Data["tripletDet"];
        this.tripletContent = this.dataRespone.Data["triplets"];

        this.triplets = (this.dataRespone.Data["tripletSet"] as Triplet[]).map((item: Triplet) => ({
          subject: item.subject,
          relation: item.relation,
          object: item.object

        }));

        this.originalTriplets = this.triplets.map(triplet => `${triplet.subject} ${triplet.relation} ${triplet.object}`);

        this.appSwal.showSuccess(this.dataRespone.Msg);
      }
      else {
        this.appSwal.showFailure(this.dataRespone.Msg);
        this.status = 'fail';
      }

    }

  }
  arraysEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  getEditStatus(): string {
    const currentTriplets = this.triplets.map(triplet => `${triplet.subject} ${triplet.relation} ${triplet.object}`);
    const isEdited = !this.arraysEqual(currentTriplets, this.originalTriplets);
    return isEdited ? "1" : "0";
  }


  async onClickSearch() {
    this.isLoadingRev = true;
    this.appSwal.showLoading();
    this.isDataRev = false;
    if (this.file) {
      const formData = new FormData();
      const tripletStrings = this.triplets.map(triplet => `${triplet.subject} ${triplet.relation} ${triplet.object}`);
      const edit = this.getEditStatus();

      formData.append('file', this.file);
      formData.append('triplets', JSON.stringify(tripletStrings));
      formData.append('edit', edit);

      const result = await this.appService.doPOST('rev_v2/retrieve', formData);
      result.subscribe(
        (r) => {
          this.dataRespone = r;
          this.isLoadingRev = false;
          this.isDataRev = true;
          if (this.dataRespone.Data != null && this.dataRespone.Status != false) {
            this.imageRev = this.dataRespone.Data['imgs'];
            this.tripletRev = this.dataRespone.Data['triplets'];
            this.appSwal.showPopup();
            // console.log(this.imageRev)
            // console.log(this.dataRespone.Data)

            this.updateDisplayedImages();
          }
          else {
            this.appSwal.showFailure(this.dataRespone.Msg)
          }

        }
      );

      console.log(tripletStrings);
      console.log(this.originalTriplets);
      console.log(edit);
    }

  }

  addTriplet() {
    if (this.triplets.length < 10) {
      this.triplets.push({ subject: '', relation: '', object: '' });
    }
  }

  removeTriplet(index: number) {
    this.triplets.splice(index, 1);
  }

  openPopup(id: any) {
    if (id == 1) {
      this.displayStyleSG = "flex";
      this.detailId = id
    }
    if (id == 2) {
      this.displayStyle = "flex";
      this.detailId = id
    }

  }

  closePopup(id: any) {
    if (id == 1) {
      this.displayStyleSG = "none";
      this.detailId = 0
    }
    if (id == 2) {
      this.displayStyle = "none";
      this.detailId = 0
    }
  }

  updateDisplayedImages() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.displayedImages = this.imageRev.slice(start, end);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedImages();
  }
}
