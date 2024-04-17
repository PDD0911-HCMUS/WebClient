import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppConsts {
  public sessionProjectID = "ProjectID";
  public sessionServiceID = "ServiceID";
  public agreeDelete: number = 1; // 1 means true, i.e. agree to delete that record
  public notAgreeDelete: number = 0; // 0 means false, i.e. dont agree to delete that record
  public pageSkip = 0;
  public pageSize = 1;
  public defaultLangID = 'vi-VN';
  public static readonly DEFAULT_IMAGE = '/assets/images/default-image.png';
  public fileSaveUrl = "http://127.0.0.1:5000/static/uploads/video/"

  public static page = {
    
    model: 'run/model-run'
  };
}