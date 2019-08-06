import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from './client';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  public appUrl = environment.apiUrl + 'clients';
  public token = localStorage.getItem('token');
  public headers={'Authorization': `Bearer ${localStorage.getItem('token')}`};


    constructor(public http: HttpClient) {
    }


    public getClients(): Observable<Client[]> {


        return this.http.get<Client[]>(this.appUrl ,{headers: this.headers });

    }

    public showClient(id): Observable<Client> {
        return this.http.get<Client>(this.appUrl + '/' + id ,{headers: this.headers });

    }


    addClient(client: Client) {
        return this.http.post(this.appUrl , client,{headers: this.headers });
    }

    updateClient(client: Client) {
        return this.http.put(this.appUrl + '/' + client.id , client,{headers: this.headers });
    }

    deleteClient(id: number) {
        return this.http.delete(this.appUrl + '/' + id ,{headers: this.headers });
    }
}
