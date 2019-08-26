import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, retry, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class HttpService {


    constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    }


    public getHttp(url: string) {

        return this.http.get<any>(url, {headers: this.getToken()})
            .pipe(
               tap(
                 data => { if(data.message)  {this.showMessage(data.message)}                          } 

                 ),
                retry(1),
               catchError(err => {
                    console.log(err.error);
                   this.showError(err.error.message)
                    return throwError(err);
                })
            )
    }

    public postHttp(url: string, body) {

        return this.http.post<any>(url, body, {headers: this.getToken()})
            .pipe(

                tap(
                 data => { if(data.message)  {this.showMessage(data.message)}                          } 

                 ),
                retry(1),
               catchError(err => {
                    console.log(err.error);
                   this.showError(err.error.message)
                    return throwError(err);
                })
            )
            

    }

    public putHttp(url: string, body) {

        return this.http.put<any>(url, body, {headers: this.getToken()})
            .pipe(
                tap(
                 data => { if(data.message)  {this.showMessage(data.message)}                          } 

                 ),
                retry(1),
               catchError(err => {
                    console.log(err.error);
                   this.showError(err.error.message)
                    return throwError(err);
                })
            )
            

    }

    public deleteHttp(url: string) {

        return this.http.delete<any>(url, {headers: this.getToken()})
            .pipe(
                tap(
                 data => { if(data.message)  {this.showMessage(data.message)}                          } 

                 ),
                retry(1),
               catchError(err => {
                    console.log(err.error);
                   this.showError(err.error.message)
                    return throwError(err);
                })
            )
            

    }

    private showMessage(msg){

        this.snackBar.open(msg, 'X', {
                        duration: 10000,
                        verticalPosition: 'top',
                        horizontalPosition: 'end',
                        panelClass: ['snackbar', 'success']
                    });
    }


    private showError(err){
this.snackBar.open(err, 'X', {
                        duration: 10000,
                        verticalPosition: 'top',
                        horizontalPosition: 'end',
                        panelClass: ['snackbar', 'danger']
                    });

    }


    protected getToken() {

        return {'Authorization': `Bearer ${localStorage.getItem('token')}`};

    }

}
