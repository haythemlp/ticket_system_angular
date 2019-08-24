import {Injectable} from '@angular/core';
import {CanActivateChild, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {verticalMenuItems} from '../theme/components/menu/menu';
import {MatSnackBar} from '@angular/material';


@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivateChild {

    public user = JSON.parse(localStorage.getItem('user'));

    constructor(private router: Router, private snackBar: MatSnackBar) {
    }

    canActivateChild(next: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // const url = state.url;
        //
        // let menu = verticalMenuItems.find((obj) => {
        //     return obj.routerLink == url;
        // });
        // const listMenu = JSON.parse(this.user.role.menu);
        // if (menu) {
        //
        //
        //     if (listMenu.indexOf(+menu.id) == -1) {
        //
        //         const url = this.router.url ? this.router.url : '/';
        //         this.snackBar.open('unauthaurized', 'X', {
        //             duration: 10000,
        //             verticalPosition: 'top',
        //             horizontalPosition: 'end',
        //             panelClass: ['snackbar', 'danger']
        //         });
        //
        //         this.router.navigate([url]);
        //         return false;
        //
        //     }
        // }

        return true;
    }
}
