import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileComponent} from './profile/profile.component';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }
    public getLoggedUserData(_id: String, profileComp: ProfileComponent) {
        this.http.post('/api/users/view.json', {
            responseType: 'json',
            _id: _id
        }).subscribe(function (data) {
            profileComp.setData(data);
        });
    }

}
