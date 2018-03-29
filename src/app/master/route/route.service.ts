import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {AddRouteComponent} from './create/add-route/add-route.component';
import {ViewAllRoutesComponent} from './read/view-all-routes/view-all-routes.component';
@Injectable()
export class RouteService {
    public routes: any;
    public route1: any;
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getRoutes() {
        const obj = this;
        this.http.get('/api/routes.json/', {
            responseType: 'json'
        }).subscribe(function (data) {
            obj.setData(data, 'routes');
        });
    }
    public setData(data, stData: string) {
        this[stData] = data;
        return true;
    }
    public getRoute(id: string, comp: any) {
        const obj = this;
        this.http.get('/api/routes/view.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            comp.setData(data);
            obj.setData(data, 'route1');
        });
    }
    public delete(id: string, view: ViewAllRoutesComponent) {
        const obj = this;
        this.http.get('/api/routes/delete.json/' + id, {
            responseType: 'json'
        }).subscribe(function (data) {
            const rs = obj.setData(data, 'routes');
            if (rs) {
                view.listRedirect();
            }
        });
    }
    public save(data: Array<any>, addRouteComp: AddRouteComponent) {
        console.log(data);
        const obj = this;
        let url = '/api/routes/add.json';
        let param = {};
        if (data['_id']) {
            url = '/api/routes/update.json';
            param = {
                responseType: 'json',
                route: {
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
                route: {
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
                addRouteComp.successredirect();
            }
        });
    }
}
