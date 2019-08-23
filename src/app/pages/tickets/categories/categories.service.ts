import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment.prod';
import {HttpService} from '../../../services/http.service';
import {Observable} from 'rxjs';
import {Category} from '../ticket';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public appUrl = environment.apiUrl + 'ticket/types';


  constructor(private http: HttpService) {
  }


  public getList(): Observable<Category[]> {
    return this.http.getHttp(this.appUrl);
  }

  add(c: Category) {
    return this.http.postHttp(this.appUrl, c);
  }

  update(c: Category) {
    return this.http.putHttp(this.appUrl + '/' + c.id, c);
  }

  delete(id: number) {
    return this.http.deleteHttp(this.appUrl + '/' + id);
  }
}
