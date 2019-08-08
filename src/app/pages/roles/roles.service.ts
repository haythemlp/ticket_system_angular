import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpService} from '../../services/http.service';
import {Observable} from 'rxjs';

import {Roles} from './roles';

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    public appUrl = environment.apiUrl + 'roles';


    constructor(private http: HttpService) {
    }


    public getRoles(): Observable<Roles[]> {


        return this.http.getHttp(this.appUrl);

    }

    addRoles(client: Roles) {
        return this.http.postHttp(this.appUrl, client);
    }

    updateRoles(client: Roles) {
        return this.http.putHttp(this.appUrl + '/' + client.id, client);
    }

    deleteRoles(id: number) {
        return this.http.deleteHttp(this.appUrl + '/' + id);
    }
}
