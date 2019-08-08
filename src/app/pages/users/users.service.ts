import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';
import {environment} from '../../../environments/environment.prod';
import {HttpService} from '../../services/http.service';

@Injectable()
export class UsersService {


    public appUrl = environment.apiUrl + 'users';


    constructor(private http: HttpService) {
    }

    getUsers(): Observable<any> {
        return this.http.getHttp(this.appUrl );
    }

    addUser(user: User) {

          const input = new FormData();
        input.append('avatar', user.avatar);
        input.append('data', JSON.stringify(user));


        return this.http.postHttp(this.appUrl, input);
    }

    updateUser(user: User) {
        const input = new FormData();
        input.append('avatar', user.avatar);
        input.append('data', JSON.stringify(user));
        input.append('_method', 'PUT');


        return this.http.postHttp(this.appUrl + '/' + user.id, input );
    }

    deleteUser(id: number) {
        return this.http.deleteHttp(this.appUrl + '/' + id);
    }
}
