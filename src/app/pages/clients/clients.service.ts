import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from './client';
import {environment} from '../../../environments/environment.prod';
import {HttpService} from "../../services/http.service";

@Injectable({
    providedIn: 'root'
})
export class ClientsService {

    public appUrl = environment.apiUrl + 'clients';


    constructor(private http: HttpService) {
    }


    public getClients(): Observable<Client[]> {


        return this.http.getHttp(this.appUrl);

    }

    public showClient(id): Observable<Client> {
        return this.http.getHttp(this.appUrl + '/' + id);

    }


    addClient(client: Client) {
        return this.http.postHttp(this.appUrl, client);
    }

    updateClient(client: Client) {
        return this.http.putHttp(this.appUrl + '/' + client.id, client);
    }

    deleteClient(id: number) {
        return this.http.deleteHttp(this.appUrl + '/' + id);
    }
}
