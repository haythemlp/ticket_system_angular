import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  public userImage = "assets/img/users/user.jpg";
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  public logout():void {
  

  this.authService.logout();
  }

}
