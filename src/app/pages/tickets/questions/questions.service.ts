import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.prod';
import {HttpService} from '../../../services/http.service';
import {Observable} from 'rxjs';
import {Question} from '../ticket';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {

    public appUrl = environment.apiUrl + 'ticket/questions';


    constructor(private http: HttpService) {
    }


    public getList(): Observable<Question[]> {
        return this.http.getHttp(this.appUrl);
    }

    add(q: Question) {
        return this.http.postHttp(this.appUrl, q);
    }

    update(q: Question) {
        return this.http.putHttp(this.appUrl + '/' + q.id, q);
    }

    delete(id: number) {
        return this.http.deleteHttp(this.appUrl + '/' + id);
    }
}
