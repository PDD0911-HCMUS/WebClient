import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.services';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { AppSwal } from '../../services/app.swals';

interface Triplet {
  subject: string;
  relation: string;
  object: string;
}
@Component({
  selector: 'app-retrieval-IRESGCL',
  templateUrl: './retrieval-IRESGCL.component.html',
  styleUrl: './retrieval-IRESGCL.component.scss'
})

export class RetrievalIRESGCL {
  title = 'WebClient';

  public dataRespone: any;

  isData = false;
  isDataRev = false;
  isLoading: boolean = false;
  isLoadingRev: boolean = false;

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
  displayStyleSG = "none";
  detailId = 0;

  imageRev = [];
  tripletRev = [];

  tripRev: Triplet[] = [];
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

  public onClickClear(){
    this.isData = false;
  }

  public onClickClearRes(){
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

  async onClickSearch(){
    this.isLoadingRev = true;
    this.appSwal.showLoading();
    this.isDataRev = false;
    const tripletStrings = this.triplets.map(triplet => `${triplet.subject} ${triplet.relation} ${triplet.object}`);
    const data = {
      triplet: tripletStrings
    };
    console.log(data);
    // const result = await this.appService.doPOST('rev/rev-jaccard', data);
    const result = await this.appService.doPOST('rev/rev', data);
    result.subscribe(
      (r) => {
        this.dataRespone = r;
        this.isLoadingRev = false;
        this.isDataRev = true;
        if(this.dataRespone.Data != null && this.dataRespone.Status != false){
          this.imageRev = this.dataRespone.Data['imgs'];
          this.tripletRev = this.dataRespone.Data['triplets'];
          this.appSwal.showPopup();
          console.log(this.imageRev)
          console.log(this.dataRespone.Data)
        }
        else{
          this.appSwal.showFailure(this.dataRespone.Msg)
        }
        
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