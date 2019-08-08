import { Injectable } from '@angular/core';
import { CanActivateChild,CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {verticalMenuItems} from'../theme/components/menu/menu';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements   CanActivateChild  {

    public user = JSON.parse(localStorage.getItem('user'));
   constructor(private router: Router) {}

  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

const url=state.url

let menu = verticalMenuItems.find((obj) => {
                return obj.routerLink == url
            });

console.log(menu.id);


        const listMenu = JSON.parse(this.user.role.menu);

        let a = listMenu.indexOf(+menu.id)!=-1;

        console.log(a);



      	return true;
  }
}
