import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {AddClassroomComponent} from './create/add-classroom/add-classroom.component';
import {ViewAllClassroomsComponent} from './read/view-all-classrooms/view-all-classrooms.component';
@Injectable()
export class ClassroomService {
    public classrooms: any;
    public classroom: any;
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getClassrooms() {
        const obj = this;
        this.http.get('/api/classrooms.json/', {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data, 'classrooms');
        });
    }
    public setData(data, stData: string) {
        this[stData] = data;
        return true;
    }
    public getClassroom(id: string, comp: any) {
        const obj = this;
        this.http.get('/api/classrooms/view.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            comp.setData(data);
            obj.setData(data, 'classroom');
        });
    }
    public delete(id: string, view: ViewAllClassroomsComponent) {
        const obj = this;
        this.http.get('/api/classrooms/delete.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            const rs = obj.setData(data, 'classrooms');
            if (rs) {
                view.listRedirect();
            }
        });
    }
    public save(data: Array<any>, addClassroomComp: AddClassroomComponent) {
        console.log(data);
        const obj = this;
        let url = '/api/classrooms/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/classrooms/update.json';
            param = {
                responseType: 'json',
                classroom: {
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
                classroom: {
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
                addClassroomComp.successredirect();
            }
        });
    }
}
