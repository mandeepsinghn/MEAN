import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileComponent} from './profile/profile.component';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {

    constructor(private http: HttpClient, private authService: AuthService) {
    }
    public getLoggedUserData(_id: String, profileComp: ProfileComponent) {
        this.http.post('/api/users/getDetail.json/', {
            responseType: 'json',
            _id: _id
        }).subscribe(function (data) {
            profileComp.setData(data);
        });
    }
    public updateUserData( data: Array<any>, dataInfo: Array<any>, profileComp: ProfileComponent ) {
        const user = data;
        const userInfo = dataInfo;
        this.http.post('/api/users/update.json/', {
            responseType: 'json',
            user,
            userInfo,
            modifiedOn: new Date(),
            modifiedBy: this.authService.loggedId
        }).subscribe(function ( data1 ) {
            profileComp.updateData(data1);
        });
    }
}
