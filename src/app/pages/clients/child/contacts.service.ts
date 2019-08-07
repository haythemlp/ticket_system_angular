import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from '../client';
import {environment} from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  public appUrl = environment.apiUrl + 'contacts';
  public token = localStorage.getItem('token');
  public headers={'Authorization': `Bearer ${localStorage.getItem('token')}`};


    constructor(public http: HttpClient) {
    }



    addContact(contact: Contact) {
        return this.http.post(this.appUrl , contact,{headers: this.headers });
    }

    updateContact(contact: Contact) {
        return this.http.put(this.appUrl + '/' + contact.id , contact,{headers: this.headers });
    }

    deleteContact(id: number) {
        return this.http.delete(this.appUrl + '/' + id ,{headers: this.headers });
    }
}
