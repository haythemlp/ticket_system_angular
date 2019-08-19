import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Server} from './server';
import {environment} from '../../../environments/environment.prod';
import {HttpService} from "../../services/http.service";

@Injectable({
    providedIn: 'root'
})
export class ServersService {


    public appUrl = environment.apiUrl + 'servers';
    public token = localStorage.getItem('token');

    constructor(private httpService: HttpService) {
    }


    public getSevers(): Observable<any> {

        return this.httpService.getHttp(this.appUrl);

    }

    public showSever(id): Observable<Server> {
        return this.httpService.getHttp(this.appUrl + '/' + id);

    }


    addServer(server: Server) {
        return this.httpService.postHttp(this.appUrl, server);
    }

    updateServer(server: Server) {
        return this.httpService.putHttp(this.appUrl + '/' + server.id, server);
    }

    deleteServer(id: number) {
        return this.httpService.deleteHttp(this.appUrl + '/' + id);
    }
}
