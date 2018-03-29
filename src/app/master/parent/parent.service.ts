import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {AddParentComponent} from './create/add-parent/add-parent.component';
import {ViewAllParentsComponent} from './read/view-all-parents/view-all-parents.component';
@Injectable()
export class ParentService {
    public parents: any;
    public parent: any;
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getParents() {
        const obj = this;
        this.http.get('/api/parents.json/', {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data, 'parents');
        });
    }
    public setData(data, stData: string) {
        this[stData] = data;
        return true;
    }
    public getParent(id: string, comp: any) {
        const obj = this;
        this.http.get('/api/parents/view.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            comp.setData(data);
            obj.setData(data, 'parent');
        });
    }
    public delete(id: string, view: ViewAllParentsComponent) {
        const obj = this;
        this.http.get('/api/parents/delete.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            const rs = obj.setData(data, 'parents');
            if (rs) {
                view.listRedirect();
            }
        });
    }
    public save(data: Array<any>, addParentComp: AddParentComponent) {
        console.log(data);
        const obj = this;
        let url = '/api/parents/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/parents/update.json';
            param = {
                responseType: 'json',
                parent: {
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
                parent: {
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
                addParentComp.successredirect();
            }
        });
    }
}
