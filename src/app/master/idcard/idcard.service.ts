import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {AddIdcardComponent} from './create/add-idcard/add-idcard.component';
import {ViewAllIdcardsComponent} from './read/view-all-idcards/view-all-idcards.component';
@Injectable()
export class IdcardService {
    public idcards: any;
    public idcard: any;
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getIdcards() {
        const obj = this;
        this.http.get('/api/idcards.json/', {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data, 'idcards');
        });
    }
    public setData(data, stData: string) {
        this[stData] = data;
        return true;
    }
    public getIdcard(id: string, comp: any) {
        const obj = this;
        this.http.get('/api/idcards/view.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            comp.setData(data);
            obj.setData(data, 'idcard');
        });
    }
    public delete(id: string, view: ViewAllIdcardsComponent) {
        const obj = this;
        this.http.get('/api/idcards/delete.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            const rs = obj.setData(data, 'idcards');
            if (rs) {
                view.listRedirect();
            }
        });
    }
    public save(data: Array<any>, addIdcardComp: AddIdcardComponent) {
        console.log(data);
        const obj = this;
        let url = '/api/idcards/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/idcards/update.json';
            param = {
                responseType: 'json',
                idcard: {
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
                idcard: {
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
                addIdcardComp.successredirect();
            }
        });
    }
}
