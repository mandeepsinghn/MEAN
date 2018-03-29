import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {AddTeacherComponent} from './create/add-teacher/add-teacher.component';
import {ViewAllTeachersComponent} from './read/view-all-teachers/view-all-teachers.component';
@Injectable()
export class TeacherService {
    public teachers: any;
    public teacher: any;
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getTeachers() {
        const obj = this;
        this.http.get('/api/teachers.json/', {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data, 'teachers');
        });
    }
    public setData(data, stData: string) {
        this[stData] = data;
        return true;
    }
    public getTeacher(id: string, comp: any) {
        const obj = this;
        this.http.get('/api/teachers/view.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            comp.setData(data);
            obj.setData(data, 'teacher');
        });
    }
    public delete(id: string, view: ViewAllTeachersComponent) {
        const obj = this;
        this.http.get('/api/teachers/delete.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            const rs = obj.setData(data, 'teachers');
            if (rs) {
                view.listRedirect();
            }
        });
    }
    public save(data: Array<any>, addTeacherComp: AddTeacherComponent) {
        console.log(data);
        const obj = this;
        let url = '/api/teachers/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/teachers/update.json';
            param = {
                responseType: 'json',
                teacher: {
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
                teacher: {
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
                addTeacherComp.successredirect();
            }
        });
    }
}
