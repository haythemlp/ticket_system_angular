import {Component, OnInit} from '@angular/core';
import {ServersService} from './servers.service';
import {Server} from './server';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ServersDialogComponent} from './servers-dialog/servers-dialog.component';
import {SnackbarService} from '../../services/snackbar.service';
import {ConfirmationComponent} from '../../shared/confirmation/confirmation.component';
import {Client} from'../clients/client';

@Component({
    selector: 'app-servers',
    templateUrl: './servers.component.html',
    styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {

    public servers: Server[];
    public clients: Client[];
    public showSearch: boolean = false;
    public dataSource: any;
    public spiner: boolean = false;

    public displayedColumns = ['name', 'url', 'company', 'ip', 'actions'];


    constructor(private serversService: ServersService, public dialog: MatDialog, private snackbar: SnackbarService) {
    }

    ngOnInit() {

        this.getservers();


    }


    public getservers(): void {


        this.serversService.getSevers().subscribe(data => {
            this.servers = data.servers;
            this.clients = data.clients;
            this.dataSource = new MatTableDataSource<Server>(this.servers);
            this.spiner = true;

        });


    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public openServerDialog(server: Server) {

        let data={clients:this.clients,server: Object.assign({}, server)};


        let dialogRef = this.dialog.open(ServersDialogComponent, {
            data: data,

            width: '80%',
        });
        dialogRef.afterClosed().subscribe(server => {
            if (server) {
                (server.id) ? this.updateServer(server) : this.addServer(server);
            }
        });

    }

    public addServer(server: Server) {
        this.serversService.addServer(server).subscribe(() => {
            this.getservers();

            this.snackbar.open('ajouter avec success', 'success');
        });
    }

    public updateServer(server: Server) {
        this.serversService.updateServer(server).subscribe(() => {
            this.getservers();

            this.snackbar.open(' modifier avec success', 'success');
        });
    }

    public deleteServer(server: Server) {
        const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '350px',
            data: 'Do you confirm the deletion of this data?'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Yes clicked');
                // DO SOMETHING

                this.serversService.deleteServer(server.id).subscribe(() => {
                    this.getservers();
                    this.snackbar.open('supprimer avec success', 'success');
                });
            }
        });


    }

}
