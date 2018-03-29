import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {AddPickupComponent} from './create/add-pickup/add-pickup.component';
import {ViewAllPickupsComponent} from './read/view-all-pickups/view-all-pickups.component';
@Injectable()
export class PickupService {
    public pickups: any;
    public pickup: any;
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getPickups() {
        const obj = this;
        this.http.get('/api/pickups.json/', {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data, 'pickups');
        });
    }
    public setData(data, stData: string) {
        this[stData] = data;
        return true;
    }
    public getPickup(id: string, comp: any) {
        const obj = this;
        this.http.get('/api/pickups/view.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            comp.setData(data);
            obj.setData(data, 'pickup');
        });
    }
    public delete(id: string, view: ViewAllPickupsComponent) {
        const obj = this;
        this.http.get('/api/pickups/delete.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            const rs = obj.setData(data, 'pickups');
            if (rs) {
                view.listRedirect();
            }
        });
    }
    public save(data: Array<any>, addPickupComp: AddPickupComponent) {
        console.log(data);
        const obj = this;
        let url = '/api/pickups/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/pickups/update.json';
            param = {
                responseType: 'json',
                pickup: {
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
                pickup: {
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
                addPickupComp.successredirect();
            }
        });
    }
}
