import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {AddGatewayComponent} from './create/add-gateway/add-gateway.component';
import {ViewAllGatewaysComponent} from './read/view-all-gateways/view-all-gateways.component';
@Injectable()
export class GatewayService {
    public gateways: any;
    public gateway: any;
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getGateways() {
        const obj = this;
        this.http.get('/api/gateways.json/', {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data, 'gateways');
        });
    }
    public setData(data, stData: string) {
        this[stData] = data;
        return true;
    }
    public getGateway(id: string, comp: any) {
        const obj = this;
        this.http.get('/api/gateways/view.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            comp.setData(data);
            obj.setData(data, 'gateway');
        });
    }
    public delete(id: string, view: ViewAllGatewaysComponent) {
        const obj = this;
        this.http.get('/api/gateways/delete.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            const rs = obj.setData(data, 'gateways');
            if (rs) {
                view.listRedirect();
            }
        });
    }
    public save(data: Array<any>, addGatewayComp: AddGatewayComponent) {
        console.log(data);
        const obj = this;
        let url = '/api/gateways/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/gateways/update.json';
            param = {
                responseType: 'json',
                gateway: {
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
                gateway: {
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
                addGatewayComp.successredirect();
            }
        });
    }
}
