import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class UsersService {

    public appUrl = environment.apiUrl + 'users';
    public token = localStorage.getItem('token');

    constructor(public http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.appUrl + '?token=' + this.token);
    }

    addUser(user: User) {


        return this.http.post(this.appUrl + '?token=' + this.token, user);
    }

    updateUser(user: User) {
        const input = new FormData();
        input.append('avatar', user.avatar);
        console.log(input.get('avatar'));
        input.append('data', JSON.stringify(user));

        input.append('_method', 'PUT');

        console.log(input.get('data'))
        const headers = {'Content-Type': undefined};
        const options = {headers: headers};

        return this.http.post(this.appUrl + '/' + user.id + '?token=' + this.token, input);
    }

    deleteUser(id: number) {
        return this.http.delete(this.appUrl + '/' + id + '?token=' + this.token);
    }
}
