import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
@Injectable()
export class IdcardService {
    constructor(private http: HttpClient, private authService: AuthService, private route: Router) {
    }
    public getIdcards(p: number, ps: number) {
        return this.http.get('/api/idcards.json/' + p + '/' + ps, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public getIdcard(id: string) {
        const obj = this;
        return this.http.get('/api/idcards/view.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public delete(id: string) {
        const obj = this;
        return this.http.get('/api/idcards/delete.json/' + id, {
            responseType: 'json'
        }).pipe(
            map(res =>  res)
        );
    }
    public save(data: any) {
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
                    mac: data['mac'],
                    uuid: data['uuid'],
                    major: data['major'],
                    minor: data['minor'],
                    modifiedOn: new Date(),
                    modifiedBy: this.authService.loggedId
                }
            };
        } else {
            param = {
                responseType: 'json',
                idcard: {
                    mac: data['mac'],
                    uuid: data['uuid'],
                    major: data['major'],
                    minor: data['minor'],
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
