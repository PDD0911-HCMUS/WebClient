import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
// import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppConsts } from './app.consts';

@Injectable({
    providedIn: 'root'
})
export class AppService implements OnInit {
    apiRoot = 'http://10.118.1.3:8009/';
    portalRoot = 'http://localhost:4200/';
    
    headers: any;
    options: any;
    timeInterval = 1000 * 30;
    user: any;
    domainAPI = '';
    ngOnInit(): void {
    }
    constructor(
        private http: HttpClient,
    ) {
        // tslint:disable-next-line:no-string-literal
        //this.apiRoot = `${this.location['_platformStrategy']._platformLocation.location.origin}/`;

        this.domainAPI = this.apiRoot;
        var startIdx = this.domainAPI.indexOf("//");
        this.domainAPI = "ws:" + this.domainAPI.substring(startIdx);
    }

    getUser(): any {
        const result = localStorage.getItem('userInfoSoNgoaiVu');
        if (result) {
            this.user = JSON.parse(result);
        }
        return this.user;
    }

    getUserName() {
        this.getUser();
        return this.user && this.user.UserName ? this.user.UserName : '';
    }

    createHeaders() {
        const token = localStorage.getItem('token');
        this.headers = new Headers();
        // tslint:disable-next-line:max-line-length
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Authorization', `Bearer ${token}`);
    }

    public doGET(methodUrl: any, params: any): Observable<any> {
        let res = null;
        this.createHeaders();
        const apiURL = `${this.apiRoot}${methodUrl}`;
        console.log(apiURL);
        return this.http.get(apiURL, { headers: this.headers, params });
    }

    public doPOST(methodUrl: any, dataRequest: any) : Observable<any> {
        this.createHeaders();
        const apiURL = `${this.apiRoot}${methodUrl}`;
        console.log(dataRequest);
        console.log(apiURL);
        // const data = null;
        const data = this.http.post(apiURL, dataRequest, { headers: this.headers });
        
        return data;
    }

    uploadFile(methodUrl: any, file: File) {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        const apiURL = `${this.apiRoot}${methodUrl}`;
        return this.http.post(apiURL, formData);
      }

    async doPOSTOPTION(methodUrl: any, dataRequest: any, options: any) {
        const apiURL = `${this.apiRoot}${methodUrl}`;
        try {
            const data = await this.http.post(apiURL, dataRequest, options)
                .toPromise()
                .then(res => res, err => err.json());
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    encodeParams(params: any): string {

        let body = '';
        for (const param in params) {
            if (body.length) {
                body += '&';
            }
            body = `${body}${param}=`;
            body = `${body}${encodeURIComponent(params[param])}`;
        }

        return body;
    }
}