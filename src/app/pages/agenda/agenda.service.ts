import {Injectable} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {environment} from "../../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class AgendaService {

    public appUrl = environment.apiUrl + 'agenda';

    constructor(private http: HttpService) {}

    all = () => this.http.getHttp(this.appUrl);
    add = (event) => this.http.postHttp(this.appUrl, event);
    update = (event) => this.http.putHttp(this.appUrl + '/' + event.id, event);
    delete = (id: number) => this.http.deleteHttp(this.appUrl + '/' + id);

}
