import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileComponent} from './profile/profile.component';
import { AuthService } from '../auth/auth.service';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class UserService {
    public user: any;
    public userInfo: any;
    public isData: any;
    constructor(private http: HttpClient, private authService: AuthService, private cookieService: CookieService) {
        this.user = [];
        this.userInfo = [];
        this.isData = this.getLoggedUserData( );
    }
    public getLoggedUserData(/*_id: String, profileComp: ProfileComponent*/) {
        const obj = this;
        const isLogged = this.cookieService.get('loggedUser');
        this.http.get('/api/users/getDetail.json/' + isLogged, {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data);
        });
    }
    public getUserProfileData(profileComp: ProfileComponent) {
        const isLogged = this.cookieService.get('loggedUser');
        this.http.get('/api/users/getDetail.json/' + isLogged, {
            responseType: 'json'
        }).subscribe(function (data) {
            profileComp.setData(data);
        });
    }
    public getUserInfo() {
        if (this.isData) {
            return this.user;
        } else {
            this.isData = this.getLoggedUserData();
            return this.user;
        }
    }
    public setData(data) {
        this.user = data;
        this.userInfo = this.user.userInfo;
        return true;
    }
    public updateUserData( data: Array<any>, dataInfo: Array<any> ) {
        const obj = this;
        const user = data;
        const userInfo = dataInfo;
        this.http.post('/api/users/update.json/', {
            responseType: 'json',
            user,
            userInfo,
            modifiedOn: new Date(),
            modifiedBy: this.authService.loggedId
        }).subscribe(function ( data1 ) {
            obj.setData(data1);
        });
    }
}
