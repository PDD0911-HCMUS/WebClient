import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppConsts } from './app.consts';

@Injectable({
    providedIn: 'root'
})
export class AppService implements OnInit {
    // apiRoot = 'http://123.30.158.155:8010/';
    // clientRoot = 'http://123.30.158.155:8008/';
    // portalRoot = 'http://123.30.158.155:8011/';
    apiRoot = 'http://127.0.0.1:5000/';
    clientRoot = 'http://localhost:4401/';
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
        private location: Location,
        private router: Router
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

    async doGET(methodUrl: any, params: any) {
        this.createHeaders();
        const apiURL = `${this.apiRoot}${methodUrl}`;
        try {
            const data = await this.http.get(apiURL, { headers: this.headers, params })
                .toPromise()
                .then(res => res.json(), err => {
                    if (err.statusText === 'Unauthorized') {
                        //this.appSwal.showWarning(this.language.translate.instant('MsgUnauthorized'), false);
                        //this.router.navigate([AppConsts.page.login]);
                    }
                    return null;
                });
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async doPOST(methodUrl: any, dataRequest: any) {
        this.createHeaders();
        const apiURL = `${this.apiRoot}${methodUrl}`;
        try {
            const data = await this.http.post(apiURL, dataRequest, { headers: this.headers })
                .toPromise()
                .then(res => res.json(), err => console.log(err));
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async doPOSTOPTION(methodUrl: any, dataRequest: any, options: any) {
        const apiURL = `${this.apiRoot}${methodUrl}`;
        try {
            const data = await this.http.post(apiURL, dataRequest, options)
                .toPromise()
                .then(res => res.json(), err => err.json());
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