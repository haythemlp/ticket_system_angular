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

  let input = new FormData();
    input.append("file", user.avatar);
      input.append("data",JSON.stringify(user) );

        return this.http.post(this.appUrl + '?token=' + this.token, input);
    }

    updateUser(user: User) {
          let input = new FormData();

          console.log(user)
    input.append("avatar", user.avatar);
      input.append("data", JSON.stringify(user));
      let headers = {'Content-Type' : undefined };
let options = { headers: headers };

console.log(input);
        return this.http.put(this.appUrl + '/' + user.id + '?token=' + this.token, input,options);
    }

    deleteUser(id: number) {
        return this.http.delete(this.appUrl + "/" + id + '?token=' + this.token);
    }
} 
