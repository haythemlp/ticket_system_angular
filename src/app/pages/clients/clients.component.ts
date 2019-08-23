import {Component, OnInit} from '@angular/core';
import {ClientsService} from './clients.service';
import {Client} from './client';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {ClientDialogComponent} from './client-dialog/client-dialog.component';
import {ConfirmationComponent} from '../../shared/confirmation/confirmation.component';
import {SnackbarService} from '../../services/snackbar.service';


@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

    public clients: Client[];
    public dataSource: any;
    public spiner: boolean = false;
    public showSearch: boolean = false;

    public displayedColumns = ['name', 'num_contrat', 'address', 'email', 'actions'];

    constructor(private clientsService: ClientsService, public dialog: MatDialog, public snackBar: SnackbarService) {
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
        this.clientsService.addClient(client).subscribe(() => {


            this.getclients();

            this.snackBar.open('ajouter avec succès', 'success');


        });
    }

    public updateClient(client: Client) {
        this.clientsService.updateClient(client).subscribe(() => {
            this.getclients();
            this.snackBar.open('mise à jour avec succès', 'success');


        });
    }

    public deleteClient(client: Client) {


        const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '350px',
            data: 'Do you confirm the deletion of this data?'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.clientsService.deleteClient(client.id).subscribe(() => {
                    this.getclients();
                    this.snackBar.open('supprimé avec succès', 'success');
                });
            }
        });


    }


}
