import {Component, OnInit} from '@angular/core';
import {ServersService} from './servers.service';
import {Server} from './server';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ServersDialogComponent} from "./servers-dialog/servers-dialog.component";

@Component({
    selector: 'app-servers',
    templateUrl: './servers.component.html',
    styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {

    public servers: Server[];
    public showSearch: boolean = false;
    public dataSource: any;
    public spiner:boolean =false;

    public displayedColumns = ['name', 'url', 'company', 'ip', 'actions'];


    constructor(private serversService: ServersService, public dialog: MatDialog) {
    }

    ngOnInit() {

 this.getservers();

       
    }


    public getservers(): void {



   this.serversService.getSevers().subscribe(servers => {
            this.servers = servers;
            this.dataSource = new MatTableDataSource<Server>(this.servers);
            this.spiner=true;

     });



    
     

    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public openServerDialog(server: Server) {


        let dialogRef = this.dialog.open(ServersDialogComponent, {
            data: server,

            width: '80%',
        });
        dialogRef.afterClosed().subscribe(server => {
            if (server) {
            (server.id) ? this.updateServer(server) : this.addServer(server);
            }
        });

    }

    public addServer(server: Server) {
        this.serversService.addServer(server).subscribe(server => this.getservers());
    }

    public updateServer(server: Server) {
        this.serversService.updateServer(server).subscribe(server => this.getservers());
    }

    public deleteServer(server: Server) {
        this.serversService.deleteServer(server.id).subscribe(server => this.getservers());
    }

}
