import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {AddSchoolComponent} from './create/add-school/add-school.component';
import {ViewAllSchoolsComponent} from './read/view-all-schools/view-all-schools.component';
@Injectable()
export class SchoolService {
    public schools: any;
    public school: any;
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getSchools() {
        const obj = this;
        this.http.get('/api/schools.json/', {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data, 'schools');
        });
    }
    public setData(data, stData: string) {
        this[stData] = data;
        return true;
    }
    public getSchool(id: string, comp: any) {
        const obj = this;
        this.http.get('/api/schools/view.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            comp.setData(data);
            obj.setData(data, 'school');
        });
    }
    public delete(id: string, view: ViewAllSchoolsComponent) {
        const obj = this;
        this.http.get('/api/schools/delete.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            const rs = obj.setData(data, 'schools');
            if (rs) {
                view.listRedirect();
            }
        });
    }
    public save(data: Array<any>, addSchoolComp: AddSchoolComponent) {
        console.log(data);
        const obj = this;
        let url = '/api/schools/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/schools/update.json';
            param = {
                responseType: 'json',
                school: {
                    _id: data['_id'],
                    name: data['name'],
                    password: data['password'],
                    address: data['address'],
                    latitude: data['latitude'],
                    longitude: data['longitude'],
                    startDate: data['startDate']._i,
                    endDate: data['endDate']._i,
                    modifiedOn: new Date(),
                    modifiedBy: this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                school: {
                    name: data['name'],
                    password: data['password'],
                    address: data['address'],
                    latitude: data['latitude'],
                    longitude: data['longitude'],
                    startDate: data['startDate']._i,
                    endDate: data['endDate']._i,
                    createdOn: new Date(),
                    createdBy: this.authService.loggedId
                }
            };
        }
        this.http.post(url, param).subscribe(function ( data1 ) {
            if (data1) {
                addSchoolComp.successredirect();
            }
        });
    }
}
