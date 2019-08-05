import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Server} from './server';
import {environment} from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ServersService {


    public appUrl = environment.apiUrl + 'servers';
    public token = localStorage.getItem('token');

    constructor(public http: HttpClient) {
    }


    public getSevers(): Observable<Server[]> {


        return this.http.get<Server[]>(this.appUrl + '?token=' + this.token);

    }

    public showSever(id): Observable<Server> {
        return this.http.get<Server>(this.appUrl + '/' + id + '?token=' + this.token);

    }


    addServer(server: Server) {
        return this.http.post(this.appUrl + '?token=' + this.token, server);
    }

    updateServer(server: Server) {
        return this.http.put(this.appUrl + '/' + server.id + '?token=' + this.token, server);
    }

    deleteServer(id: number) {
        return this.http.delete(this.appUrl + '/' + id + '?token=' + this.token);
    }
}
