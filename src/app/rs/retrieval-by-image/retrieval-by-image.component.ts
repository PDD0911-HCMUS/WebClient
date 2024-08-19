import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.services';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-retrieval-by-image',
  templateUrl: './retrieval-by-image.component.html',
  styleUrl: './retrieval-by-image.component.css'
})
export class RetrievalByImageComponent {
  title = 'WebClient';
  public CopyText: any;

  public dataRespone: any;

  isData = false;
  isDataRev = false;
  isLoading: boolean = false;

  fileToUpload: File | null = null;

  imageObject = null;
  imageGraph = null;
  imageTriplet = null;
  tripletContent = null;

  contentJson = {

  }

  tripletContentS1 = null;
  tripletContentS2 = null;
  tripletContentS3 = null;
  tripletContentS4 = null;
  tripletContentS5 = null;
  tripletContentS6 = null;
  tripletContentS7 = null;
  tripletContentS8 = null;
  tripletContentS9 = null;
  tripletContentS10 = null;

  tripletContentO1 = null;
  tripletContentO2 = null;
  tripletContentO3 = null;
  tripletContentO4 = null;
  tripletContentO5 = null;
  tripletContentO6 = null;
  tripletContentO7 = null;
  tripletContentO8 = null;
  tripletContentO9 = null;
  tripletContentO10 = null;

  tripletContentR1 = null;
  tripletContentR2 = null;
  tripletContentR3 = null;
  tripletContentR4 = null;
  tripletContentR5 = null;
  tripletContentR6 = null;
  tripletContentR7 = null;
  tripletContentR8 = null;
  tripletContentR9 = null;
  tripletContentR10 = null;

  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file

  imageSrc: string | ArrayBuffer | null = null;

  displayStyle = "none";
  displayStyleSG = "none";
  detailId = 0;

  imageRev = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private appService: AppService
  ) {
  }

  // public open(modal: any): void {
  //   this.modalService.open(modal);
  // }
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

  async onUpload() {
    // we will implement this method later
    this.status = 'uploading';
    this.isLoading = true;
    this.isData = false;
    if (this.file){
      const result = await firstValueFrom(this.appService.uploadFile('upload', this.file));

      this.dataRespone = result;
      this.status = 'success';
      this.isLoading = false;
      this.isData = true;
      console.log(this.dataRespone);
      this.imageObject = this.dataRespone.Data["objectDet"];
      this.imageGraph = this.dataRespone.Data["graphDet"];
      this.imageTriplet = this.dataRespone.Data["tripletDet"];
      this.tripletContent = this.dataRespone.Data["triplets"];
    }
  }

  getTripletContents(tripletContent : any){

  }

  async onClickSearch(){
    // this.isLoading = true;
    // this.isData = false;
    console.log(this.tripletContent);
    const data = {
      triplet: this.tripletContent
    };
    const result = await this.appService.doPOST('rev', data);
    result.subscribe(
      (r) => {
        this.dataRespone = r;
        this.isData = true;
        this.isLoading = false;
        console.log(this.dataRespone.Data);
        this.isDataRev = true;
        this.imageRev = this.dataRespone.Data['imgs'];
      }
    );
  }

  openPopup(id: any) { 
    if(id == 1){
      this.displayStyleSG = "flex"; 
      this.detailId = id
    }
    if(id == 2){
      this.displayStyle = "flex"; 
      this.detailId = id
    }
    
  } 

  closePopup(id: any) { 
    if(id == 1){
      this.displayStyleSG = "none"; 
      this.detailId = 0
    }
    if(id == 2){
      this.displayStyle = "none"; 
      this.detailId = 0
    }
  } 

}