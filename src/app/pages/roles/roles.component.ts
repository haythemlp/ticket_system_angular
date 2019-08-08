import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Roles} from './roles';
import {RolesService} from './roles.service';
import {RolesDialogComponent} from './roles-dialog/roles-dialog.component';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

    public roles: Roles[];
    public dataSource: any;
    public spiner: boolean = false;

    public displayedColumns = ['id', 'name', 'actions'];

    constructor(private rolesService: RolesService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    }

    ngOnInit() {

        this.getRoles();
    }


    public getRoles(): void {
        this.rolesService.getRoles().subscribe(roles => {
            this.roles = roles;
            this.dataSource = new MatTableDataSource<Roles>(this.roles);
            this.spiner = true;


        });
    }

    public openRoleDialog(role: Roles) {
        const dialogRef = this.dialog.open(RolesDialogComponent, {
            data: Object.assign({}, role)
        });
        dialogRef.afterClosed().subscribe(role => {
            if (role) {
                (role.id) ? this.updateRole(role) : this.addRole(role);
            }
        });

    }

    public addRole(role: Roles) {
        this.rolesService.addRoles(role).subscribe(role => {
            this.getRoles();

            this.snackBar.open('ajouter avec succès', 'Close', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['snackbar', 'success']
            });
        });
    }

    public updateRole(role: Roles) {
        this.rolesService.updateRoles(role).subscribe(role => {
            this.getRoles();
            this.snackBar.open('mise à jour avec succès', 'Close', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['snackbar', 'success']
            });


        });
    }

    public deleteRole(role: Roles) {
        this.rolesService.deleteRoles(role.id).subscribe(role => {
            this.getRoles();
            this.snackBar.open('supprimé avec succès', 'close', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['snackbar', 'success']
            });


        });
    }


}
