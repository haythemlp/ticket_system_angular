import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {environment} from "../../../../environments/environment.prod";
import {User} from '../../../pages/users/user.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {


public mediaUrl: string = environment.mediaUrl;
    public url: string = environment.url;
     public user: User;

  public userImage = "";
  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.user = JSON.parse(localStorage.getItem('user'));
    this.userImage= (this.user.avatar) ? this.mediaUrl+this.user.avatar  : this.url+'assets/img/users/default-user.jpg';
  }


  public logout():void {
  

  this.authService.logout();
  }

}
