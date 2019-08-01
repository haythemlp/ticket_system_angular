import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const apiUrl = 'http://127.0.0.1:8000/api/';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router, private http: HttpClient) {
    }


    login(form): void {
        this.http.post(apiUrl + 'login', form).subscribe((data) => {
                // console.log(data);
                localStorage.setItem('user', JSON.stringify(data));
                this.router.navigate(['/users']);
            }, error1 => alert(error1)
        );


    }

    public me(token): Observable<any> {


        return this.http.post(apiUrl + 'auth/refresh?token=' + token, {});


    }

}
