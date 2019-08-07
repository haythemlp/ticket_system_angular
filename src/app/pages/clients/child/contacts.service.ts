import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from '../client';
import {environment} from '../../../../environments/environment.prod';
import {HttpService} from "../../../services/http.service";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  public appUrl = environment.apiUrl + 'contacts';


    constructor(private http: HttpService) {
    }



    addContact(contact: Contact) {
        return this.http.postHttp(this.appUrl , contact);
    }

    updateContact(contact: Contact) {
        return this.http.putHttp(this.appUrl + '/' + contact.id , contact);
    }

    deleteContact(id: number) {
        return this.http.deleteHttp(this.appUrl + '/' + id );
    }
}
