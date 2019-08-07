import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';

const apiUrl = 'http://127.0.0.1:8000/api/auth/';
const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`};


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router, private http: HttpClient, public snackBar: MatSnackBar) {
    }

    login(form): void {
        this.http.post<any>(apiUrl + 'login', form).subscribe((data) => {
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
            }, error =>

                this.snackBar.open(error.error.message, 'X', {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'end',
                    panelClass: ['snackbar', 'danger']
                })
        );


    }

    logout(): void {
        this.http.post<any>(apiUrl + 'logout', {}, {headers: headers}).subscribe((data) => {
                console.log(data);
                localStorage.clear();
                this.snackBar.open(data.message, 'X', {
                    duration: 2000,
                    verticalPosition: 'top',
                    horizontalPosition: 'end',
                    panelClass: ['snackbar', 'success']
                });
                this.router.navigate(['/login']);
            }, error => this.snackBar.open(error.error.message, 'X', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['snackbar', 'danger']
            })
        );


    }

    public me(token): Observable<any> {
        return this.http.post(apiUrl + 'me?token=' + localStorage.getItem('token'), {headers: headers});
    }


}
