import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {AddSubjectComponent} from './create/add-subject/add-subject.component';
import {ViewAllSubjectsComponent} from './read/view-all-subjects/view-all-subjects.component';
@Injectable()
export class SubjectService {
    public subjects: any;
    public subject: any;
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getSubjects() {
        const obj = this;
        this.http.get('/api/subjects.json/', {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data, 'subjects');
        });
    }
    public setData(data, stData: string) {
        this[stData] = data;
        return true;
    }
    public getSubject(id: string, comp: any) {
        const obj = this;
        this.http.get('/api/subjects/view.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            comp.setData(data);
            obj.setData(data, 'subject');
        });
    }
    public delete(id: string, view: ViewAllSubjectsComponent) {
        const obj = this;
        this.http.get('/api/subjects/delete.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            const rs = obj.setData(data, 'subjects');
            if (rs) {
                view.listRedirect();
            }
        });
    }
    public save(data: Array<any>, addSubjectComp: AddSubjectComponent) {
        console.log(data);
        const obj = this;
        let url = '/api/subjects/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/subjects/update.json';
            param = {
                responseType: 'json',
                subject: {
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
                subject: {
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
                addSubjectComp.successredirect();
            }
        });
    }
}
