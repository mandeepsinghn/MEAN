import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {AddStudentComponent} from './create/add-student/add-student.component';
import {ViewAllStudentsComponent} from './read/view-all-students/view-all-students.component';
@Injectable()
export class StudentService {
    public students: any;
    public student: any;
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getStudents() {
        const obj = this;
        this.http.get('/api/students.json/', {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data, 'students');
        });
    }
    public setData(data, stData: string) {
        this[stData] = data;
        return true;
    }
    public getStudent(id: string, comp: any) {
        const obj = this;
        this.http.get('/api/students/view.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            comp.setData(data);
            obj.setData(data, 'student');
        });
    }
    public delete(id: string, view: ViewAllStudentsComponent) {
        const obj = this;
        this.http.get('/api/students/delete.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            const rs = obj.setData(data, 'students');
            if (rs) {
                view.listRedirect();
            }
        });
    }
    public save(data: Array<any>, addStudentComp: AddStudentComponent) {
        console.log(data);
        const obj = this;
        let url = '/api/students/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/students/update.json';
            param = {
                responseType: 'json',
                student: {
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
                student: {
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
                addStudentComp.successredirect();
            }
        });
    }
}
