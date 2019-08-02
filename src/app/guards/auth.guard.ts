import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router ,private authService: AuthService ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    	    console.log('guard!');

        if (!localStorage.getItem('token')) {
            this.router.navigate(['/login']);
            return false;
        } else {
            let storage = localStorage.getItem('token');
            return this.authService.me(storage).pipe(map(response => {
                 
                    return true;
                }),
                catchError(error => {
                        console.log(error);
                        localStorage.clear();
                        this.router.navigate(['/login']);
                        return Observable.throw(error);
                    }
                )
            );


        }
       
    }
}
