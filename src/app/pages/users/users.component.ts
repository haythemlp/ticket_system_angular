import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {User} from './user.model';
import {UsersService} from './users.service';
import {UserDialogComponent} from './user-dialog/user-dialog.component';
import {environment} from '../../../environments/environment.prod';
import {Roles} from '../roles/roles';
import {ConfirmationComponent} from '../../shared/confirmation/confirmation.component';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [UsersService]
})
export class UsersComponent implements OnInit {
    public mediaUrl = environment.mediaUrl;
    public users: User[];
    public roles: Roles[];
    public searchText: string;
    public page: any;
    public settings: Settings;
    public showSearch: boolean = false;
    public viewType: string = 'grid';

    constructor(public appSettings: AppSettings,
                public dialog: MatDialog,
                public snackBar: SnackbarService,
                public usersService: UsersService) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {

        this.getUsers();

    }

    public getUsers(): void {

        this.users = null; //for show spinner each time
        this.usersService.getUsers().subscribe(res => {
            this.users = res.users;
            this.roles = res.roles;
        });


    }

    public addUser(user: User) {
        this.usersService.addUser(user).subscribe(user => {
            this.getUsers();
            this.snackBar.open('ajouter avec succès', 'success');
        });
    }

    public updateUser(user: User) {
        this.usersService.updateUser(user).subscribe(user => {
            this.getUsers();

            this.snackBar.open('mise a jour avec succès', 'success');
        });
    }

    public deleteUser(user: User) {

        const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '350px',
            data: 'Do you confirm the deletion of this data?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Yes clicked');
                // DO SOMETHING

                this.usersService.deleteUser(user.id).subscribe(user => {
                    this.getUsers();

                    this.snackBar.open('supprimé avec succès', 'success');

                });
            }
        });


    }


    public changeView(viewType) {
        this.viewType = viewType;
        this.showSearch = false;
    }

    public onPageChanged(event) {
        this.page = event;
        this.getUsers();
        document.getElementById('main').scrollTop = 0;
    }

    public openUserDialog(user: User) {


        let data = {user: user ? Object.assign({}, user) : new User(), roles: this.roles};


        let dialogRef = this.dialog.open(UserDialogComponent, {
            data: data,

            width: '80%',
        });
        dialogRef.afterClosed().subscribe(user => {
            console.log(user);
            if (user) {
                console.log(user);
                (user.id) ? this.updateUser(user) : this.addUser(user);
            }
        });
        this.showSearch = false;
    }

}
