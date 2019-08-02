import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';

@Injectable()
export class UsersService {

    public appUrl = "http://127.0.0.1:8000/api/users";
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
        return this.http.put(this.appUrl + '/' + user.id + '?token=' + this.token, user);
    }

    deleteUser(id: number) {
        return this.http.delete(this.appUrl + "/" + id + '?token=' + this.token);
    }
} 
