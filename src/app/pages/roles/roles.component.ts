import {Component, OnInit} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {SnackbarService} from '../../services/snackbar.service';
import {Roles} from './roles';
import {RolesService} from './roles.service';
import {RolesDialogComponent} from './roles-dialog/roles-dialog.component';
import {ConfirmationComponent} from '../../shared/confirmation/confirmation.component';


@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

    public roles: Roles[];
    public dataSource: any;
    public spiner: boolean = false;
    public showSearch: boolean = false;

    public displayedColumns = ['id', 'name', 'actions'];

    constructor(private rolesService: RolesService, public dialog: MatDialog, public snackBar:  SnackbarService,) {
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
    
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public addRole(role: Roles) {
        this.rolesService.addRoles(role).subscribe(role => {
            this.getRoles();

          
        });
    }

    public updateRole(role: Roles) {
        this.rolesService.updateRoles(role).subscribe(role => {
            this.getRoles();
          

        });
    }

    public deleteRole(role: Roles) {

  const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '350px',
            data: 'Do you confirm the deletion of this data?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
               
                 this.rolesService.deleteRoles(role.id).subscribe(role => {
            this.getRoles();


        });

             
            }
        });



       
    }


}
