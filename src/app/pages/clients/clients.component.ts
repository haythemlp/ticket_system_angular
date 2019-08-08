import {Component, OnInit} from '@angular/core';
import {ClientsService} from './clients.service';
import {Client} from './client';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {ClientDialogComponent} from './client-dialog/client-dialog.component';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

    public clients: Client[];
    public dataSource: any;
    public spiner: boolean = false;

    public displayedColumns = ['name', 'num_contrat', 'address', 'email', 'actions'];

    constructor(private clientsService: ClientsService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    }

    ngOnInit() {

        this.getclients();


    }


    public getclients(): void {
        this.clientsService.getClients().subscribe(clients => {
            this.clients = clients;
            this.dataSource = new MatTableDataSource<Client>(this.clients);
            this.spiner = true;


        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public openClientDialog(client: Client) {
        let dialogRef = this.dialog.open(ClientDialogComponent, {
            data: Object.assign({}, client),
            width: '80%',
        });
        dialogRef.afterClosed().subscribe(client => {
            if (client) {
                (client.id) ? this.updateClient(client) : this.addClient(client);
            }
        });

    }

    public addClient(client: Client) {
        this.clientsService.addClient(client).subscribe(client => {


            this.getclients();

            this.snackBar.open('ajouter avec succès', 'Close', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['snackbar', 'success']
            });


        });
    }

    public updateClient(client: Client) {
        this.clientsService.updateClient(client).subscribe(client => {
            this.getclients();
            this.snackBar.open('mise à jour avec succès', 'Close', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['snackbar', 'success']
            });


        });
    }

    public deleteClient(client: Client) {
        this.clientsService.deleteClient(client.id).subscribe(client => {
            this.getclients();
            this.snackBar.open('supprimé avec succès', 'close', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['snackbar', 'success']
            });


        });
    }


}
