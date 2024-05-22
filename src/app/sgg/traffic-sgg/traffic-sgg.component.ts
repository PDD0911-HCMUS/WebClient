import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.services';

@Component({
  selector: 'app-traffic-sgg',
  templateUrl: './traffic-sgg.component.html',
  styleUrl: './traffic-sgg.component.css'
})
export class TrafficSggComponent {
  title = 'WebClient';
  public CopyText: any;

  public dataRespone: any;

  isData = false;
  isLoading: boolean = false;

  fileToUpload: File | null = null;

  imageObject = null;
  imageGraph = null;
  imageTriplet = null;

  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file

  imageSrc: string | ArrayBuffer | null = null;

  displayStyle = "none";
  detailId = 0;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private appService: AppService
  ) {
  }

  ngOnInit(): void {}

  // public open(modal: any): void {
  //   this.modalService.open(modal);
  // }

  async onClickSearch(){
    this.isLoading = true;
    this.isData = false;
    console.log(this.CopyText);
    const result = await this.appService.doGET('STS/'+ this.CopyText, null);
    result.subscribe(
      (r) => {
        this.dataRespone = r;
        console.log(this.dataRespone.Data);
        this.dataRespone.Data.forEach((element: any) => {
          console.log(element);
        });
        this.isData = true;
        this.isLoading = false;
        return this.dataRespone.Data
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

  handleUploaderEvent(e: Event) {
    const { data: files } = (e as CustomEvent).detail;
    this.file = files;
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
      const result = await this.appService.uploadFile('upload', this.file);
      result.subscribe(
        r => {
          this.dataRespone = r;
          this.status = 'success';
          this.isLoading = false;
          this.isData = true;
          console.log(r);
          console.log(this.dataRespone.Data);
          this.imageObject = this.dataRespone.Data[0];
          this.imageGraph = this.dataRespone.Data[1];
          this.imageTriplet = this.dataRespone.Data[2];
        }
      );
    }
  }

  openPopup(id: any) { 
    this.displayStyle = "flex"; 
    this.detailId = id
  } 
  closePopup() { 
    this.displayStyle = "none"; 
    this.detailId = 0
  } 
}
