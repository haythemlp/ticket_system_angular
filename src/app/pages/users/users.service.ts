import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class UsersService {


    public appUrl = environment.apiUrl + 'users';
    public token = localStorage.getItem('token');
    public headers={'Authorization': `Bearer ${localStorage.getItem('token')}`};

    constructor(public http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.appUrl ,{headers: this.headers });
    }

    addUser(user: User) {

          const input = new FormData();
        input.append('avatar', user.avatar);
        input.append('data', JSON.stringify(user));


        return this.http.post(this.appUrl, input,{headers: this.headers });
    }

    updateUser(user: User) {
        const input = new FormData();
        input.append('avatar', user.avatar);
        input.append('data', JSON.stringify(user));
        input.append('_method', 'PUT');


        return this.http.post(this.appUrl + '/' + user.id, input ,{headers: this.headers });
    }

    deleteUser(id: number) {
        return this.http.delete(this.appUrl + '/' + id, {headers: this.headers });
    }
}
