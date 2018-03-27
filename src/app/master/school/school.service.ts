import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { ViewAllSchoolsComponent } from './read/view-all-schools/view-all-schools.component';
import { AddSchoolComponent } from './create/add-school/add-school.component';
@Injectable()
export class SchoolService {

    constructor(private http: HttpClient, private authService: AuthService) {
    }
    public getSchools(viewSchools: ViewAllSchoolsComponent) {
        this.http.post('/api/schools.json/', {
            responseType: 'json'
        }).subscribe(function (data) {
            viewSchools.setData(data);
        });
    }
    public getSchool(id: string, addSchool: AddSchoolComponent) {
        this.http.get('/api/schools.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            addSchool.setData(data);
        });
    }
}
