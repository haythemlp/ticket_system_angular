import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {HttpService} from './http.service';
import {environment} from '../../environments/environment.prod';

const apiUrl = environment.apiUrl + 'auth/';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router, public snackBar: MatSnackBar, private http: HttpService) {
    }

    login(form): void {
        this.http.postHttp(apiUrl + 'login', form).subscribe((data) => {
                console.log(data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                localStorage.setItem('token', data.data.token);
                this.snackBar.open('logged with success', 'X', {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'end',
                    panelClass: ['snackbar', 'success']
                });
                this.router.navigate(['/']);
            }
        );


    }

    logout(): void {
        this.http.postHttp(apiUrl + 'logout', {}).subscribe((data) => {
                console.log(data);
                localStorage.clear();
                this.snackBar.open(data.message, 'X', {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'end',
                    panelClass: ['snackbar', 'success']
                });
                this.router.navigate(['/login']);
            }
        );


    }

    public me(token): Observable<any> {
        return this.http.postHttp(apiUrl + 'me?token=' + localStorage.getItem('token'), {});
    }


}
