import {Injectable} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {environment} from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    public appUrl = environment.apiUrl + 'dashboard';

    constructor(private http: HttpService) {
    }

    data = () => this.http.getHttp(this.appUrl);
}
