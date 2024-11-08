import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.services';
import { firstValueFrom } from 'rxjs';
import { AppSwal } from '../../services/app.swals';

interface Triplet {
  subject: string;
  relation: string;
  object: string;
}
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
  tripletContent = null;

  triplets: Triplet[] = [];

  status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  file: File | null = null; // Variable to store file

  imageSrc: string | ArrayBuffer | null = null;

  displayStyle = "none";
  detailId = 0;

  apiRoot: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private appService: AppService,
    private appSwal: AppSwal
  ) {

    this.apiRoot = appService.apiRoot;
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

  async onClickSGG() {
    this.status = 'uploading';
    this.isLoading = true;
    this.isData = false;
    if (this.file){

      const formData = await this.appService.uploadFile(this.file)
      const result = await firstValueFrom(this.appService.doPOST('sgg/sgg-gen', formData));

      this.dataRespone = result;
      if(this.dataRespone.Data != null && this.dataRespone.Status != false){
        this.status = 'success';
        this.isLoading = false;
        this.isData = true;
        console.log(this.dataRespone);
        this.imageObject = this.dataRespone.Data["objectDet"];
        this.imageGraph = this.dataRespone.Data["graphDet"];
        this.imageTriplet = this.dataRespone.Data["tripletDet"];
        this.tripletContent = this.dataRespone.Data["triplets"];

        this.triplets = (this.dataRespone.Data["tripletSet"] as Triplet[]).map((item: Triplet) => ({
          subject: item.subject,
          relation: item.relation,
          object: item.object

        }));

        this.appSwal.showSuccess(this.dataRespone.Msg);
      }
      else{
        this.appSwal.showFailure(this.dataRespone.Msg);
        this.status = 'fail';
      }
      
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
