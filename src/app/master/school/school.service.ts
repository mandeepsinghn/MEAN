import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
@Injectable()
export class SchoolService {
    public schools: any;
    public school: any;
    constructor(private http: HttpClient, private authService: AuthService) {
    }
    public getSchools() {
        const obj = this;
        this.http.post('/api/schools.json/', {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data, 'schools');
        });
    }
    public setData(data, stData: string) {
        this[stData] = data;
    }
    public getSchool(id: string) {
        const obj = this;
        this.http.get('/api/schools.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data, 'school');
        });
    }
    public save(data) {
        console.log(data);
    }
}
