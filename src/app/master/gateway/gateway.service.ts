import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
@Injectable()
export class GatewayService {
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getGateways(p: number, ps: number) {
        return this.http.get('/api/gateways.json/' + p + '/' + ps, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getGateway(id: string) {
        const obj = this;
        return this.http.get('/api/gateways/view.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public delete(id: string) {
        const obj = this;
        return this.http.get('/api/gateways/delete.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public save(data: any) {
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
                    location: data['location'],
                    mac: data['mac'],
                    ip: data['ip'],
                    wifiname: data['wifiname'],
                    wifiPassword: data['wifiPassword'],
                    gatewayUsername: data['gatewayUsername'],
                    gatewayPassword: data['gatewayPassword'],
                    readingDistance: data['readingDistance'],
                    modifiedOn: new Date(),
                    modifiedBy: this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                gateway: {
                    name: data['name'],
                    location: data['location'],
                    mac: data['mac'],
                    ip: data['ip'],
                    wifiname: data['wifiname'],
                    wifiPassword: data['wifiPassword'],
                    gatewayUsername: data['gatewayUsername'],
                    gatewayPassword: data['gatewayPassword'],
                    readingDistance: data['readingDistance'],
                    createdOn: new Date(),
                    createdBy: this.authService.loggedId
                }
            };
        }
        return this.http.post(url, param).pipe(
            map(res =>  res)
        );
    }
}
